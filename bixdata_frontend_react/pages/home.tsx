import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import TableCardManager from '../components/tableCardManager';
import '../app/globals.css';
import StandardContent from '@/components/pageContent/standardContent';

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
          <Sidebar setSelectedMenu={(item) => setSelectedMenu(item)} />
          <div className="relative w-full h-full bg-gray-100">
            <StandardContent tableid={selectedMenu}></StandardContent>
            {/*<TableCardManager tableid={selectedMenu} />*/}
          </div>
      </div>
    </div>
  );
};

export default App;
