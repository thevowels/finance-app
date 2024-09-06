"use client"

import { useState } from "react";
import {Button} from "@/components/ui/button";


const userCopy = () => {
    const textToCopy = "kohtet4823@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Text copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };
    handleCopy();
}
const passCopy = () => {
    const textToCopy = "kohtet@12345";

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Text copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
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