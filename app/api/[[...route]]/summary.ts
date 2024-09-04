import { Hono } from "hono";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { lt, desc, sum, sql, eq, and, gte, lte } from "drizzle-orm";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { subDays, parse, differenceInDays } from "date-fns";
import {transactions, accounts, categories} from "@/db/schema";
import {calculatePercentageChange, fillMissingDays} from "@/lib/utils";

const app = new Hono()
    .use(clerkMiddleware())
    .get(
        "/",
        zValidator(
            "query",
            z.object({
                from: z.string().optional(),
                to: z.string().optional(),
                accountId: z.string().optional(),
            })
        ),
        async (c) => {
            async function fetchFinancialData(
                userId: string,
                startDate: Date,
                endDate: Date
            ) {
                return await db
                    .select({
                        income: sql`SUM(CASE WHEN ${sql`${transactions.amount}::numeric`} >= 0 THEN ${sql`${transactions.amount}::numeric`} ELSE 0 END)`.mapWith(Number),
                        expenses: sql`SUM(CASE WHEN ${sql`${transactions.amount}::numeric`} < 0 THEN ${sql`${transactions.amount}::numeric`} ELSE 0 END)`.mapWith(Number),
                        remaining: sql`SUM(${sql`${transactions.amount}::numeric`})`.mapWith(Number),
                    })
                    .from(transactions)
                    .innerJoin(
                        accounts,
                        eq(transactions.accountId, accounts.id)
                    )
                    .where(
                        and(
                            accountId ? eq(transactions.accountId, accountId) : undefined,
                            eq(accounts.userId, userId),
                            gte(transactions.date, startDate),
                            lte(transactions.date, endDate)
                        )
                    );
            }

            try {
                const auth = getAuth(c);
                const { from, to, accountId } = c.req.valid("query");

                if (!auth?.userId) {
                    return c.json({ error: "Unauthorized" }, 401);
                }

                const defaultTo = new Date();
                const defaultFrom = subDays(defaultTo, 30);

                const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
                const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

                const periodLength = differenceInDays(endDate, startDate) + 1;
                const lastPeriodStart = subDays(startDate, periodLength);
                const lastPeriodEnd = subDays(endDate, periodLength);


                const [currentPeriod] = await fetchFinancialData(
                    auth.userId,
                    startDate,
                    endDate
                );
                const [lastPeriod] = await fetchFinancialData(
                    auth.userId,
                    lastPeriodStart,
                    lastPeriodEnd
                );

                const incomeChange = calculatePercentageChange(currentPeriod.income as number, lastPeriod.income as number);

                const expensesChange = calculatePercentageChange(currentPeriod.expenses as number, lastPeriod.expenses as number);

                const remainingChange = calculatePercentageChange(currentPeriod.remaining as number, lastPeriod.remaining as number);

                const category = await db
                    .select({
                        name: categories.name,
                        value: sql`SUM(ABS(${transactions.amount}::numeric))`.mapWith(Number)
                    })
                    .from(transactions)
                    .innerJoin(
                        accounts,
                        eq(
                            transactions.accountId,
                            accounts.id
                        )
                    )
                    .innerJoin(
                        categories,
                        eq(
                            transactions.categoryId,
                            categories.id
                        )
                    )
                    .where(
                        and(
                            accountId ? eq(transactions.accountId, accountId) : undefined,
                            eq(accounts.userId, auth.userId),
                            lt(transactions.amount, 0),
                            gte(transactions.date, startDate),
                            lte(transactions.date, endDate)
                        )
                    )
                    .groupBy(categories.name)
                    .orderBy(desc(
                        sql`SUM(ABS(${transactions.amount}::numeric))`
                    ));

                const topCategories = category.slice(0,3);
                const otherCategories = category.slice(3)

                const otherSum  = otherCategories.reduce((sum,current) => sum+current.value, 0)

                const finalCategories = topCategories;

                if(otherCategories.length > 0){
                    finalCategories.push({
                        name: "Other",
                        value: otherSum
                    })
                }

                const activeDays = await db
                    .select({
                        date: transactions.date,
                        income: sql`SUM(CASE WHEN ${transactions.amount}::numeric >= 0 THEN ${transactions.amount}::numeric ELSE 0 END)`.mapWith(Number),
                        expenses: sql`SUM(CASE WHEN ${transactions.amount}::numeric < 0 THEN ${transactions.amount}::numeric ELSE 0 END)`.mapWith(Number)
                    })
                    .from(transactions)
                    .innerJoin(
                        accounts,
                        eq(
                            transactions.accountId,
                            accounts.id
                        )
                    )
                    .where(
                        and(
                            accountId ? eq(transactions.accountId, accountId) : undefined,
                            eq(accounts.userId, auth.userId),
                            gte(transactions.date, startDate),
                            lte(transactions.date, endDate)
                        )
                    )
                    .groupBy(transactions.date)
                    .orderBy(transactions.date);

                const days = fillMissingDays(activeDays, startDate, endDate)

                return c.json({
                    data:{
                        remainingAmount: currentPeriod.remaining,
                        remainingChange,
                        incomeAmount: currentPeriod.income,
                        incomeChange,
                        expensesAmount: currentPeriod.expenses,
                        expensesChange,
                        categories: finalCategories,
                        days,
                    }
                })


                // return c.json({
                //     currentPeriod,
                //     lastPeriod,
                //     incomeChange,
                //     expensesChange,
                //     remainingChange,
                //     finalCategories,
                //     days
                // });
            } catch (error) {
                console.error("Error fetching financial data:", error);
                return c.json({ error: "Internal Server Error" }, 500);
            }
        }
    );

export default app;
