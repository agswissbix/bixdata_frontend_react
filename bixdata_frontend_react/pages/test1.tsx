import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import '../app/globals.css';

interface SidebarProps {
    response: {
        userId: number;
        name: string;
        email: string;
    };
}

const Sidebar: NextPage<SidebarProps> = ({ response }) => {
    const { userId, name, email } = response;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Profile</h1>
            <p>
                <strong>User ID:</strong> {userId}
            </p>
            <p>
                <strong>Name:</strong> {name}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<SidebarProps> = async () => {
    try {
        const res = await fetch('http://localhost:8000/backend_custom_test/test/');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Assicurarsi che i dati ricevuti siano coerenti con l'interfaccia
        const response = {
            userId: data.userId || 0, // Fornisce un valore predefinito in caso di assenza
            name: data.name || 'Unknown',
            email: data.email || 'unknown@example.com',
        };

        return {
            props: {
                response,
            },
        };
    } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);

        // Dati di fallback in caso di errore
        return {
            props: {
                response: {
                    userId: 0,
                    name: 'Unknown',
                    email: 'unknown@example.com',
                },
            },
        };
    }
};

export default Sidebar;
