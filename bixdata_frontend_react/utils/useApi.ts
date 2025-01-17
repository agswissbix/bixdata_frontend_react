import { useEffect, useState } from 'react';
import { useRecordsStore } from '@/components/records/recordsStore';
import { consoleDebug } from '../utils/develop'

export const useApi = <T>(
    payload: Record<string, any>
) => {
    const [response, setResponse] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { refreshTable } = useRecordsStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                consoleDebug('Fetching data with payload:', payload);
                setLoading(true);
                setError(null);

                const response = await fetch('/api/postApi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData: T = await response.json();
                setResponse(responseData);
            } catch (error: any) {
                setError(error.message || 'Errore durante il recupero dei dati');
            } finally {
                setLoading(false);
            }
        };

            console.log('Fetching data with payload:', payload, 'refreshTable:', refreshTable);
        fetchData();
    }, [payload]);

    return { response, loading, error };
};
