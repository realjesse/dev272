import { createContext, useContext, useState } from "react";
import paintingData from '@/data/paintings.json';

export type Painting = {
    id: string;
    name: string;
    artist: string;
    year: number;
    wikipediaLink: string;
    isFavorite?: boolean;
}

type PaintingContextType = {
    paintings: Painting[];
    addPainting: (paintings: Painting) => void;
    updatePainting: (id: string, updatedPainting: Partial<Painting>) => void;
    toggleFavorite: (id: string) => void;
}

const PaintingContext = createContext<PaintingContextType | undefined>(undefined);

export const PaintingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [paintings, setPaintings] = useState<Painting[]>(paintingData as Painting[]);

    const addPainting = (painting: Painting) => {
        setPaintings((prev) => [...prev, painting]);
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

    return (
        <PaintingContext.Provider value={{ paintings, addPainting, updatePainting, toggleFavorite }}>
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