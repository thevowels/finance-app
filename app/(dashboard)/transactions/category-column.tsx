import { useOpenAccount} from "@/features/accounts/hooks/use-open-account";
import { cn } from "@/lib/utils"
import {useOpenCategory} from "@/features/categories/hooks/use-open-category";
import {TriangleAlert} from "lucide-react";
import {useOpenTransaction} from "@/features/transactions/hooks/use-open-transaction";

type Props = {
    id:string;
    category: string | null;
    categoryId: string | null;
}

export const CategoryColumn = ({
    id,
    category,
    categoryId
}:Props) =>{
    const {onOpen: onOpenCategory} = useOpenCategory();
    const {onOpen: onOpenTransaction} = useOpenTransaction();
    if(!categoryId){
        return(
            <div className="flex text-rose-500 cursor-pointer hover:underline"
                onClick={() => onOpenTransaction(id)}
            >
                <TriangleAlert className="mr-2 size-4 shrink-0"/>Uncategorized
            </div>
        )
    }

    const onClick = () =>{
            onOpenCategory(categoryId)
    }
    return(
        <div
            className="flex items-center cursor-pointer hover:underline"
            onClick={onClick}
        >
            {category}
        </div>
    )
}
