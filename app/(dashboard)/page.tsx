"use client"
import {useNewAccount} from "@/features/accounts/hooks/use-new-account";
import {Button} from "@/components/ui/button";

export default function Home() {

    const {isOpen, onOpen} = useNewAccount();

    return (
        <div>
            <Button onClick={onOpen}> Add an account</Button>
        </div>
  );
}
