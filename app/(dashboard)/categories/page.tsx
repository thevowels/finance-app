import Categories from "@/app/(dashboard)/categories/Categories";
import {Metadata} from "next";

export const metadata: Metadata={
    title: "Categories",
    description:" Categories for You!",
}
export default function Page(){
    return(
        <Categories/>
    )
}