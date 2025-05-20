import { Painting } from "@/components/ui/painting-contex-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeletePainting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (paintingId: Painting['id']) => {
            const { data, error } = await supabase
                .from("paintings")
                .delete()
                .eq('id', paintingId)
            if (error) {
                console.log(error)
                throw new Error(error.message)
            }
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["paintings"] })
        },
    })
}