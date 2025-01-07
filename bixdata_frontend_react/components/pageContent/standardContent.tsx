import React from 'react';
import '../../app/globals.css';
import RecordTabs from '../records/records_tabs';
import RecordFilters from '../records/records_filters';

interface ContentProps {
  tableid: string;
}

const StandardContent: React.FC<ContentProps> = ({ tableid }) => {
  return (
    <div className="h-full w-full bg-black p-4 m-b-4">
      {/*
      <h2>Contenuto</h2>
      <p>Hai selezionato: <strong>{tableid}</strong></p>
      */}
      <div><RecordFilters></RecordFilters></div>
      <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Nuovo</button>
      <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Ricarica</button>
      <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Esporta</button>



      <div><RecordTabs tableid={tableid}></RecordTabs></div>

    </div>
  );
};

export default StandardContent;


