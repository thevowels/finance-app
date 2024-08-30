import Header from "@/components/Header";

type Props = {
    children: React.ReactNode;
}

const DashboardLayout = ({children}: Props) =>{

    console.log('Dashboard Layout is used')
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