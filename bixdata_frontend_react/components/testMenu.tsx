import React from 'react';

interface MenuProps {
  onMenuClick: (menuName: string) => void;
}

const TestMenu: React.FC<MenuProps> = ({ onMenuClick }) => {
  const menuItems: string[] = ['Home', 'Profile', 'Settings', 'About'];

  return (
    <div style={{ padding: '10px', borderRight: '1px solid #ccc', height: '100%' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            style={{ margin: '10px 0', cursor: 'pointer', color: 'blue' }}
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