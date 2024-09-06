"use client"

import { useState } from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";


const userCopy = () => {
    const textToCopy = "kohtet4823@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast.success('Text copied to clipboard!',{ duration: 1000,position: 'top-center',
                });
            })
            .catch(err => {
                toast.error('Failed to copy text: ', { duration: 1000,position: 'top-center',
                });
            });
    };
    handleCopy();
}
const passCopy = () => {
    const textToCopy = "kohtet@12345";

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast.success("Account Created",{ duration: 1000,position: 'top-center',
                })
            })
            .catch(err => {
                toast.error('Failed to copy text: ',{ duration: 1000,position: 'top-center',
                });
            });
    };
    handleCopy();
}
export default function Credentials() {


            const [show, setShow] = useState(false)
    if(show){
        return (
            <div>
                <div>
                    <p onClick={userCopy}>********@gmail.com</p>
                    <p onClick={passCopy}>*****@12345</p>
                </div>
                <Button onClick={()=>setShow(false)} variant="outline">Credentials</Button>
            </div>
        )
    }
    return(
        <>
            <Button variant="outline" onClick={()=>setShow(true)}> Credentials</Button>
        </>
    )
}