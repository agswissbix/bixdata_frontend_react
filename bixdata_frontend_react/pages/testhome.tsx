import React, { useState } from 'react';
import TestContent from '../components/testContent';
import TestMenu from '../components/testMenu';

// Main App Component
const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('Home');

  const handleMenuClick = (menuName: string): void => {
    setSelectedMenu(menuName);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Menu */}
      <div style={{ width: '20%', backgroundColor: '#f5f5f5' }}>
        <TestMenu onMenuClick={handleMenuClick} />
      </div>

      {/* Right Content */}
      <div style={{ width: '80%' }}>
        <TestContent menuName={selectedMenu} />
      </div>
    </div>
  );
};

export default App;
