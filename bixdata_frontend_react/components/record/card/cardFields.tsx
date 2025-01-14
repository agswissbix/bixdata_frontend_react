import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import { useApi } from '../../../utils/useApi';
import GenericComponent from '../../genericComponent';
import InputWord from './FieldsInputs/inputWord';
import InputNumber from './FieldsInputs/inputNumber';
import InputDate from './FieldsInputs/inputDate';
import { Toaster, toast } from 'sonner';
import { Input } from 'postcss';

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
            value: "2",
            fieldtype: "Numero"
        },
        {
            fieldid: "test3",
            description: "Test 3",
            value: "2022-01-01",
            fieldtype: "Data"
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

const CardFields: React.FC<CardFieldsProps> = ({ tableid, recordid }) => {
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

    const handleInputChange = (fieldid: string, newValue: string) => {
        setComponentData(prevState => ({
            fields: prevState.fields.map(field =>
                field.fieldid === fieldid ? { ...field, value: newValue } : field
            )
        }));
    };

    const payloadSave = useMemo(() => ({
        apiRoute: 'set_record_fields', // riferimento api per il backend
        tableid: tableid,
        recordid: recordid,
        fields: componentData.fields,
    }), [componentData]);


    const handleSave = async () => {
        console.log("Salvataggio dati:", payloadSave);
        try {

            const response = await fetch('/api/postApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payloadSave),
            });

            if (!response.ok) {
                toast.error('Errore durante il salvataggio dei dati');
                
            } else {
                toast.success('Dati salvati con successo');
            }


            //console.log("Current field values:", componentData.fields);
 
        } catch (error) {
            console.error('Errore durante il salvataggio dei dati:', error);
        }
    }

    return (
        <GenericComponent response={componentData} loading={loading} error={error}> 
        {(data: ResponseInterface) => (
            
            <div className="h-2/3">
                <div className="h-full flex flex-row">
                    <div className="flex-1 flex flex-col">
                        {data.fields.map(field => (
                            <div className="flex-1" key={field.fieldid}>
                                <p className="text-black">{field.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1">
                        {data.fields.map(field => (
                            <div key={field.fieldid}>
                                {field.fieldtype === 'Parola' ? (
                                    <InputWord initialValue={field.value} onChange={(value: string) => handleInputChange(field.fieldid, value)} />
                                ) : field.fieldtype === 'Numero' ? (
                                    <InputNumber initialValue={field.value} onChange={(value: string) => handleInputChange(field.fieldid, value)} />
                                ) : field.fieldtype === 'Data' ? (
                                    <InputDate initialValue={field.value}  onChange={(value: string) => handleInputChange(field.fieldid, value)} />
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button" onClick={handleSave} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Salva</button>
            </div>

        )}
    </GenericComponent>
    );
}

export default CardFields;
