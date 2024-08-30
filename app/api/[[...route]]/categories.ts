import { Hono } from "hono";
import {db} from "@/db/drizzle";
import {categories, insertCategorySchema} from "@/db/schema";
import {clerkMiddleware, getAuth} from "@hono/clerk-auth";
import {HTTPException} from "hono/http-exception";
import {eq, and, inArray} from "drizzle-orm";
import {zValidator} from "@hono/zod-validator";
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";
const app = new Hono()
    .use(clerkMiddleware())
    .get('/',
        async (c) =>{
            const auth = getAuth(c);
            if(!auth?.userId){
                return c.json({error:"Unauthorized"}, 401);
            }
            const data = await db
                .select({
                    id: categories.id,
                    name: categories.name
                })
                .from(categories)
                .where(eq(categories.userId,auth.userId ))
            return c.json({data});
        })
    .get('/:id',
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        async (c ) =>{
            const auth = getAuth(c);
            const {id} = c.req.valid("param");
            if(!auth?.userId){
                return c.json({error: "Unauthorized"}, 401)
            }
            if(!id){
                return c.json({error:"Missing id"}, 400)
            }
            const [data] = await db
                .select({
                    id: categories.id,
                    name: categories.name,
                })
                .from(categories)
                .where(
                    and(
                        eq(categories.userId, auth.userId),
                        eq(categories.id, id)
                    ),
                );
            if(!data){
                return c.json({error:"Not Found"}, 404)
            }
            return c.json({data});
        }
    )
    .post('/',
        zValidator("json", insertCategorySchema.pick({
            name:true,
        })),
        async (c) =>{
            const values = c.req.valid("json");

            const auth = getAuth(c);
            if(!auth?.userId){
                return c.json({error:"Unauthorized"}, 401);
            }
            const [data] = await db.insert(categories).values({
                id: uuidv4(),
                userId: auth.userId,
                ...values
            }).returning();

            return c.json({ data })

        })
    .post('/bulk-delete',
        zValidator(
            "json",
            z.object({
                ids: z.array(z.string())
            }),
        ),
        async (c) =>{
            const auth = getAuth(c);

            const values = c.req.valid('json');

            if(!auth?.userId){
                return c.json({error: "Unauthorized"}, 401)
            }

            const data = await db
                .delete(categories)
                .where(
                    and(
                        eq(categories.userId, auth.userId),
                        inArray(categories.id, values.ids)
                    )
                )
                .returning({
                    id: categories.id
                })

            return c.json({ data })


        }
    )
    .patch("/:id",
        zValidator(
            "param",
            z.object({
                id: z.string().optional(),
            })
        ),
        zValidator(
            "json",
            insertCategorySchema.pick({
                name: true,
            })
        ),
        async(c) =>{
            const auth = getAuth(c);
            const { id } = c.req.valid('param');
            const values = c.req.valid('json')

            if(!auth?.userId){
                return c.json({error:"Unauthorized"}, 401)
            }
            if(!id){
                return c.json({error:"Missing Id"}, 400)
            }

            const [data ] = await db
                .update(categories)
                .set(values)
                .where(
                    and(
                        eq(categories.userId, auth.userId),
                        eq(categories.id, id)
                    )
                )
                .returning();

            if(!data){
                return c.json({error: "Not Found"}, 404);
            }

            return c.json({data});

        },
    )
    .delete(
        "/:id",
        zValidator(
            "param",
            z.object({
                id: z.string().optional(),
            })
        ),
        async(c) =>{
            const auth = getAuth(c);
            const { id } = c.req.valid('param');

            if(!auth?.userId){
                return c.json({error:"Unauthorized"}, 401)
            }
            if(!id){
                return c.json({error:"Missing Id"}, 400)
            }

            const [data ] = await db
                .delete(categories)
                .where(
                    and(
                        eq(categories.userId, auth.userId),
                        eq(categories.id, id)
                    )
                )
                .returning()

            if(!data){
                return c.json({error: "Not Found"}, 404);
            }
            //TODO: remove comment below
            console.log(data)
            return c.json({data});

        },
    )

export default app;