import { CircleX, Maximize2, Info } from 'lucide-react';
import { useState } from 'react';
import {useEffect} from "react";
import CardBadge from './card/cardBadge';
import CardTabs from './card/cardTabs';
import { useRecordsStore } from '../records/recordsStore';
import { consoleDebug } from '../../utils/develop'

interface RecordCardProps {
    tableid: string; // Prop ora è opzionale
    recordid: string; // Prop ora è opzionale
}

const RecordCard: React.FC<RecordCardProps> = ({ tableid, recordid }) => {
  consoleDebug('RecordCard tableid', tableid);
  const { removeCard } = useRecordsStore();
  const [animationClass, setAnimationClass] = useState('animate-slide-in');
  const [isMaximized, setIsMaximized] = useState(false);
  const [mountedTime, setMountedTime] = useState<string>("");

  const handleRemoveCard = () => {
    setAnimationClass('animate-slide-out');
    setTimeout(() => {
      removeCard(tableid, recordid);
    }, 300); // Durata dell'animazione in ms
  };

  // Calcola e memorizza l'orario in cui il componente è stato montato
    useEffect(() => {
        const now = performance.now();
        const minutes = Math.floor(now / 60000);
        const seconds = Math.floor((now % 60000) / 1000);
        const centiseconds = Math.floor((now % 1000) / 10);
        setMountedTime(`${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`);
    }, []);
    
  return (
    <div
    className={`absolute shadow-2xl right-0 mr-4 bg-gray-100 z-10 rounded-md p-3 ${animationClass} ${
      isMaximized ? ' right-0 w-5/6 h-5/6' : 'w-2/6 h-4/6'
    } transition-all duration-300`}
  >
    Record card mountedTime: {mountedTime}
      <div className="h-1/5 w-full">
        <div className='h-1/6 w-full flex justify-between items-center'>
          <div className="flex">
            <p className="text-black">{recordid}</p>
            <p className="text-black">{tableid}</p>
          </div>
          <div className="flex items-center gap-5"> 



          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button">Funzioni<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>

          <div id="dropdown" className="z-1000 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
          </div>



          <button onClick={() => setIsMaximized(!isMaximized)}>
                <Info className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>

              <button onClick={() => setIsMaximized(!isMaximized)}>
                <Maximize2 className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>

              <button className="cursor-pointer w-6 h-6 flex items-center justify-center transition-colors" onClick={handleRemoveCard}>
                <CircleX className="w-6 h-6 text-red-500 hover:text-red-700" />
              </button>
          </div>
        </div>
        <div className="h-5/6">
          <CardBadge tableid={tableid} recordid={recordid}></CardBadge>
        </div>
      </div>
      
      <div className="h-5/6 w-full">
        <CardTabs tableid={tableid} recordid={recordid}></CardTabs>
      </div>
    </div>
  );
};

export default RecordCard;


{/*
  
import { CircleX, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import CardBadge from './card/cardBadge';
import CardTabs from './card/cardTabs';
import { useRecordsStore } from '../records/recordsStore';

interface RecordCardProps {
    tableid: string; // Prop ora è opzionale
    recordid: string; // Prop ora è opzionale
}

const RecordCard: React.FC<RecordCardProps> = ({ tableid ,recordid }) => {

  const { removeCard } = useRecordsStore();

  return (
    <div className="absolute right-0 w-96 h-4/6 bg-gray-100 z-10 rounded-md animate-slide-in ">
      { recordid }
      { tableid }
        <div className=" h-1/6 w-full">
            <button className="cursor-pointer w-6 h-6 flex items-center justify-center transition-colors">
            <CircleX className="w-8 h-8 text-red-500 hover:text-red-700" onClick={() => removeCard(tableid, recordid)} />
            <Maximize2 className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
        </div>

        <CardBadge tableid={tableid} recordid={recordid}></CardBadge>
        <CardTabs tableid={tableid} recordid={recordid}></CardTabs>

    </div>
  );
};

export default RecordCard;  

*/}