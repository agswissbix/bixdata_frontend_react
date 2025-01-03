import React from 'react';
import { useRouter } from 'next/router';
import TestMenu from './testMenu';

const TestContainer: React.FC = () => {
    const router = useRouter();

    const handleMenuClick = (item: string) => {
        // Reindirizza alla pagina TestContent con il menu selezionato
        router.push(`/testContent?menuItem=${item}`);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
                <TestMenu onMenuClick={handleMenuClick} />
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ padding: '20px' }}>Seleziona una voce del menu.</p>
            </div>
        </div>
    );
};

export default TestContainer;
