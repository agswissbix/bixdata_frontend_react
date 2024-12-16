import React, { useState } from 'react';
import TestContent from '../components/testContent';
import TestMenu from '../components/testMenu';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import TableCardManager from '../components/tableCardManager';
import '../app/globals.css';

// Main App Component
const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('Home');

  const handleMenuClick = (menuName: string): void => {
    setSelectedMenu(menuName);
  };

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full h-full flex">
          <Sidebar onChangeComponent={handleMenuClick} />
          <div className="relative w-full h-full bg-gray-100">
            <TableCardManager tableid={selectedMenu} />
          </div>
      </div>
    </div>
  );
};

export default App;
