import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import { useApi } from '../../../utils/useApi';
import GenericComponent from '../../genericComponent';
import InputWord from './FieldsInputs/inputWord';
import InputNumber from './FieldsInputs/inputNumber';
import InputDate from './FieldsInputs/inputDate';
import InputMemo from './FieldsInputs/inputMemo';
import InputCheckbox from './FieldsInputs/inputCheckbox';
import SelectUser from './FieldsInputs/selectUser';
import SelectStandard from './FieldsInputs/selectStandard';
import { Toaster, toast } from 'sonner';
import { Input } from 'postcss';

interface CardFieldsProps {
    tableid: string;
    recordid: string;
}

interface ResponseInterface {
    fields: Array<{
        tableid: string;
        fieldid: string;
        fieldorder: string;
        description: string;
        value: string | { code: string; value: string };
        fieldtype: string;
        lookupitems?: Array<{itemcode: string, itemdesc: string, link: string, linkfield: string, linkvalue: string, linkedfield: string, linkedvalue: string}>;
        lookupitemsuser? : Array<{id: string, firstname: string, lastname: string, link: string, linkdefield: string, linkedvalue: string}>;
        settings: string | {calcolato: string, default: string, nascosto: string, obbligatorio: string};
    }>
}

const componentDataDEV: ResponseInterface = {
    fields: [
        {
            tableid: "1",
            fieldid: "test1",
            fieldorder: "1",
            description: "Test 1",
            value: { code: 'test1aaa', value: 'test1aaa' },
            fieldtype: "Parola",
            settings: {calcolato: 'false', default: '', nascosto: 'false', obbligatorio: 'false'}
        },
        {
            tableid: "1",
            fieldid: "test2",
            fieldorder: "2",
            description: "Test 2",
            value: { code: '2', value: '2' },
            fieldtype: "Numero",
            settings: {calcolato: 'false', default: '', nascosto: 'false', obbligatorio: 'false'}

        },
        {
            tableid: "1",
            fieldid: "test3",
            fieldorder: "3",
            description: "Test 3",
            value: { code: '2024-10-30', value: '30/10/2024' },
            fieldtype: "Data",
            settings: {calcolato: 'false', default: '', nascosto: 'false', obbligatorio: 'false'}

        },
        {
            tableid: "1",
            fieldid: "test4",
            fieldorder: "4",
            description: "Test 4",
            value: { code: 'test4', value: 'test4' },
            fieldtype: "Memo",
            settings: {calcolato: 'false', default: '', nascosto: 'false', obbligatorio: 'false'}

        },
        {
            tableid: "1",
            fieldid: "test5",
            fieldorder: "5",
            description: "Test 5",
            value: { code: 'test5', value: 'test5' },
            fieldtype: "Utente",
            lookupitemsuser: [
                {id: '1', firstname: 'Mario', lastname: 'Rossi', link: 'user', linkdefield: 'id', linkedvalue: '1'},
                {id: '2', firstname: 'Luca', lastname: 'Bianchi', link: 'user', linkdefield: 'id', linkedvalue: '2'}
            ],
            settings: {calcolato: 'false', default: '', nascosto: 'false', obbligatorio: 'false'}

        },
        {
            tableid: "1",
            fieldid: "test6",
            fieldorder: "6",
            description: "Test 6",
            value: { code: 'test6', value: 'test6' },
            fieldtype: "Categoria",
            lookupitems: [
                {itemcode: '1', itemdesc: 'Item 1', link: 'item', linkfield: 'id', linkvalue: '1', linkedfield: 'id', linkedvalue: '1'},
                {itemcode: '2', itemdesc: 'Item 2', link: 'item', linkfield: 'id', linkvalue: '2', linkedfield: 'id', linkedvalue: '2'}
            ],
            settings: {calcolato: 'false', default: '', nascosto: 'false', obbligatorio: 'false'}
        },
        {
            tableid: "1",
            fieldid: "test7",
            fieldorder: "7",
            description: "Test 7",
            value: { code: 'test77', value: 'test7' },
            fieldtype: "Checkbox",
            settings: {calcolato: 'false', default: '', nascosto: 'false', obbligatorio: 'false'}
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
            
            <div className="h-full">
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
                                <InputWord 
                                    initialValue={typeof field.value === 'object' ? field.value.code : field.value} 
                                    onChange={(value: string) => handleInputChange(field.fieldid, value)} 
                                />
                            ) : field.fieldtype === 'Numero' ? (
                                <InputNumber 
                                    initialValue={typeof field.value === 'object' ? field.value.code : field.value} 
                                    onChange={(value: string) => handleInputChange(field.fieldid, value)} 
                                />
                            ) : field.fieldtype === 'Data' ? (
                                <InputDate 
                                    initialValue={typeof field.value === 'object' ? field.value.code : field.value} 
                                    onChange={(value: string) => handleInputChange(field.fieldid, value)} 
                                />
                            ) : field.fieldtype === 'Memo' ? (
                                <InputMemo 
                                    initialValue={typeof field.value === 'object' ? field.value.code : field.value} 
                                    onChange={(value: string) => handleInputChange(field.fieldid, value)} 
                                />
                            ) : field.fieldtype === 'Checkbox' ? (
                                <InputCheckbox 
                                    initialValue={typeof field.value === 'object' ? field.value.code : field.value} 
                                    onChange={(value: string) => handleInputChange(field.fieldid, value)} 
                                />
                            ) : field.fieldtype === 'Utente' && field.lookupitemsuser ? (
                                <SelectUser
                                  lookupItems={field.lookupitemsuser}
                                  initialValue={typeof field.value === 'object' ? field.value.code : field.value}
                                  onChange={(value: string) => handleInputChange(field.fieldid, value)}
                                />
                            ) : field.fieldtype === 'Categoria' && field.lookupitems ? (
                                <SelectStandard
                                    lookupItems={field.lookupitems.map(item => ({
                                    itemcode: item.itemcode,
                                    itemdesc: item.itemdesc,
                                    }))}
                                    initialValue={typeof field.value === 'object' ? field.value.code : field.value}
                                    onChange={(value: string) => handleInputChange(field.fieldid, value)}
                                />
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
