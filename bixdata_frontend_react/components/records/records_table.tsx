import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import '../../app/globals.css';
import { useApi } from '../../utils/useApi';
import GenericComponent from '../genericComponent';


interface RecordsTableProps {
    tableid?: string;
    search?: string;
    filters?: string;
}

interface ResponseInterface {
    rows: Array<{
        id: number;
        name: string;
        color: string;
        category: string;
        price: string;
    }>;
}

// RESPONSE DI ESEMPIO PER LO SVILUPPO
const componentDataDEV: ResponseInterface = {
    rows: [
        {
            id: 1,
            name: 'Apple MacBook Pro 19"',
            color: 'Silver',
            category: 'Laptop',
            price: '$2999',
        },
        {
            id: 2,
            name: 'Microsoft Surface Pro',
            color: 'White',
            category: 'Laptop PC',
            price: '$1999',
        },
        {
            id: 3,
            name: 'Magic Mouse 2',
            color: 'Black',
            category: 'Accessories',
            price: '$99',
        },
    ],
  };

const RecordsTable: React.FC<RecordsTableProps> = ({ tableid }) => {
    // Dati da inviare al backend
    const payload = useMemo(() => ({
        apiRoute: 'testpost', // riferimento api per il backend
        tableid: {tableid},
        additionalInfo: {
            example2: 'example',
            example3: 'example',
        },
    }), [tableid]);

    // Usa l'hook passando il payload per recuperare i dati dal backend
    const { response, loading, error } = useApi<ResponseInterface>(payload);

    //Dati da usare nel componente
    const [componentData, setComponentData] = useState<ResponseInterface>();

    // Usa la response di esempio per lo sviluppo
        useEffect(() => {
            setComponentData(componentDataDEV);
        }, []); 
    
    
    // Usa la response del backend
    /*
    useEffect(() => {
        if (response) {
            setComponentData(response);
        }
    }, [response]);
    */

    return (
        // Usa il compontente generico per gestire gli stati di loading e di error
        <GenericComponent response={response} loading={loading} error={error}> 
            {(componentData: ResponseInterface) => (
                <div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Color
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {componentData.rows.map((row) => (
                                    <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {row.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {row.color}
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.price}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </GenericComponent>

    );
};

export default RecordsTable;
