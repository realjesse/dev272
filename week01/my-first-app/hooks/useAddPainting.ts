import { Painting } from "@/components/ui/painting-contex-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type SupabaseNewPainting = Omit<Painting, "id">;

export const useAddPainting = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newPainting: SupabaseNewPainting) => {
            const { data, error } = await supabase
                .from("paintings")
                .insert(newPainting)
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