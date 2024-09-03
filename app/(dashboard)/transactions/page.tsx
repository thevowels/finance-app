"use client";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,

} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Loader2, Plus} from "lucide-react";
import {DataTable} from "@/components/data-table";
import {Skeleton} from "@/components/ui/skeleton";
import {useNewTransaction} from "@/features/transactions/hooks/use-new-transaction";
import {useGetTransactions} from "@/features/transactions/api/use-get-transactions";
import {useBulkDeleteTransactions} from "@/features/transactions/api/use-bulk-delete-transactions";
import {columns} from "@/app/(dashboard)/transactions/columns";
import {useState} from "react";
import {UploadButton} from "@/app/(dashboard)/transactions/upload-button";
import ImportCard from "@/app/(dashboard)/transactions/import-card";


enum VARIANTS{
    LIST = "LIST",
    IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
    data:[],
    errors:[],
    meta:{}
}


export default function TransactionsPage() {
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
    const [ importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results);
        console.log(importResults);
        setVariant(VARIANTS.IMPORT);
    }
    const onCancelImport = ()=>{
        setImportResults(INITIAL_IMPORT_RESULTS)
        setVariant(VARIANTS.LIST)
    }

    const newTransaction = useNewTransaction();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];

    const deleteTransactions = useBulkDeleteTransactions();
    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending

    if(transactionsQuery.isLoading){
        return(
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl line-clamp-1">
                            <Skeleton className="h-8 w-48"/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if( variant === VARIANTS.IMPORT){
        return (
            <>
                <ImportCard
                    data = {importResults.data}
                    onCancel={onCancelImport}
                    onSubmit = {() =>{}}

                />
            </>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 lg:-mt-24 ">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transaction History
                    </CardTitle>
                    <div className="flex gap-x-2 items-center">
                    <Button size="sm"
                        onClick={newTransaction.onOpen}
                    >
                        <Plus className="size-4 mr-2"/>
                        Add New
                    </Button>
                    <UploadButton onUpload={onUpload}/>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns}
                               data={transactions}
                               filterKey={"name"}
                               disabled = {isDisabled}
                               onDelete={(row ) =>{
                                   const ids = row.map( (r) => r.original.id);
                                   deleteTransactions.mutate({ids});
                               }} />

                </CardContent>
            </Card>
        </div>
    )
}