import { SupabaseNewPainting, useAddPainting } from "@/hooks/useAddPainting";
import { useDeletePainting } from "@/hooks/useDeletePainting";
import { useGetPaintings } from "@/hooks/useGetPaintings";
import { useUpdatePainting } from "@/hooks/useUpdatePainting";
import { createContext, useContext, useEffect, useState } from "react";

export type Painting = {
  id: string;
  name: string;
  artist: string;
  year: number;
  wikipediaLink: string;
  isFavorite?: boolean;
};

type PaintingContextType = {
  isLoading: boolean;
  paintings: Painting[];
  addPainting: (paintings: SupabaseNewPainting) => void;
  updatePainting: (updatedPainting: Partial<Painting>) => void;
  toggleFavorite: (id: string) => void;
  deletePainting: (id: string) => void;
};

const PaintingContext = createContext<PaintingContextType | undefined>(
  undefined,
);

export const PaintingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isFetching } = useGetPaintings();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const addPaintingMutation = useAddPainting();
  const deletePaintingMutation = useDeletePainting();
  const updatePaintingMutation = useUpdatePainting();

  const addPainting = async (painting: SupabaseNewPainting) => {
    addPaintingMutation.mutate(painting);
  };

  const deletePainting = async (paintingId: Painting["id"]) => {
    deletePaintingMutation.mutate(paintingId);
  };

  const updatePainting = (updatedPainting: Partial<Painting>) => {
    updatePaintingMutation.mutate(updatedPainting);
  };

  const toggleFavorite = (id: string) => {
    const paintingToToggle = paintings.find((painting) => painting.id === id);
    if (!paintingToToggle) return;
    updatePainting({
      ...paintingToToggle,
      isFavorite: !paintingToToggle.isFavorite,
    });
  };

  useEffect(() => {
    if (data && !isFetching) {
      setPaintings(data as Painting[]);
    }
  }, [data, isFetching]);

  return (
    <PaintingContext.Provider
      value={{
        isLoading:
          isFetching ||
          addPaintingMutation.isPending ||
          deletePaintingMutation.isPending,
        paintings,
        addPainting,
        updatePainting,
        toggleFavorite,
        deletePainting,
      }}
    >
      {children}
    </PaintingContext.Provider>
  );
};

export const usePaintingContext = () => {
  const context = useContext(PaintingContext);
  if (!context) {
    throw new Error(
      "usePaintingContext must be used within a PaintingProvider",
    );
  }
  return context;
};
