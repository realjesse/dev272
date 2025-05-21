import { Painting } from "@/components/ui/painting-contex-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdatePainting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedPainting: Partial<Painting>) => {
            const { data, error } = await supabase
                .from("paintings")
                .update(updatedPainting)
                .eq("id", updatedPainting.id)
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