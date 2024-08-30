
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger

} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Delete, Edit, MoreHorizontal, Trash} from "lucide-react";

import {useConfirm} from "@/hooks/use-confirm";
import {useDeleteCategory} from "@/features/categories/api/use-delete-category";
import {useOpenCategory} from "@/features/categories/hooks/use-open-category";



type Props = {
    id:string;
}

export default function Actions({id}:Props){

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
    );
    const deleteMutation = useDeleteCategory(id);

    const {onOpen} = useOpenCategory();
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