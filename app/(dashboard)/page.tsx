import DataGrid from "@/components/data-grid";
import {DataCharts} from "@/components/data-chart";
import {Metadata} from "next";
export const metadata: Metadata={
    title: "Shadcn Finance",
    description:" 'Track your income & expenses with ease using our app.!",
    openGraph: {
        title: 'Yours Finance',
        description: 'Track your income & expenses with ease using our app.',
        url: 'https://shadcn-finance.vercel.app',
        siteName: 'Shadcn Finance',
        type: 'website',
        images: [
            {
                url: 'https://shadcn-finance.vercel.app/shadcn-logo.png',
                width: 800,
                height: 600,
                alt: 'Shadcn Finance Logo',
            },
        ],
    },

}

export default function Home() {


    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-19 -mt-24">
            <DataGrid/>
            <DataCharts/>
        </div>
  );
}
