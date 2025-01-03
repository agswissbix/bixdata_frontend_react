import React, { useEffect, useState } from 'react';
import '../../../app/globals.css';

interface ResponseData {
    userId: number;
    name: string;
    email: string;
    menuItemBackend: string;
}

interface TestContentProps {
    menuItem: string;
}

const TestContent: React.FC<TestContentProps> = ({ menuItem }) => {
    const [response, setResponse] = useState<ResponseData | null>(null);

    useEffect(() => {
        if (menuItem) {
            const fetchData = async () => {
                try {
                    const res = await fetch(`/api/fetch-data?menuItem=${menuItem}`);
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    const data = await res.json();
                    setResponse(data);
                } catch (error) {
                    console.error('Errore durante il recupero dei dati:', error);
                    setResponse({
                        userId: 0,
                        name: 'Unknown',
                        email: 'unknown@example.com',
                        menuItemBackend: 'boh'
                    });
                }
            };
            fetchData();
        }
    }, [menuItem]);

    if (!menuItem) {
        return <div>Seleziona una voce dal menu per visualizzare i dettagli.</div>;
    }

    if (!response) {
        return <div>Caricamento...</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Profile</h1>
            <p>
                <strong>Menu Item Selected:</strong> {menuItem}
            </p>
            <p>
                <strong>menuItemBackend:</strong> {response.menuItemBackend}
            </p>
     
        </div>
    );
};

export default TestContent;
