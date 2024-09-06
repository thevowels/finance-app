"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem

} from "@/components/ui/select"

import { useState} from "react"
import {BarChart3, FileSearch, LineChart, AreaChart} from "lucide-react";
import AreaVariant from "@/components/area-variant";
import BarVariant from "@/components/bar-variant";
import LineVariant from "@/components/line-variant";
import {Button} from "@/components/ui/button";


type Props = {
    data?:{
        date: string,
        income: number,
        expenses:number,
    }[]
}

enum chartType{
    bar = "bar",
    area = "area",
    line = "line"
}


export default function Chart({ data = [] }: Props){
    const [ chart, setChart ] = useState<chartType>(chartType.area)

    const onTypeChange = (type:chartType)=>{
        setChart(type);
    }
    return(
        <Card className="
                        border-none
                        drop-shadow-md
                        "
            >
            <CardHeader
                className="
                    flex
                    space-y-2
                    lg:space-y-0
                    lg:flex-row
                    lg:items-center
                    justify-between
                "
                >
                <CardTitle
                        className=" text-xl line-clamp-1 flex-row"
                    >
                    Transactions

                    {/* TODO: Add Select*/}
                </CardTitle>
                <Select
                    defaultValue={chartType.area}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto rounded-md px-3">
                        <SelectValue placeholder="Chart type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={chartType.area}>
                            <div className="flex items-center">
                                <AreaChart className = "size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Area Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value={chartType.line}>
                            <div className="flex items-center">
                                <LineChart className = "size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Line Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value={chartType.bar}>
                            <div className="flex items-center">
                                <BarChart3 className = "size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Bar Chart
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>


                </Select>
            </CardHeader>
            <CardContent>
                {data.length == 0 ? (
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                        <FileSearch className="size-6 text-muted-foreground"/>
                        <p className="text-muted-foreground text-sm">
                            No data for this Period
                        </p>
                    </div>
                ) : (<>
                    {chart === chartType.area && <AreaVariant data={data}/>}
                    {chart === chartType.bar &&  <BarVariant data={data}/>}
                    {chart === chartType.line && <LineVariant data={data}/>}
                </>)}

            </CardContent>
        </Card>
    )
}