
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger

} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Delete, Edit, MoreHorizontal, Trash} from "lucide-react";

import { useOpenAccount} from "@/features/accounts/hooks/use-open-account";
import {useDeleteAccount} from "@/features/accounts/api/use-delete-account";
import {useConfirm} from "@/hooks/use-confirm";



type Props = {
    id:string;
}

export default function Actions({id}:Props){

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
    );
    const deleteMutation = useDeleteAccount(id);

    const {onOpen} = useOpenAccount();
    const handleDelete = async() =>{
        const ok = await confirm();
        if(ok){
            deleteMutation.mutate()
        }
    }
    return(
        <div>
            <ConfirmDialog/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        disabled={false}
                        onClick={()=>{
                            onOpen(id)
                        }}
                    >
                        <Edit className="size-4 mr-2"/>
                            Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                    >
                        <Trash className="size-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}