import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useNewCategory} from "@/features/categories/hooks/use-new-category";
import {insertCategorySchema} from "@/db/schema";
import {z} from "zod";
import { useCreateCategory} from "@/features/categories/api/use-create-category";
import {CategoryForm} from "@/features/categories/components/category-form";

const formSchema = insertCategorySchema.pick({
    name:true,
})

type FormValues = z.input<typeof formSchema>


export const NewCategorySheet = () =>{

    const {isOpen, onOpen, onClose} = useNewCategory();

    const mutation = useCreateCategory();

    const onSubmit = (values:FormValues) =>{
        mutation.mutate(values,{
            onSuccess: () =>{
                onClose();
            }
        });
    }
    return(
        <Sheet open = {isOpen} onOpenChange={onClose}>
            <SheetContent className="overflow-y-auto w-full">
                <SheetHeader>
                    <SheetTitle>
                        New Category
                    </SheetTitle>
                    <SheetDescription>
                        Create a Category to organize your categories.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
                    defaultValues={{
                        name:""
                    }}
                    onSubmit={onSubmit}
                    disabled={mutation.isPending} />

            </SheetContent>
        </Sheet>
    )
}