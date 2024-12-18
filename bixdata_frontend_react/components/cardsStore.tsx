import { create } from 'zustand';

interface CardsStore {
    openCards: number[];
    closingCard: number | null;
    fullscreenCard: number | null;
    setOpenCards: (openCards: number[]) => void;
    setClosingCard: (closingCard: number | null) => void;
    setFullscreenCard: (fullscreenCard: number | null) => void;
}

export const useCardsStore = create<CardsStore>((set) => ({
    openCards: [],
    closingCard: null,
    fullscreenCard: null,
    setOpenCards: (openCards) => set({ openCards }),
    setClosingCard: (closingCard) => set({ closingCard }),
    setFullscreenCard: (fullscreenCard) => set({ fullscreenCard }),
}));
