import { SupabaseNewPainting, useAddPainting } from "@/hooks/useAddPainting";
import { useGetPaintings } from "@/hooks/useGetPaintings";
import { createContext, useContext, useEffect, useState } from "react";

export type Painting = {
    id: string;
    name: string;
    artist: string;
    year: number;
    wikipediaLink: string;
    isFavorite?: boolean;
}

type PaintingContextType = {
    isLoading: boolean;
    paintings: Painting[];
    addPainting: (paintings: SupabaseNewPainting) => void;
    updatePainting: (id: string, updatedPainting: Partial<Painting>) => void;
    toggleFavorite: (id: string) => void;
}

const PaintingContext = createContext<PaintingContextType | undefined>(undefined);

export const PaintingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {data, isFetching} = useGetPaintings();
    const [paintings, setPaintings] = useState<Painting[]>([]);
    const addPaintingMutation = useAddPainting();

    const addPainting = async (painting: SupabaseNewPainting) => {
        addPaintingMutation.mutate(painting);
    };

    const updatePainting = (id: string, updatedPainting: Partial<Painting>) => {
        setPaintings((prev) =>
            prev.map((painting) =>
                painting.id === id ? { ...painting, ...updatedPainting } : painting
            )
        );
    };

    const toggleFavorite = (id: string) => {
        setPaintings((prev) => 
            prev.map((painting) =>
                painting.id === id ? { ...painting, isFavorite: !painting.isFavorite } : painting
            )
        );
    };

    useEffect(() => {
        if (data && !isFetching) {
            console.log("Fetched data: ", data);
            setPaintings(data as Painting[]);
        }
        if (isFetching) {
            console.log("Fetching data...")
        }
    }, [data, isFetching])

    return (
        <PaintingContext.Provider value={{ isLoading: isFetching || addPaintingMutation.isPending, paintings, addPainting, updatePainting, toggleFavorite }}>
            {children}
        </PaintingContext.Provider>
    )
}

export const usePaintingContext = () => {
    const context = useContext(PaintingContext);
    if (!context) {
        throw new Error('usePaintingContext must be used within a PaintingProvider');
    }
    return context;
}