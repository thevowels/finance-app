import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useNewAccount} from "@/features/accounts/hooks/use-new-account";
import {AccountForm} from "@/features/accounts/components/account-form";
import {insertAccountSchema} from "@/db/schema";
import {z} from "zod";
import {useCreateAccount} from "@/features/accounts/api/use-create-account";

const formSchema = insertAccountSchema.pick({
    name:true,
})

type FormValues = z.input<typeof formSchema>


export const NewAccountSheet = () =>{

    const {isOpen, onOpen, onClose} = useNewAccount();

    const mutation = useCreateAccount();

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
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    defaultValues={{
                        name:""
                    }}
                    onSubmit={onSubmit}
                    disabled={mutation.isPending} />

            </SheetContent>
        </Sheet>
    )
}