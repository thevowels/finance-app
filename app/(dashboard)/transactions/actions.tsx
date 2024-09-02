
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger

} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Delete, Edit, MoreHorizontal, Trash} from "lucide-react";

import {useConfirm} from "@/hooks/use-confirm";
import {useOpenTransaction} from "@/features/transactions/hooks/use-open-transaction";
import {useDeleteTransaction} from "@/features/transactions/api/use-delete-transaction";



type Props = {
    id:string;
}

export default function Actions({id}:Props){

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
    );
    const deleteMutation = useDeleteTransaction(id);

    const {onOpen} = useOpenTransaction();
    const handleDelete = async() =>{
        console.log("Handling delete")
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