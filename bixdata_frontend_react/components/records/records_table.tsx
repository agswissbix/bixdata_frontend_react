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
    responseExample1: number;
    responseExample2: string;
}

// RESPONSE DI ESEMPIO PER LO SVILUPPO
const componentDataDEV: ResponseInterface = {
    responseExample1: 123,
    responseExample2: "test"
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
            {(response: ResponseInterface) => (
                <div>
                    <p>
                        <strong>Tabella risultati di:</strong> {tableid}
                    </p>
                </div>
            )}
        </GenericComponent>

    );
};

export default RecordsTable;
