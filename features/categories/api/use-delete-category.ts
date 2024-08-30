import { InferRequestType, InferResponseType} from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { client } from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.categories[':id']['$delete'] >


export const useDeleteCategory = (id?:string) =>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (json) => {
            const response = await client.api.categories[':id'].$delete({param:{id}});
            return  await response.json();
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey:["category",{id}]})
            queryClient.invalidateQueries({queryKey:["categories"]})
            //TODO: Invalidate summary and transactions
            toast.success(`Category Deleted`)
        },
        onError: () =>{
            toast.error("Failed to edit Category")
        }

    })
    return mutation;
}
