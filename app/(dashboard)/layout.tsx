import Header from "@/components/Header";

type Props = {
    children: React.ReactNode;
}

const DashboardLayout = ({children}: Props) =>{

    console.log('Dashboard Layout is used')
    return(
        <>
            <Header/>
            <main className="b g-sky-200">
                {children}
            </main>
        </>
    )
}

export default DashboardLayout;