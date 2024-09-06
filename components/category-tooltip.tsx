import  { format } from 'date-fns';

import { formatCurrency} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

export default function CategoryTooltip({active, payload}: any){
    if(!active){
        return null;

    }
    const name = payload[0].payload.name;
    const value = payload[0].value;

    return(
        <div
            className="rounded-sm bg-white shadow-sm border overflow-hidden"
        >
            <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
                {name}
            </div>
            <Separator/>
            <div className="p-2 px-3 space-y-1">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="size-1.5 bg-rose-500 rounded-full"/>
                        <p className="text-sm text-muted-foreground ">
                            Expenses
                        </p>
                    </div>
                    <p className="text-sm text-right font-medium text-rose-500">
                        {value}
                    </p>
                </div>
            </div>


        </div>
    )
}