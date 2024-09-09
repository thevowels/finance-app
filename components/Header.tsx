import HeaderLogo from "@/components/HeaderLogo";
import {Loader2, Navigation as Naa} from "lucide-react";
import Navigation from "@/components/Navigation";
import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import WelcomeMsg from "@/components/welcome-msg";
import Filters from "@/components/filters";


export default function Header() {
    return(
        <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 lg:pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo/>
                        <Navigation />
                    </div>
                    <ClerkLoaded>
                        <UserButton />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="size-8 animate-spin text-muted-foreground"/>
                    </ClerkLoading>
                </div>
                <WelcomeMsg/>
                <Filters/>

            </div>
        </header>
    )
}