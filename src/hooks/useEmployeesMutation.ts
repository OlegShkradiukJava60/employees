import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEmployeesMutation(mutationFn: MutationFunction) {
    const queryClient = useQueryClient();
    const res = useMutation({
        mutationFn,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["employees"]})
    })
    if(res.error) {
        throw res.error
        
    }
    return res;
}