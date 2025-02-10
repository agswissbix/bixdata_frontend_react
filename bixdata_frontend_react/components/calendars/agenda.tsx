import React, { useState, useEffect } from 'react';

const WorkSchedule = () => {
  const [startDate, setStartDate] = useState('2024-10-08');
  const [endDate, setEndDate] = useState('2025-01-08');
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [shifts, setShifts] = useState<{ date: Date; time: string; location: string; person: string; }[]>([]);

  const volunteers = ['SILVIA', 'GABRIELE', 'RENATA', 'ANAIS', 'GRAZIANO'];

  const getDatesInRange = (start: string, end: string) => {
    const dates = [];
    const currentDate = new Date(start);
    const endDateTime = new Date(end);

    while (currentDate <= endDateTime) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const generateShifts = (date: Date) => {
    const defaultShifts = [
      { time: '07.30-11.30', location: 'Lugano', person: 'SILVIA' },
      { time: '11.30-15.30', location: 'Lugano', person: 'GABRIELE' },
      { time: '15.30-19.30', location: 'Lugano', person: 'RENATA' },
      { time: '19.30-23.30', location: 'Lugano', person: 'ANAIS' },
      { time: '23.30-03.30', location: 'Casa', person: 'GRAZIANO' },
      { time: '03.30-07.30', location: 'Casa', person: 'GRAZIANO' },
    ];

    return defaultShifts.map(shift => ({
      ...shift,
      date: date
    }));
  };

  useEffect(() => {
    const dates = getDatesInRange(startDate, endDate);
    let allShifts = dates.flatMap(date => generateShifts(date));
    
    if (selectedVolunteer) {
      allShifts = allShifts.filter(shift => shift.person === selectedVolunteer);
    }
    
    setShifts(allShifts);
  }, [startDate, endDate, selectedVolunteer]);

  const formatDate = (date: Date) => {
    const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    
    return {
      year: date.getFullYear(),
      month: months[date.getMonth()],
      day: date.getDate(),
      weekDay: days[date.getDay()]
    };
  };

  return (
    <div className="flex flex-col h-full w-1/2 mx-auto">
      {/* Header con filtri - fisso */}
      <div className="flex gap-4 mb-6 items-center p-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Da:</span>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">A:</span>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <select 
          className="border rounded px-2 py-1 text-gray-600"
          value={selectedVolunteer}
          onChange={(e) => setSelectedVolunteer(e.target.value)}
        >
          <option value="">- Volontario -</option>
          {volunteers.map(volunteer => (
            <option key={volunteer} value={volunteer}>
              {volunteer}
            </option>
          ))}
        </select>
        <select className="border rounded px-2 py-1 text-gray-600">
          <option>- Turno -</option>
        </select>
      </div>

      {/* Container tabella con scroll */}
      <div className="flex-1 overflow-hidden border rounded-lg">
        {/* Header tabella - fisso */}
        <div className="grid grid-cols-3 bg-blue-600 text-white">
          <div className="p-4 font-semibold"></div>
          <div className="p-4 font-semibold text-center">Orario</div>
          <div className="p-4 font-semibold">Osservazioni</div>
        </div>

        {/* Contenuto tabella - scrollabile */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {shifts.length > 0 ? (
            <div className="divide-y">
              {shifts.map((shift, index) => {
                const dateInfo = formatDate(new Date(shift.date));
                return (
                  <div key={index} className="grid grid-cols-3">
                    <div className="p-4 bg-blue-200">
                      <div className="text-center">
                        <div className="text-sm">{dateInfo.year}</div>
                        <div className="font-bold text-lg">{dateInfo.month}</div>
                        <div className="text-2xl font-bold">{dateInfo.day}</div>
                        <div className="text-sm">{dateInfo.weekDay}</div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="font-medium">{shift.location}</div>
                      <div className="text-gray-600">{shift.time}</div>
                    </div>
                    
                    <div className="p-4 text-gray-700">
                      {shift.person}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Nessun turno trovato per il volontario selezionato in questo periodo
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkSchedule;