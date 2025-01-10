import { CircleX, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import CardBadge from './card/cardBadge';
import CardFields from './card/cardFields';

interface RecordCardProps {
  recordid?: string; // Prop ora è opzionale
}

const RecordCard: React.FC<RecordCardProps> = ({ recordid }) => {
  return (
    <div className="absolute right-0 w-96 h-4/6 bg-gray-100 z-10 rounded-md animate-slide-in">
      { recordid }
        <div className=" h-1/6 w-full">
            <button className="cursor-pointer w-6 h-6 flex items-center justify-center transition-colors">
            <CircleX className="w-8 h-8 text-red-500 hover:text-red-700" />
            <Maximize2 className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
        </div>

        <CardBadge></CardBadge>
        <CardFields></CardFields>
    </div>
  );
};

export default RecordCard;