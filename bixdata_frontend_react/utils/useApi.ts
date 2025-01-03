import { useEffect, useState } from 'react';

export const useApi = <T>(
    payload: Record<string, any>
) => {
    const [response, setResponse] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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

        fetchData();
    }, [payload]);

    return { response, loading, error };
};
