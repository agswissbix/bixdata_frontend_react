import React, { useMemo, useState } from 'react';
import { useEffect } from "react";
import { useApi } from '../../../utils/useApi';
import GenericComponent from '../../genericComponent';
import { ChevronDown } from 'lucide-react';
import RecordsTable from '../../records/records_table';

interface propsInterface {
    masterTableid: string,
    masterRecordid: string,
}

interface ResponseInterface {
    linkedTables: Array<{
        tableid: string;
        description: string;
        rowsCount: number;
    }>;
}

const componentDataDEV: ResponseInterface = {
    linkedTables: [
        {
            tableid: "company",
            description: "Azienda",
            rowsCount: 1,
        },
        {
            tableid: "contact",
            description: "Contatti",
            rowsCount: 1,
        },
        {
            tableid: "tableid",
            description: "siung",
            rowsCount: 1,
        },
        {
            tableid: "tableid",
            description: "siung",
            rowsCount: 1,
        },
        {
            tableid: "tableid",
            description: "siung",
            rowsCount: 1,
        },
        {
            tableid: "tableid",
            description: "siung",
            rowsCount: 1,
        },
        {
            tableid: "tableid",
            description: "siung",
            rowsCount: 1,
        },
        {
            tableid: "tableid",
            description: "siung",
            rowsCount: 1,
        },
        {
            tableid: "tableid",
            description: "siung",
            rowsCount: 1,
        },
    ]
};

const CardLinkedToChange: React.FC<propsInterface> = ({ masterTableid, masterRecordid }) => {
    const [componentData, setComponentData] = useState<ResponseInterface>(componentDataDEV);
    const [openCards, setOpenCards] = useState<boolean[]>(new Array(componentDataDEV.linkedTables.length).fill(false));

    const handleCollapse = (index: number) => {
        setOpenCards(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const payload = useMemo(() => ({
        apiRoute: 'testpost',
        masterTableid: masterTableid,
        masterRecordid: masterRecordid,
        additionalInfo: {
            example2: 'example',
            example3: 'example',
        },
    }), [masterRecordid]);

    const { response, loading, error } = useApi<ResponseInterface>(payload);

    /*
    useEffect(() => {
        if (response) {
            setComponentData(response);
            setOpenCards(new Array(response.linkedTables.length).fill(false));
        }
    }, [response]);
    */

    return (
        <GenericComponent response={componentData} loading={loading} error={error}>
            {(data) => (
                <div className="h-full w-full flex flex-col">
                    {data.linkedTables.map((table, index) => (
                        <>
                            <div 
                                className="w-full mx-auto border border-gray-200 rounded-md p-2 shadow"
                                onClick={() => handleCollapse(index)}
                            >
                                <div className="w-full">
                                    <span className="float-start bg-bixcolor-light text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded">{table.rowsCount}</span>
                                    <p className="text-black float-start">{table.description}</p>
                                    <ChevronDown className={`text-gray-400 float-end transform transition-transform ${openCards[index] ? 'rotate-180' : ''}`}/>
                                </div>
                            </div>
                            <div className={`w-full h-96 max-h-96 border border-gray-300  rounded-md shadow animate-slide-in ${!openCards[index] ? 'hidden' : ''}`}>
                                <RecordsTable tableid={table.tableid} searchTerm={''} ></RecordsTable>
                            </div>
                        </>
                    ))}
                </div>
            )}
        </GenericComponent>
    );
};

export default CardLinkedToChange;