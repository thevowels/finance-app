import { InferRequestType, InferResponseType} from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { client } from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.accounts[':id']['$delete'] >


export const useDeleteAccount = (id?:string) =>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (json) => {
            const response = await client.api.accounts[':id'].$delete({param:{id}});
            return  await response.json();
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey:["account",{id}]})
            queryClient.invalidateQueries({queryKey:["accounts"]})
            //TODO: Invalidate summary and transactions
            toast.success(`Account Deleted`)
        },
        onError: () =>{
            toast.error("Failed to edit account")
        }

    })
    return mutation;
}
