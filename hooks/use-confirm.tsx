'use client'

import { useState } from "react"

import { Button} from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
    DialogFooter
} from "@/components/ui/dialog";


export const useConfirm = (
    title:string,
    message: string,
):[() => JSX.Element, () => Promise<unknown>] =>{

    const [promise, setPromise] = useState<{resolve: (value:boolean) => void} | null> (null);

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    })

    const handleClose = () =>{
        setPromise( null);
    }

    const handleConfirm = () =>{
        promise?.resolve(true);
        handleClose();
    }

    const handleCancel = () =>{
        promise?.resolve(false);
        handleClose();
    }

    const ConfirmationDialog = () =>(
        <Dialog open={promise !== null }>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogHeader>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant="outline">Cancel</Button>
                    <Button onClick={handleConfirm}>Proceed</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )

    return [ConfirmationDialog , confirm]


}