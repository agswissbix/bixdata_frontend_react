import { GetServerSideProps } from 'next';
import React from 'react';

interface TestContentProps {
    menuItem: string;
    data: {
        userId: number;
        name: string;
        email: string;
        menuItemBackend: string;
    };
}

const TestContent: React.FC<TestContentProps> = ({ menuItem, data }) => {
    const { userId, name, email, menuItemBackend } = data;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Profilo Utente</h1>
            <p>
                <strong>Selected Menu Item:</strong> {menuItem}
            </p>
            <p>
                <strong>User ID:</strong> {userId}
            </p>
            <p>
                <strong>Nome:</strong> {name}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <p>
                <strong>Menu Item from Backend:</strong> {menuItemBackend}
            </p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<TestContentProps> = async (context) => {
    const { menuItem } = context.query;

    try {
        const response = await fetch(`http://localhost:8000/backend_custom_test/test/${menuItem}/`);
        if (!response.ok) {
            throw new Error('Errore nella risposta dal backend');
        }

        const data = await response.json();

        return {
            props: {
                menuItem: menuItem as string,
                data,
            },
        };
    } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);

        // In caso di errore, possiamo gestire dei dati di fallback
        return {
            props: {
                menuItem: menuItem as string,
                data: {
                    userId: 0,
                    name: 'Unknown',
                    email: 'unknown@example.com',
                    menuItemBackend: 'N/A',
                },
            },
        };
    }
};

export default TestContent;
