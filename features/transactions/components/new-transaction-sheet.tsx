import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

// import { useNewAccount} from "@/features/accounts/hooks/use-new-account";
import { useNewTransaction} from "@/features/transactions/hooks/use-new-transaction";
import {AccountForm} from "@/features/accounts/components/account-form";
import {insertTransactionSchema} from "@/db/schema";
import {z} from "zod";
import {useCreateTransaction} from "@/features/transactions/api/use-create-transaction";
import {useGetCategories} from "@/features/categories/api/use-get-categories";
import {useCreateCategory} from "@/features/categories/api/use-create-category";
import {TransactionForm} from "@/features/transactions/components/transaction-form";
import {Loader2} from "lucide-react";
import {useCreateAccount} from "@/features/accounts/api/use-create-account";
import {useGetAccounts} from "@/features/accounts/api/use-get-accounts";

const formSchema = insertTransactionSchema.omit({
    id:true,
})

type FormValues = z.input<typeof formSchema>


export const NewTransactionSheet = () =>{

    const {isOpen, onOpen, onClose} = useNewTransaction();

    const createMutation = useCreateTransaction();

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();
    const onCreateCategory = (name:string) => categoryMutation.mutate({
        name
    })

    const categoryOptions = (categoryQuery.data ?? []).map( (category) =>({
        label: category.name,
        value: category.id
    }))

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name:string) => accountMutation.mutate({
        name
    })

    const accountOptions = (accountQuery.data ?? []).map( (account) =>({
        label: account.name,
        value: account.id
    }))


    const isPending = createMutation.isPending || categoryMutation.isPending || accountMutation.isPending

    const isLoading = categoryQuery.isLoading || accountQuery.isLoading

    const onSubmit = (values:FormValues) =>{
        createMutation.mutate(values,{
            onSuccess: () =>{
                onClose();
            }
        });
    }
    return(
        <Sheet open ={isOpen} onOpenChange={onClose}>
            <SheetContent className="overflow-y-scroll w-full">
                <SheetHeader>
                    <SheetTitle>
                        New Transaction
                    </SheetTitle>
                    <SheetDescription>
                        Create a new Transaction
                    </SheetDescription>
                </SheetHeader>
                <p>Transaction Form</p>
                {isLoading
                ?(
                    <div className="absolute inset-0 flex items-center justify-center " >
                            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                    </div>

                    )
                :(
                    <TransactionForm
                        onSubmit={onSubmit}
                        disabled={isPending}
                        categoryOptions = {categoryOptions}
                        accountOptions = {accountOptions}
                        onCreateCategory = {onCreateCategory}
                        onCreateAccount = {onCreateAccount}
                    />
                    )}
            </SheetContent>
        </Sheet>
    )
}