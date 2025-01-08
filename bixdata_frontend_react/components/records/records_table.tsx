import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import '../../app/globals.css';
import { useApi } from '../../utils/useApi';
import GenericComponent from '../genericComponent';


// INTERFACCE

interface RecordsTableProps {
    tableid?: string;
    searchTerm?: string;
    filters?: string;
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
  
  const RecordsTable: React.FC<RecordsTableProps> = ({ tableid, searchTerm }) => {
    // Dati da usare nel componente
    const [componentData, setComponentData] = useState<ResponseInterface>(componentDataDEFAULT);

    // Dati da inviare al backend
    const payload = useMemo(() => ({
        apiRoute: 'get_table_records', // riferimento api per il backend
        tableid: tableid,
        searchTerm: searchTerm,
        additionalInfo: {
            example: 'example',
        },
    }), [tableid]);

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
                <div>
                    test:{searchTerm}
                    <div className="relative overflow-x-auto">
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
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                </div>
            )}
        </GenericComponent>
    );
};

export default RecordsTable;
