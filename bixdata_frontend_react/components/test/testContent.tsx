import React, { useMemo } from 'react';
import '../../app/globals.css';
import { useApi } from '../../utils/useApi';
import GenericComponent from '../genericComponent';

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
    // Memoizza il payload completo per evitare ricreazioni
    const payload = useMemo(() => ({
        apiRoute: 'testpost',
        selectedMenu1: menuItem,
        additionalInfo: {
            userRole: 'admin',
            requestType: 'fetchDetails',
        },
    }), [menuItem]);

    // Usa l'hook passando il payload
    const { data: response, loading, error } = useApi<ResponseData>(payload);


    return (
        <GenericComponent data={response} loading={loading} error={error}>
            {(data) => (
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Profile</h1>
                <p>
                    <strong>Menu Item Selected:</strong> {menuItem}
                </p>
                <p>
                    <strong>menuItemBackend:</strong> {data.menuItemBackend}
                </p>
                </div>
            )}
        </GenericComponent>

    );
};

export default TestContent;
