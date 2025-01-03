import React, { useState } from 'react';
import TestMenu from './testMenu';
import TestContent from './testContent';

const TestContainer: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleMenuClick = (item: string) => {
        setSelectedItem(item);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
                <TestMenu onMenuClick={handleMenuClick} />
            </div>
            <div style={{ flex: 1 }}>
                {selectedItem ? (
                    <TestContent menuItem={selectedItem} />
                ) : (
                    <p style={{ padding: '20px' }}>Seleziona una voce del menu.</p>
                )}
            </div>
        </div>
    );
};

export default TestContainer;
