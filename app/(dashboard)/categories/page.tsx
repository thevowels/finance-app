import Categories from "@/app/(dashboard)/categories/Categories";
import {Metadata} from "next";

export const metadata: Metadata={
    title: "Categories",
    description:" Categories for You!",
    openGraph: {
        title: 'Yours Finance',
        description: 'Track your income & expenses with ease using our app.',
        url: 'https://shadcn-finance.vercel.app',
        siteName: 'Shadcn Finance',
        type: 'website',
        images: [
            {
                url: 'https://www.example.com/shadcn-logo.png',
                width: 800,
                height: 600,
                alt: 'Shadcn Finance Logo',
            },
        ],
    },

}
export default function Page(){
    return(
        <Categories/>
    )
}