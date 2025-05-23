import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import '../../app/globals.css';
import { useRecordsStore } from './recordsStore';


interface RecordFiltersProps {
  onSearchChange: (searchTerm: string) => void; 
}

const RecordFilters: React.FC<RecordFiltersProps> = ({ onSearchChange  }) => {
    const [inputValue, setInputValue] = useState('');
    const {refreshTable,setRefreshTable} = useRecordsStore();


    // Funzione per gestire il cambiamento dell'input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const keyword = e.target.value;
      setInputValue(keyword); // Aggiorna stato locale
      onSearchChange(keyword); // Passa il valore al componente genitore
    };
    const researchTableSubmit = () => {
      setRefreshTable(refreshTable + 1);
    }

  return (
    <div className="w-full">
      <form className="max-w-md" onSubmit={(e) => {e.preventDefault(); researchTableSubmit(); }}>   
        <div className="max-w-md float-start">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Cerca</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cerca"  value={inputValue} onChange={handleInputChange} />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cerca</button>
            </div>
        </div>
      </form>
      <button type="button" className="float-start text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Filtri</button>

    </div>
  );
};

export default RecordFilters;
