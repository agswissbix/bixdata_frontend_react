import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import '../../app/globals.css';
import { useApi } from '../utils/useApi';
import GenericComponent from './genericComponent';


interface ExampleComponentProps {
    propExample?: string;
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

const ExampleComponentWithData: React.FC<ExampleComponentProps> = ({ propExample }) => {

    //Dati da usare nel componente
    const [componentData, setComponentData] = useState<ResponseInterface>();

    // Dati da inviare al backend
    const payload = useMemo(() => ({
        apiRoute: 'testpost', // riferimento api per il backend
        example1: propExample,
        additionalInfo: {
            example2: 'example',
            example3: 'example',
        },
    }), [propExample]);

    // Usa l'hook passando il payload
    const { response, loading, error } = useApi<ResponseInterface>(payload);

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
                //html del compontente in cui si possono usare sia i props che i dati ricevuti dal backend
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Profile</h1>
                <p>
                    <strong>Menu Item Selected:</strong> {propExample}
                </p>
                <p>
                    <strong>menuItemBackend:</strong> {response.responseExample1}
                </p>
                </div>
            )}
        </GenericComponent>

    );
};

export default ExampleComponentWithData;
