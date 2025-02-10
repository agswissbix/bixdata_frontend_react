import React, { useMemo } from 'react';
import {useState} from "react";
import {useEffect} from "react";
import '../../app/globals.css';
import { useApi } from '../utils/useApi';
import GenericComponent from './genericComponent';


interface propsInterface {
    propExample?: string;
}

interface ResponseInterface {
    dataExample1: number;
    dataExample2: string;
}

// RESPONSE DI DEFAULT
const componentDataDEFAULT: ResponseInterface = {
    dataExample1: 0,
    dataExample2: ""
  };

// RESPONSE DI ESEMPIO PER LO SVILUPPO
const componentDataDEV: ResponseInterface = {
    dataExample1: 123,
    dataExample2: "test"
  };

const ExampleComponentWithData: React.FC<propsInterface> = ({ propExample }) => {

    //Dati da usare nel componente
    const [componentData, setComponentData] = useState<ResponseInterface>(componentDataDEFAULT);

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
        <GenericComponent response={componentData} loading={loading} error={error}> 
            {(data: ResponseInterface) => (
                //html del compontente in cui si possono usare sia i props che i dati ricevuti dal backend
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Profile</h1>
                <p>
                    <strong>Menu Item Selected:</strong> {propExample}
                </p>
                <p>
                    <strong>menuItemBackend:</strong> {data.dataExample1}
                </p>
                </div>
            )}
        </GenericComponent>

    );
};

export default ExampleComponentWithData;
