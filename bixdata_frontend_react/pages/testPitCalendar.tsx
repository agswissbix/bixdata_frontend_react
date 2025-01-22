import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import TableCardManager from '../components/tableCardManager';
import '../app/globals.css';
import StandardContent from '@/components/pageContent/standardContent';
import ScheduleCalendar from  '@/components/test/calendar';
import Agenda from '@/components/calendars/agenda';
import CalendarComponent from '@/components/calendars/calendar';
import PitCalendar from '@/components/test/pitcalendar';
import { Toaster, toast } from 'sonner';


// Main App Component
const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('Home');

  const handleMenuClick = (menuName: string): void => {
    setSelectedMenu(menuName);
  };

  return (
    <div className="w-full h-full flex flex-col">
        <PitCalendar />

    </div>
  );
};


export default App;
