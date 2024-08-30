"use client"

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
import {useNewCategory} from "@/features/categories/hooks/use-new-category";
import {useGetCategories} from "@/features/categories/api/use-get-categories";
import {useBulkDeleteCategories} from "@/features/categories/api/use-bulk-delete-categories";
import {columns} from "@/app/(dashboard)/categories/columns";



export default function Categories() {

    const newCategory = useNewCategory();
    const categoryQuery = useGetCategories();
    const categories = categoryQuery.data || [];

    const deleteCategories = useBulkDeleteCategories();
    const isDisabled = categoryQuery.isLoading || deleteCategories.isPending

    if(categoryQuery.isLoading){
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

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 lg:-mt-24 ">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories Page
                    </CardTitle>
                    <Button
                        onClick={newCategory.onOpen}
                    >
                        <Plus className="size-4 mr-2"/>
                        Add New
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns}
                               data={categories}
                               filterKey={"name"}
                               disabled = {isDisabled}
                               onDelete={(row ) =>{
                                   const ids = row.map( (r) => r.original.id);
                                   deleteCategories.mutate({ids});
                               }} />

                </CardContent>
            </Card>
        </div>
    )
}