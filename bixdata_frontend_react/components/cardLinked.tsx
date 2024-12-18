import React from 'react';
import TableComp from './table';
import { useCardsStore } from './cardsStore';

interface CardLinkedProps {
    linkedTables: LinkedTable[];
}

interface LinkedTable {
    tableid: string;
    description: string;
    rowCount: number;
}

const mockBixData: LinkedTable[] = [
    {
        tableid: "table1",
        description: "Tabella 1",
        rowCount: 10,
    },
    {
        tableid: "table2",
        description: "Tabella 2",
        rowCount: 20,
    },
    {
        tableid: "table3",
        description: "Tabella 3",
        rowCount: 30,
    },
];

const CardLinked: React.FC = () => {
    const { openCards, setOpenCards } = useCardsStore(); // Usa lo store
    const [linkedTables, setLinkedTables] = React.useState<LinkedTable[]>(mockBixData);

    const handleRowClick = (id: number) => {
        if (!openCards.includes(id)) {
            setOpenCards([id, ...openCards]); // Aggiorna lo stato globale
        }
    };

    return (
        <div
            id="accordion-collapse"
            data-accordion="collapse"
            className="h-full overflow-y-scroll"
        >
            <h2 id="accordion-collapse-heading-1">
                <button
                    onClick={() =>
                        handleRowClick(Math.floor(Math.random() * 1000000))
                    }
                    type="button"
                    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                    data-accordion-target="#accordion-collapse-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-1"
                >
                    <span>What is Flowbite?</span>
                    <svg
                        data-accordion-icon
                        className="w-3 h-3 rotate-180 shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5 5 1 1 5"
                        />
                    </svg>
                </button>
            </h2>
            <div
                id="accordion-collapse-body-1"
                className="hidden"
                aria-labelledby="accordion-collapse-heading-1"
            >
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Flowbite is an open-source library of interactive
                        components built on top of Tailwind CSS including
                        buttons, dropdowns, modals, navbars, and more.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                        Check out this guide to learn how to{" "}
                        <a
                            href="/docs/getting-started/introduction/"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            get started
                        </a>{" "}
                        and start developing websites even faster with
                        components on top of Tailwind CSS.
                    </p>
                </div>
            </div>

            {linkedTables.map((item, index) => (
                <div key={item.tableid}>
                    <h2 id={`accordion-collapse-heading-${index + 2}`}>
                        <button
                            type="button"
                            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                            data-accordion-target={`#accordion-collapse-body-${index + 2}`}
                            aria-expanded="false"
                            aria-controls={`accordion-collapse-body-${index + 2}`}
                        >
                            <span>{item.description}</span>
                            <svg
                                data-accordion-icon
                                className="w-3 h-3 rotate-180 shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id={`accordion-collapse-body-${index + 2}`}
                        className="block"
                        aria-labelledby={`accordion-collapse-heading-${index + 2}`}
                    >
                        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                            <TableComp onRowClick={handleRowClick} />
                        </div>
                    </div>
                </div>
            ))}

            <h2 id="accordion-collapse-heading-3">
                <button
                    type="button"
                    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                    data-accordion-target="#accordion-collapse-body-3"
                    aria-expanded="false"
                    aria-controls="accordion-collapse-body-3"
                >
                    <span>
                        What are the differences between Flowbite and Tailwind
                        UI?
                    </span>
                    <svg
                        data-accordion-icon
                        className="w-3 h-3 rotate-180 shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5 5 1 1 5"
                        />
                    </svg>
                </button>
            </h2>
            <div
                id="accordion-collapse-body-3"
                className="hidden"
                aria-labelledby="accordion-collapse-heading-3"
            >
                <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        The main difference is that the core components from
                        Flowbite are open source under the MIT license, whereas
                        Tailwind UI is a paid product. Another difference is
                        that Flowbite relies on smaller and standalone
                        components, whereas Tailwind UI offers sections of
                        pages.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        However, we actually recommend using both Flowbite,
                        Flowbite Pro, and even Tailwind UI as there is no
                        technical reason stopping you from using the best of
                        two worlds.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Learn more about these technologies:
                    </p>
                    <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                        <li>
                            <a
                                href="https://flowbite.com/pro/"
                                className="text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Flowbite Pro
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://tailwindui.com/"
                                rel="nofollow"
                                className="text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Tailwind UI
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CardLinked;
