import React from 'react';
import {useState} from "react";
import {useEffect} from "react";
import '../../app/globals.css';
import RecordTabs from '../records/records_tabs';
import RecordFilters from '../records/records_filters';
import {useRecordsStore} from '../records/recordsStore';
import CardBadge from '../record/card/cardBadge';
import CardFields from '../record/card/cardFields';
import { Card } from '../calendars/ui/card';

import { CircleX, Maximize2, Minimize2 } from 'lucide-react';


interface ContentProps {
  tableid: string;
}

const StandardContent: React.FC<ContentProps> = ({ tableid }) => {
  
  const [recordid, setRecordid] = useState('')

  const handleRowClick = (recordid: string) => {
    // Gestione interna del click
    setRecordid(recordid); // Comunica al componente padre la selezione
  };

  const [searchTerm, setSearchTerm] = useState(''); // Stato per il valore di ricerca
  const {refreshTable, setRefreshTable} = useRecordsStore(); // Stato per il valore di ricerca

  // Funzione callback per aggiornare la ricerca
  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const refreshTableFunc = () => {
    setRefreshTable(refreshTable + 1);
  }

  return (
    <div className="h-full w-full shadow-2xl bg-white rounded-lg p-4">
      {/*
      <h2>Contenuto</h2>
      <p>Hai selezionato: <strong>{tableid}</strong></p>
      */}
      <div className="flex flex-wrap w-full mb-4">
        <div className="w-1/2">
          <RecordFilters onSearchChange={handleSearchChange}></RecordFilters>
        </div>
        <div className="w-1/2">
          <button type="button" className="float-end text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Nuovo</button>
          <button type="button" className="float-end text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={refreshTableFunc}>Ricarica</button>
          <button type="button" className="float-end text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Esporta</button>
        </div>  
      </div>

      {recordid !== '' && (
        <div className="absolute right-0 w-96 h-4/6 bg-gray-100 z-10 rounded-md animate-slide-in">
          <div className=" h-1/6 w-full">
          <button className="cursor-pointer w-6 h-6 flex items-center justify-center transition-colors">
            <CircleX className="w-4 h-4 text-red-500 hover:text-red-700" />
            <Maximize2 className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
          </div>
            {recordid}
            <CardBadge></CardBadge>
            <CardFields></CardFields>
        </div>
      )}


      <div><RecordTabs tableid={tableid} searchTerm={searchTerm} handleRowClick={handleRowClick}></RecordTabs></div>




      <nav aria-label="Page navigation example" className="text-center">
        <ul className="inline-flex text-sm">
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default StandardContent;


