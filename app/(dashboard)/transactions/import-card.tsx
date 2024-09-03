import {Button} from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {Plus} from "lucide-react";
import {UploadButton} from "@/app/(dashboard)/transactions/upload-button";
import {DataTable} from "@/components/data-table";
import {columns} from "@/app/(dashboard)/transactions/columns";
import {useState} from "react";
import { parse, format } from "date-fns"
import ImportTable from "@/app/(dashboard)/transactions/import-table";
import {convertAmounttoMilliunits} from "@/lib/utils";
const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";


const requiredOptions = [
    "amount",
    "date",
    "payee",
];

interface  SelectedColumnsState {
    [key: string]: string | null;
}



type Props = {
    data:string[][];
    onCancel : () => void;
    onSubmit: (data:any) => void;
}
export default function  ImportCard({data, onCancel, onSubmit } : Props) {

    const [ selectedColumns, setSelectedColumns ] = useState<SelectedColumnsState>({});
    const headers = data[0];
    const body = data.slice(1);

    const progress = Object.values(selectedColumns).filter(Boolean).length;

    const handleContinue = () =>{
        const getColumnIndex = (column:string) =>{
            return column.split("_")[1];
        }

        const mappedData = {
            headers: headers.map((_header, index) =>{
                return selectedColumns[`column_${index}`] || null;
            }),
            body: body.map( (row) =>{
                const transformedRow = row.map((cell, index) =>{
                    return selectedColumns[`column_${index}`] ? cell: null;
                });
                return transformedRow.every((item) => item == null)
                                                                    ? []
                                                                    : transformedRow;
            }).filter((row) => row.length > 0),
        }

        const arrayOfData = mappedData.body.map((row) =>{
            return row.reduce((acc:any, cell,index) =>{
                const header = mappedData.headers[index];
                if(header !== null){
                    acc[header] = cell;
                }
                return acc;
            },{})
        })

        const formattedData = arrayOfData.map((item) => ({
            ...item,
            amount: convertAmounttoMilliunits(parseFloat(item.amount)),
            date: format(parse(item.date, dateFormat, new Date()), outputFormat)
        }))

        onSubmit(formattedData)
    }

    const onTableHeadSelectChange = (columnIndex:number, value:string | null) => {
        setSelectedColumns((prev) =>{
            const newSelectedColunns = {...prev};
            for(const key in newSelectedColunns){
                if(newSelectedColunns[key] == value){
                    newSelectedColunns[key] = null;
                }
            }

            if(value === "skip"){
                value = null;
            }

            newSelectedColunns[`column_${columnIndex}`] = value;
            return newSelectedColunns;
        })
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 lg:-mt-24 ">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import Transactions
                    </CardTitle>
                    <div className="flex gap-x-2 gap-y-2 items-center flex-col lg:flex-row ">
                        <Button onClick={onCancel} size="sm" className="w-full lg:auto">
                            Cancel
                        </Button>
                        <Button
                            className="w-full lg:auto"
                            disabled={progress < requiredOptions.length}
                            onClick={handleContinue}
                        >
                            Continue ({progress} / {requiredOptions.length})
                        </Button>

                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers = {headers}
                        body={body}
                        selectedColumns={selectedColumns}
                        onTableHeadSelectChange = {onTableHeadSelectChange}

                        />
                    Hello
                </CardContent>
            </Card>
        </div>)
}