import { CircleX, Maximize2, Minimize2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import React, { use, useState } from 'react';
import CardBadge from './cardBadge';
import CardFields from './cardFields';
import CardLinked from './cardLinked';

interface CardCompProps {
    recorid: string;
    tableid: string;
    openCards: number[];
    closingCard: number | null;
    onCloseCard: (id: number) => void;
    fullscreenCard: number | null;
    setFullscreenCard: (id: number | null) => void;
}

const CardComp: React.FC<CardCompProps> = ({
                                               openCards,
                                               closingCard,
                                               onCloseCard,
                                               fullscreenCard,
                                               setFullscreenCard
                                           }) => {

    const [activeTab, setActiveTab] = useState<string>('linked');

    const tablerows = [
        {
            id: 1,
            title: "Apple MacBook Pro 17",
            description: "MacBook Pro 17"
        },
        {
            id: 2,
            title: "Microsoft Surface Pro",
            description: "Surface Pro 2"
        },
        {
            id: 3,
            title: "Magic Mouse 2",
            description: "Magic Mouse 2"
        }
    ];

    const toggleFullscreen = (id: number) => {
        
        if (fullscreenCard) {
            fullscreenCard = null;
            setFullscreenCard(null);

        }
        else {
            fullscreenCard = id;
            setFullscreenCard(id);
        }

        toast.success('Toggle fullscreen')
    };

    const tabContent: Record<string, React.ReactNode> = {
        fields: <CardFields />,
        linked: <CardLinked />,
    };
    

    return (
        <div className="relative w-full h-full flex justify-center items-end">
                    {openCards.map((id, index) => {
                        const item = tablerows.find(d => d.id === id);
                        const isClosing = id === closingCard;
                        const isFullscreen = id === fullscreenCard;

                        return (
                            <div
                                key={id}
                                className={`
                                    z-10 absolute top-0 bg-white rounded-lg shadow-xl 
                                    transition-all duration-300 ease-out border border-gray-300 
                                    w-full h-full cursor-default 
                                    ${isClosing ? 'transform translate-x-16 opacity-0' : ''}    
                                `}
                                style={{
                                    transform: !isFullscreen ? `translateX(${index * -30}px) translateY(${index * 15}px) rotate(${index * -2}deg)` : 'none',
                                    zIndex: isFullscreen ? 50 : openCards.length - index,
                                }}
                            >
                                <div className="p-6 relative h-min">
                                    <div className="flex gap-2 float-right">
                                        <button
                                            onClick={() => toggleFullscreen(id)}
                                            className="cursor-pointer w-6 h-6 flex items-center justify-center transition-colors"
                                        >
                                            {isFullscreen ? (
                                                <Minimize2 className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                                            ) : (
                                                <Maximize2 className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => onCloseCard(id)}
                                            className="cursor-pointer w-6 h-6 flex items-center justify-center transition-colors"
                                        >
                                            <CircleX className="w-4 h-4 text-red-500 hover:text-red-700" />
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">{item?.title}</h3>
                                    <p className="text-gray-600 text-base mt-2">{item?.description}</p>
                                </div>

                                {/*BADGE COMPONENT*/}
                                <div className="h-1/6">
                                    <CardBadge />
                                </div>
                                {/*BADGE COMPONENT*/}


                                <div className="text-sm font-medium text-center text-gray-500  border-gray-200 dark:text-gray-400 h-min">
                                    <ul className="flex flex-wrap -mb-px">
                                        <li className="me-2" onClick={() => setActiveTab('fields')}>
                                            <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Campi</a>
                                        </li>
                                        <li className="me-2" onClick={() => setActiveTab('linked')}>
                                            <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Collegati</a>
                                        </li>
                                    </ul>
                                </div>

                                
                                <div className="p-6 h-4/6">
                                {tabContent[activeTab] || <p>Tab non trovata</p>}
                                </div>
                                </div>

                    
                        );
                    })}
                </div>
    );
};

export default CardComp;