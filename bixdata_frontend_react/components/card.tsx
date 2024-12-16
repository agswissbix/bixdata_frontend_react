import { CircleX, Maximize2, Minimize2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import React from 'react';




interface CardCompProps {
    tableid: string;
    recorid: string;
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
                        <div className="p-6 relative h-1.5/6">
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
                        <div className="h-1/6 w-full bg-gray-100">
                            <div className="flex flex-row h-1/2">
                                <p className="w-1/3 text-center">test1</p>
                                <p className="w-1/3 text-center">test2</p>
                                <p className="w-1/3 text-center">test3</p>
                            </div>
                            <div className="flex flex-row h-1/2">
                                <p className="w-1/3 text-center">test4</p>
                                <p className="w-1/3 text-center">test5</p>
                                <p className="w-1/3 text-center">test6</p>
                            </div>
                        {/*BADGE COMPONENT*/}


                        



                        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                            <ul className="flex flex-wrap -mb-px">
                                <li className="me-2">
                                    <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Campi</a>
                                </li>
                                <li className="me-2">
                                    <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Collegati</a>
                                </li>
                            </ul>
                        </div>

                        
                        <div id="accordion-collapse" data-accordion="collapse">
                        <h2 id="accordion-collapse-heading-1">
                            <button  onClick={() => onRowClick(Math.floor(Math.random() * 1000000).toString())} type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                            <span>What is Flowbite?</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                            </svg>
                            </button>
                        </h2>
                        <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                            <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                            </div>
                        </div>
                        <h2 id="accordion-collapse-heading-2">
                            <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                            <span>Is there a Figma file available?</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                            </svg>
                            </button>
                        </h2>
                        <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
                            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                            <p className="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                            </div>
                        </div>
                        <h2 id="accordion-collapse-heading-3">
                            <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                            <span>What are the differences between Flowbite and Tailwind UI?</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                            </svg>
                            </button>
                        </h2>
                        <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
                            <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                            <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                                <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                                <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                            </ul>
                            </div>
                        </div>
                        </div>


                        </div>

                    </div>
            
                );
            })}
        </div>
    );
};

export default CardComp;