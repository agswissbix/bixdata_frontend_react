import React from 'react';

interface TestMenuProps {
    onMenuClick: (item: string) => void;
}

const TestMenu: React.FC<TestMenuProps> = ({ onMenuClick }) => {
    const menuItems = ['item1', 'item2', 'item3'];

    return (
        <div>
             <input
                type="text"
                placeholder="Type something..."
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    boxSizing: 'border-box',
                }}
            />
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {menuItems.map((item) => (
                    <li
                        key={item}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #ccc',
                        }}
                        onClick={() => onMenuClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
        
    );
};

export default TestMenu;
