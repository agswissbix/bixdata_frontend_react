// src/store.ts
import { create } from 'zustand'

interface RecordsStore {

    refreshTable : number;
    setRefreshTable: (refreshTable: number) => void;

    cardsList: Array<{
        tableid: string,
        recordid: string,
        type: string,
    }>;
    addCard: (tableid: string, recordid: string, type: string) => void;
    removeCard: (tableid: string, recordid: string) => void;
    resetCardsList: () => void;
    
}

export const useRecordsStore = create<RecordsStore>((set) => ({
    refreshTable: 0,
    setRefreshTable: (refreshTable: number) => set({ refreshTable }),

    cardsList: [],
    addCard: (tableid: string, recordid: string, type: string) => 
        set((state) => {
            // Verifica se la combinazione esiste già
            const cardExists = state.cardsList.some(
                (card) => card.tableid === tableid && card.recordid === recordid
            );
            
            // Se non esiste, aggiungi la nuova card
            if (!cardExists) {
                return { cardsList: [...state.cardsList, { tableid, recordid, type }] };
            }

            // Altrimenti, ritorna lo stato invariato
            return state;
        }),
    removeCard: (tableid: string, recordid: string) => 
        set((state) => ({ 
            cardsList: state.cardsList.filter(
                (card) => card.tableid !== tableid || card.recordid !== recordid
            ) 
        })),
    resetCardsList: () => set({ cardsList: [] }),
}));
