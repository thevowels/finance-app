"use client";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,

} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useNewAccount} from "@/features/accounts/hooks/use-new-account";
import {Payment, columns} from "@/app/(dashboard)/accounts/columns";
import {DataTable} from "@/components/data-table";


const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "728edc2f",
        amount: 480,
        status: "pending",
        email: "a@example.com",
    },
    {
        id: "722edc2f",
        amount: 184,
        status: "pending",
        email: "a@example.com",
    },
    {
        id: "728ed52f",
        amount: 4823,
        status: "pending",
        email: "a@wmachi.com",
    },

]

export default function Page() {

    const newAccount = useNewAccount();

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 lg:-mt-24 ">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts Page
                    </CardTitle>
                    <Button
                        onClick={newAccount.onOpen}
                    >
                        <Plus className="size-4 mr-2"/>
                        Add New
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} filterKey={"email"} disabled onDelete={() =>{}} />

                </CardContent>
            </Card>
        </div>
    )
}