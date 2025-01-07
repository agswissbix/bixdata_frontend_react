import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
//import '../app/globals.css';

const ScheduleCalendar = () => {
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(11);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);

  const months = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const timeSlots = [
    '07.30-11.30', '11.30-15.30', '15.30-19.30',
    '19.30-23.30', '23.30-03.30', '03.30-7.30'
  ];

  const volunteers = [
    'MARINELLA', 'JACQUELINE', 'MANUELA L.', 'NADIA D.',
    'MARIA', 'NADA', 'CLAUDIA R.', 'SILVIA', 'DOLORES'
  ].sort();

  const shifts = ['L', 'B', 'C'];

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    loadMonthData(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const loadMonthData = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newScheduleData = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayName = date.toLocaleDateString('it-IT', { weekday: 'short' });
      const dayType = [0, 6].includes(date.getDay()) ? 'weekend' : 'weekday';

      newScheduleData.push({
        day,
        dayName,
        dayType,
        slots: Array(6).fill(null).map((_, index) => {
          if (Math.random() > 0.5) {
            return {
              id: `${day}-${index}`,
              name: volunteers[Math.floor(Math.random() * volunteers.length)],
              shift: shifts[Math.floor(Math.random() * shifts.length)]
            };
          }
          return null;
        })
      });
    }

    setScheduleData(newScheduleData);
  };

  const handleDragStart = (dayIndex, slotIndex) => {
    setDraggedItem({ dayIndex, slotIndex });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetDayIndex, targetSlotIndex) => {
    if (!draggedItem) return;

    const newSchedule = [...scheduleData];
    const sourceDay = newSchedule[draggedItem.dayIndex];
    const targetDay = newSchedule[targetDayIndex];
    
    if (!sourceDay || !targetDay) return;

    const temp = sourceDay.slots[draggedItem.slotIndex];
    sourceDay.slots[draggedItem.slotIndex] = targetDay.slots[targetSlotIndex];
    targetDay.slots[targetSlotIndex] = temp;

    setScheduleData(newSchedule);
    setDraggedItem(null);
  };

  const filteredScheduleData = scheduleData.map(day => ({
    ...day,
    slots: day.slots.map(slot => {
      if (!slot) return null;
      const matchesVolunteer = !selectedVolunteer || slot.name === selectedVolunteer;
      const matchesShift = !selectedShift || slot.shift === selectedShift;
      return (matchesVolunteer && matchesShift) ? slot : null;
    })
  }));

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <select 
            className="border rounded px-2 py-1 bg-white"
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
          >
            {[2023, 2024, 2025].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <div className="flex items-center gap-2">
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => currentMonth === 0 
                ? (setCurrentMonth(11), setCurrentYear(prev => prev - 1))
                : setCurrentMonth(prev => prev - 1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <select 
              className="border rounded px-2 py-1 bg-white"
              value={months[currentMonth]}
              onChange={(e) => setCurrentMonth(months.indexOf(e.target.value))}
            >
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => currentMonth === 11
                ? (setCurrentMonth(0), setCurrentYear(prev => prev + 1))
                : setCurrentMonth(prev => prev + 1)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <select 
            className="border rounded px-2 py-1 bg-white"
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
          >
            <option value="">- Volontario -</option>
            {volunteers.map(volunteer => (
              <option key={volunteer} value={volunteer}>{volunteer}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select 
            className="border rounded px-2 py-1 bg-white"
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
          >
            <option value="">- Turno -</option>
            {shifts.map(shift => (
              <option key={shift} value={shift}>{shift}</option>
            ))}
          </select>
          
          <button 
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            onClick={() => window.print()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="border rounded overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 text-left">DIC</th>
              <th className="py-2 px-4 text-center border-l border-blue-500 w-16">dev</th>
              {timeSlots.map((slot, index) => (
                <th key={index} className="py-2 px-4 text-center border-l border-blue-500">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredScheduleData.map((day, dayIndex) => (
              <tr key={day.day} className={`border-t ${day.dayType === 'weekend' ? 'bg-yellow-50' : 'bg-blue-50'}`}>
                <td className="py-2 px-4 border-r font-bold">
                  <div className="text-2xl">{day.day}</div>
                  <div className="text-sm">{day.dayName}</div>
                </td>
                <td className="py-2 px-4 border-l text-center">dev</td>
                {day.slots.map((slot, slotIndex) => (
                  <td 
                    key={slotIndex} 
                    className="py-2 px-4 border-l"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(dayIndex, slotIndex)}
                  >
                    {slot && (
                      <div 
                        className="text-center cursor-move"
                        draggable
                        onDragStart={() => handleDragStart(dayIndex, slotIndex)}
                      >
                        <div className="text-xs text-gray-600">{slot.shift}</div>
                        <div>{slot.name}</div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleCalendar;