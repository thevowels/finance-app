import Header from "@/components/Header";
import {Metadata} from "next";

type Props = {
    children: React.ReactNode;
}
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

const DashboardLayout = ({children}: Props) =>{

    return(
        <>
            <Header/>
            <main className="flex-grow h-full bg- flex justify-center items-center">
                {children}
            </main>
        </>
    )
}

export default DashboardLayout;