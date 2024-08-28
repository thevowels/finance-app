import {ClerkLoaded, ClerkLoading, SignIn} from "@clerk/nextjs";
import {Loader2} from "lucide-react";
import Image from "next/image";

const SignInPage = () =>{
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full lg:flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-4 pt-16">
                    <h1 className="font-bold text-3xl text-[#2E2A47]">
                        Welcome Back!
                    </h1>
                    <p className="text-base  text-[#7E8CA0]">
                        Log in or Create account to get back to your app.
                    </p>
                </div>
                <div className="flex justify-center mt-10">
                    <ClerkLoading>
                        <Loader2 className="animate-spin text-muted-foreground"/>
                    </ClerkLoading>
                    <ClerkLoaded>
                        <SignIn path={'/sign-in'}/>
                    </ClerkLoaded>
                </div>
            </div>
            <div className=" bg-sky-100 space-y-4 py-16 flex items-center justify-center px-4 ">
                <Image src={"/logo.svg"} alt={"Finance Logo"} width={100} height={100}/>
            </div>
        </div>

    )
}

export default SignInPage