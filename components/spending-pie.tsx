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
import {FileSearch, PieChart, Radar, Target} from "lucide-react";
import AreaVariant from "@/components/area-variant";
import BarVariant from "@/components/bar-variant";
import LineVariant from "@/components/line-variant";
import {Button} from "@/components/ui/button";
import {PieVariant} from "@/components/pie-variant";


type Props = {
    data?:{
        name: string,
        value: number,
    }[]
}

enum chartType{
    pie = "pie",
    radar = "radar",
    radial = "radial"
}


export default function SpendingPie({ data = [] }: Props){
    const [ chart, setChart ] = useState<chartType>(chartType.pie)

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
                    Transact

                    {/* TODO: Add Select*/}
                </CardTitle>
                <Select
                    defaultValue={chartType.pie}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto rounded-md px-3">
                        <SelectValue placeholder="Chart type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={chartType.pie}>
                            <div className="flex items-center">
                                <PieChart className = "size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Pie Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value={chartType.radar}>
                            <div className="flex items-center">
                                <Radar className = "size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">
                                    Line Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value={chartType.radial}>
                            <div className="flex items-center">
                                <Target className = "size-4 mr-2 shrink-0" />
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
                    {chart === chartType.pie && <PieVariant data={data}/>}
                    {/*{chart === chartType.radar &&  <BarVariant data={data}/>}*/}
                    {/*{chart === chartType.radial && <LineVariant data={data}/>}*/}
                </>)}

            </CardContent>
        </Card>
    )
}