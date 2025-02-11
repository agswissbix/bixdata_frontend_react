import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import '../../app/globals.css';
import { useApi } from '../../utils/useApi';
import GenericComponent from '../genericComponent';
import {useRecordsStore} from './recordsStore';

// INTERFACCE

interface RecordsTableProps {
    tableid?: string;
    searchTerm?: string;
    filters?: string;
    context?: string;
}

interface ResponseInterface {
    rows: Array<{
        recordid: string;
        css: string;
        fields: Array<{
            recordid?: string;
            css: string;
            type: string;
            value: string;
        }>
    }>;
    columns: Array<{
        fieldtypeid: string;
        desc: string;
    }>;
}

// DATI DI DEFAULT
const componentDataDEFAULT: ResponseInterface = {
    rows: [],
    columns: [],
  };

// DATI DI ESEMPIO PER LO SVILUPPO
const componentDataDEV: ResponseInterface = {
    rows: [
        {
            recordid: "1",
            css: "#",
            fields: [
                {
                    recordid: "",
                    css: "",
                    type: "standard",
                    value: "macbook"
                },
                {
                    recordid: "",
                    css: "",
                    type: "standard",
                    value: "nero"
                },
                {
                    recordid: "",
                    css: "",
                    type: "standard",
                    value: "Laptop"
                },
                {
                    recordid: "",
                    css: "",
                    type: "standard",
                    value: "2k"
                },
            ]
        },
        {
            recordid: "2",
            css: "#",
            fields: [
                {
                    recordid: "",
                    css: "",
                    type: "standard",
                    value: "surface",
                },
                {
                    recordid: "",
                    css: "",
                    type: "standard",
                    value: "bianco",
                },
                {
                    recordid: "",
                    css: "",
                    type: "standard",
                    value: "Laptop",
                },
                {
                    recordid: "",
                    css: "",
                    type: "standard",
                    value: "1k",
                },
            ]
        },
    ],
    columns: [
        {
            fieldtypeid: "Numero",
            desc: 'Product name'
        },
        {
            fieldtypeid: "Numero",
            desc: 'Color'
        },
        {
            fieldtypeid: "Numero",
            desc: 'Type'
        },
        {
            fieldtypeid: "Numero",
            desc: 'Price'
        },
    ],
  };
  

  const RecordsTable: React.FC<RecordsTableProps> = ({ tableid, searchTerm, context}) => {
    // Dati da usare nel componente
    const [componentData, setComponentData] = useState<ResponseInterface>(componentDataDEFAULT);

    const {refreshTable,handleRowClick} = useRecordsStore();

    // Dati da inviare al backend
    const payload = useMemo(() => ({
        apiRoute: 'get_table_records', // riferimento api per il backend
        tableid: tableid,
        searchTerm: searchTerm,
        additionalInfo: {
            example: 'example',
        },
    }), [refreshTable, tableid]);

    // Richiama il backend
    const { response, loading, error } = useApi<ResponseInterface>(payload);

    useEffect(() => {
        if (response) {
            console.info(response)
            setComponentData(response);
        }
    }, [response]);
    
    return (
        // Usa il compontente generico per gestire gli stati di loading e di error
        <GenericComponent response={componentData} loading={loading} error={error}>
            {(data) => (
                <div className="h-full">
                    <div className="w-full h-full relative overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {data.columns.map((column) => (
                                        <th scope="" className="px-6 py-3">
                                            {column.desc}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.rows.map((row) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer" onClick={() => handleRowClick && tableid && context && handleRowClick(row.recordid, tableid, context)}>
                                        {row.fields.map((field) => (
                                            <td className="px-6 py-4">
                                                {field.value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <nav aria-label="Page navigation example" className="text-center">
                        <ul className="inline-flex text-sm">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                        </ul>
                    </nav>
                </div>
            )}
        </GenericComponent>
    );
};

export default RecordsTable;
