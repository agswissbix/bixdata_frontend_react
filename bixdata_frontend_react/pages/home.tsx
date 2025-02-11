import React, { useEffect, useMemo, useState } from 'react';
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
import { useApi } from '../utils/useApi';
import GenericComponent from '../components/genericComponent';




interface ResponseInterface {
  theme?: string;
}

// Main App Component
const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('Home');


  const changeTheme = (theme: string) => {
    document.documentElement.className = ""; // Rimuove tutte le classi esistenti
    document.documentElement.classList.add(theme); // Aggiunge il nuovo tema
  };
  

  const payload = useMemo(() => ({
    apiRoute: 'get_user_theme',
    example1: 'example',
    userid: '15',
  }), []);

  const { response, loading, error } = useApi<ResponseInterface>(payload);

  const handleMenuClick = (menuName: string): void => {
    setSelectedMenu(menuName);
  };

  useEffect(() => {
    if (response) {
      changeTheme(response);
    }
  }, [response]);

  return (
        <div className="w-full h-full flex flex-col">
          <Toaster richColors />
          <Navbar />
          <div className="w-full flex-1 flex">
              <Sidebar setSelectedMenu={(item) => setSelectedMenu(item)} />
              <div className="relative h-full w-11/12 bg-gray-100">
              {
              selectedMenu === 'TelAmicoCalendario' ? (
                <ScheduleCalendar />
              )
              : selectedMenu === 'TelAmicoAgenda' ? (
                <Agenda />
              ) 
              : selectedMenu === 'PitCalendar' ? (
                <PitCalendar />
              ) 
              : selectedMenu === 'Calendario' ? (
                <CalendarComponent />
              ) 
              : (
                <StandardContent tableid={selectedMenu} />
              )
              }
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
