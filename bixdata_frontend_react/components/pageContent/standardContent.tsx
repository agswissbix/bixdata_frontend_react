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
import RecordCard from '../record/record_card';

import { CircleX, Maximize2, Minimize2 } from 'lucide-react';


interface ContentProps {
  tableid: string;
}

const StandardContent: React.FC<ContentProps> = ({ tableid }) => {
  
  const [recordid, setRecordid] = useState('')


  const [searchTerm, setSearchTerm] = useState(''); // Stato per il valore di ricerca
  const {refreshTable, setRefreshTable} = useRecordsStore(); // Stato per il valore di ricerca

  const {cardsList, addCard, removeCard, resetCardsList, handleRowClick} = useRecordsStore(); // Stato per il valore di ricerca
  
  
  const changeTheme = (theme: "root" | "theme-test") => {
    document.documentElement.classList.remove("root", "theme-test");
    document.documentElement.classList.add(`${theme}`);
  };
  


useEffect(() => {
  if (recordid) {
    resetCardsList(); // Resetta le schede
    addCard(tableid, recordid, 'standard'); // Aggiungi la nuova scheda
  }
}, [recordid]);


  // Funzione callback per aggiornare la ricerca
  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const refreshTableFunc = () => {
    setRefreshTable(refreshTable + 1);
  }

  return (
    <div className="h-full w-full shadow-2xl bg-white rounded-lg p-4">
      <button onClick={() => changeTheme('theme-test')} className='bg-blue-500 text-white p-2 rounded-lg'>
        cambia tema
      </button>
      {/*
      <h2>Contenuto</h2>
      <p>Hai selezionato: <strong>{tableid}</strong></p>
      */}
      <div className="flex flex-wrap w-full mb-4">
        <div className="w-1/2">
          <RecordFilters onSearchChange={handleSearchChange}></RecordFilters>
        </div>
        <div className="w-1/2">
          <button type="button" className="float-end text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => handleRowClick('', tableid, 'standard')}>Nuovo</button>
          <button type="button" className="float-end text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={refreshTableFunc}>Ricarica</button>
          <button type="button" className="float-end text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Esporta</button>
        </div>  
      </div>

{cardsList.map((card, index) => (
    <RecordCard 
        key={`${card.tableid}-${card.recordid}`}
        tableid={card.tableid} 
        recordid={card.recordid}
        index={index}
        total={cardsList.length}
    />
))}


      <div><RecordTabs tableid={tableid} searchTerm={searchTerm}></RecordTabs></div>

    </div>
  );
};

export default StandardContent;


