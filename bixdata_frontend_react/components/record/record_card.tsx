import { CircleX, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import CardBadge from './card/cardBadge';
import CardTabs from './card/cardTabs';
import { useRecordsStore } from '../records/recordsStore';

interface RecordCardProps {
    tableid: string; // Prop ora è opzionale
    recordid: string; // Prop ora è opzionale
}

const RecordCard: React.FC<RecordCardProps> = ({ tableid, recordid }) => {
  const { removeCard } = useRecordsStore();
  const [animationClass, setAnimationClass] = useState('animate-slide-in');
  const [isMaximized, setIsMaximized] = useState(false);

  const handleRemoveCard = () => {
    setAnimationClass('animate-slide-out');
    setTimeout(() => {
      removeCard(tableid, recordid);
    }, 300); // Durata dell'animazione in ms
  };

  return (
    <div
    className={`absolute shadow-2xl right-0 mr-4 bg-gray-100 z-10 rounded-md p-3 ${animationClass} ${
      isMaximized ? ' right-0 w-5/6 h-4/6' : 'w-1/6 h-4/6'
    } transition-all duration-300`}
  >
      <div className="h-1/6 w-full">
        <p className="text-black">{recordid}</p>
        <p className="text-black">{tableid}</p>
        <button className="cursor-pointer w-6 h-6 flex items-center justify-center transition-colors" onClick={handleRemoveCard} >
          <CircleX className="w-8 h-8 text-red-500 hover:text-red-700" />
          </button>

          <button onClick={() => setIsMaximized(!isMaximized)}>
          <Maximize2 className="w-4 h-4 text-gray-500 hover:text-gray-700"  />
          </button>
      </div>

      <CardBadge tableid={tableid} recordid={recordid}></CardBadge>
      <CardTabs tableid={tableid} recordid={recordid}></CardTabs>
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