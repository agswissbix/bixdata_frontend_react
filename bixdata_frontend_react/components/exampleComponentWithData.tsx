import React, { useMemo } from 'react';
import '../../app/globals.css';
import { useApi } from '../utils/useApi';
import GenericComponent from './genericComponent';

interface ResponseInterface {
    responseExample1: number;
    responseExample2: string;
}

interface ExampleComponentProps {
    propExample?: string;
}

const ExampleComponentWithData: React.FC<ExampleComponentProps> = ({ propExample }) => {
    // Payload da inviare al backend
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


    return (
        //usa il compontente generico per gestire gli stati di loading e di error
        <GenericComponent response={response} loading={loading} error={error}> 
            {(response) => (
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
