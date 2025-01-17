import React, { useState } from 'react';
import CardFields from './cardFields';
import CardLinkedToChange from './cardLinkedToChange';
import { useRecordsStore } from '@/components/records/recordsStore';

interface CardTabsProps {
  tableid: string; 
  recordid: string;
}

const CardTabs: React.FC<CardTabsProps> = ({ tableid, recordid }) => {
  const { addCard } = useRecordsStore();
  const [activeTab, setActiveTab] = useState('Fields');

  return (
    <div className="h-full">
      <div className="h-min text-sm font-medium text-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px relative">
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg transition-all duration-300 ${
                activeTab === 'Fields'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('Fields')}
            >
              Campi
            </button>
          </li>
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg transition-all duration-300 ${
                activeTab === 'Linked'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('Linked')}
            >
              Collegati
            </button>
          </li>
        </ul>
      </div>

      <div className="h-5/6 p-4 overflow-scroll">
        {activeTab === 'Fields' ? (
          <CardFields tableid={tableid} recordid={recordid} />
        ) : (
          <CardLinkedToChange masterTableid={tableid} masterRecordid={recordid} />
        )}
      </div>
    </div>
  );
};

export default CardTabs;
