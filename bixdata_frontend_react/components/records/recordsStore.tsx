// src/store.ts
import { create } from 'zustand'

interface RecordsStore {

    refreshTable : number;
    setRefreshTable: (refreshTable: number) => void;
    
}

export const useRecordsStore = create<RecordsStore>((set) => ({

    refreshTable: 0,
    setRefreshTable: (refreshTable: number) => set({ refreshTable }),

}));