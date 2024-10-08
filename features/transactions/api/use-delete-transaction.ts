import { InferRequestType, InferResponseType} from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { client } from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.transactions[':id']['$delete'] >


export const useDeleteTransaction = (id?:string) =>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (json) => {
            const response = await client.api.transactions[':id'].$delete({param:{id}});
            return  await response.json();
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey:["transaction",{id}]})
            queryClient.invalidateQueries({queryKey:["transactions"]})
            queryClient.invalidateQueries({queryKey:["summary"]})
            toast.success(`Transaction Deleted`)
        },
        onError: () =>{
            toast.error("Failed to edit Transactiondd")
        }

    })
    return mutation;
}
