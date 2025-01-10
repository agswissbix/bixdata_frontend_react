import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import { useApi } from '../../../utils/useApi';
import GenericComponent from '../../genericComponent';

interface CardFieldsProps {
    tableid: string;
    recordid: string;
}

interface ResponseInterface {
    fields: Array<{
        fieldid: string;
        description: string;
        value: string;
        fieldtype: string;
    }>
}

const componentDataDEV: ResponseInterface = {
    fields: [
        {
            fieldid: "test1",
            description: "Test 1",
            value: "test1",
            fieldtype: "Parola"
        },
        {
            fieldid: "test2",
            description: "Test 2",
            value: "test2",
            fieldtype: "Parola"
        },
        {
            fieldid: "test3",
            description: "Test 3",
            value: "test3",
            fieldtype: "Parola"
        },
        {
            fieldid: "test4",
            description: "Test 4",
            value: "test4",
            fieldtype: "Parola"
        },
        {
            fieldid: "test5",
            description: "Test 5",
            value: "test5",
            fieldtype: "Parola"
        },
        {
            fieldid: "test6",
            description: "Test 6",
            value: "test6",
            fieldtype: "Parola"
        }
    ]
};

const CardFields: React.FC<CardFieldsProps> = (tableid, recordid) => {
    const [componentData, setComponentData] = useState<ResponseInterface>(componentDataDEV);

    const payload = useMemo(() => ({
        apiRoute: 'testpost', // riferimento api per il backend
        example1: tableid,
        additionalInfo: {
            example2: 'example',
            example3: 'example',
        },
    }), [tableid]);

    // Usa l'hook passando il payload
    const { response, loading, error } = useApi<ResponseInterface>(payload);

    return (
        <GenericComponent response={componentData} loading={loading} error={error}> 
        {(data: ResponseInterface) => (
            
            <div className="h-2/3">
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        {data.fields.map(field => (
                            <div key={field.fieldid}>
                                <p className="text-black">{field.description}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ flex: 1 }}>
                        {data.fields.map(field => (
                            <div key={field.fieldid}>
                                <p className="text-black border-2">{field.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        )}
    </GenericComponent>
    );
}

export default CardFields;
