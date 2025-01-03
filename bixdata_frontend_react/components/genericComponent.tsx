import React from 'react';

interface GenericComponentProps<T> {
    response?: T | null; // Optional
    loading?: boolean; // Optional
    error?: string | null; // Optional
    children: (data: T) => React.ReactNode;
}

const GenericComponent = <T,>({
    response = null,
    loading = false,
    error = null,
    children,
}: GenericComponentProps<T>) => {
    if (loading) return <div>Caricamento...</div>;
    if (error) return <div>Errore: {error}</div>;
    if (!response) return <div>Nessun dato disponibile.</div>;

    return <>{children(response)}</>;
};

export default GenericComponent;