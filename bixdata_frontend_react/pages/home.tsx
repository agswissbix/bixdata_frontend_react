import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import TableCardManager from '../components/tableCardManager';
import '../app/globals.css';
import StandardContent from '@/components/pageContent/standardContent';
import ScheduleCalendar from  '@/components/test/calendar';

// Main App Component
const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('Home');

  const handleMenuClick = (menuName: string): void => {
    setSelectedMenu(menuName);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="w-full flex-1 flex">
          <Sidebar setSelectedMenu={(item) => setSelectedMenu(item)} />
          <div className="relative h-full w-11/12 bg-gray-100">
            {selectedMenu === 'Calendar' ? (
              <ScheduleCalendar />
            ) : (
              <StandardContent tableid={selectedMenu} />
            )}
        </div>
      </div>
    </div>
  );
};

{/*
<div className="relative w-full h-full bg-gray-100">
  <StandardContent tableid={selectedMenu}></StandardContent>
  QUESTA RIGA COMMENTATA
  <TableCardManager tableid={selectedMenu} />
  QUESTA RIGA COMMENTATA
</div>
*/}

export default App;
