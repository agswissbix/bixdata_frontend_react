import React, { useMemo } from 'react';
import '../../app/globals.css';
import RecordsTable from './records_table';
interface RecordTabsProps {
  tableid?: string; 
  searchTerm?: string;
}

const RecordTabs: React.FC<RecordTabsProps> = ({ tableid, searchTerm  }) => {
  return (
    
    <div className="h-full w-full">
        <div>
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
              <li className="me-2">
                  <a href="#" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Tabella</a>
              </li>
              <li className="me-2">
                  <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Kanban</a>
              </li>
          </ul>
        </div>
        <div id='records-tab-content'>
          <RecordsTable tableid={tableid} searchTerm={searchTerm}></RecordsTable>
        </div>
    </div>
  );
};

export default RecordTabs;
