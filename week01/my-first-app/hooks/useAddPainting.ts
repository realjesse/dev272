import { Painting } from "@/components/ui/painting-contex-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query"



export const useAddPainting = (newPainting: Painting) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newPainting) => {
            const { data, error } = await supabase
                .from("painting")
                .insert(newPainting)
            if (error) {
                throw new Error(error.message)
            }
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["paintings"] })
        },
    })
}