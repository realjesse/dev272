import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useGetPaintings = () => {
  return useQuery({
    queryKey: ["paintings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("paintings").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
