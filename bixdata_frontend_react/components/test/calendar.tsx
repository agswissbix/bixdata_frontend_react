import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScheduleCalendar = () => {
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(11);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  interface ActiveSlot {
    dayIndex: number;
    slotIndex: number;
    slot: Slot | null;
    timeSlot: string;
  }

  const [activeSlot, setActiveSlot] = useState<ActiveSlot | null>(null);
  const [formData, setFormData] = useState({ name: '', shift: '', dev: '' });

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

  const shifts = [
    { value: 'L', label: 'Lugano' },
    { value: 'B', label: 'Bellinzona' },
    { value: 'C', label: 'Chiasso' }
  ];

  interface Slot {
    id: string;
    name: string;
    shift: string;
    dev: string;
  }
  
  interface Day {
    day: number;
    dayName: string;
    dayType: string;
    slots: (Slot | null)[];
  }
  
  const [scheduleData, setScheduleData] = useState<Day[]>([]);

  useEffect(() => {
    loadMonthData(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const loadMonthData = (year: number, month: number) => {
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
              shift: shifts[Math.floor(Math.random() * shifts.length)].value,
              dev: Math.random() > 0.5 ? 'X' : ''
            };
          }
          return null;
        })
      });
    }

    setScheduleData(newScheduleData);
  };

  const openModal = (slot: Slot | null, dayIndex: number, slotIndex: number) => {
    setActiveSlot({ dayIndex, slotIndex, slot, timeSlot: timeSlots[slotIndex] });
    setFormData(slot ? { 
      name: slot.name, 
      shift: slot.shift,
      dev: slot.dev || ''
    } : { 
      name: '', 
      shift: '',
      dev: ''
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDevToggle = () => {
    setFormData(prev => ({
      ...prev,
      dev: prev.dev ? '' : 'X'
    }));
  };

  const handleFormSubmit = () => {
    const newSchedule = [...scheduleData];
    if (!activeSlot) return;
    const { dayIndex, slotIndex } = activeSlot;

    newSchedule[dayIndex].slots[slotIndex] = {
      id: `${dayIndex}-${slotIndex}`,
      ...formData
    };

    setScheduleData(newSchedule);
    setIsModalOpen(false);
  };

  const isFullyBooked = (slots: (Slot | null)[]) => {
    return slots.every(slot => slot !== null);
  };

  const getCellClassName = (slot: Slot | null) => {
    const baseClasses = 'py-2 px-4 border-l cursor-pointer';
    if (!slot) return baseClasses;
    
    const matchesVolunteer = !selectedVolunteer || slot.name === selectedVolunteer;
    const matchesShift = !selectedShift || slot.shift === selectedShift;
    
    if (!matchesVolunteer || !matchesShift) {
      return `${baseClasses} opacity-25`;
    }
    
    // Se è stato selezionato un filtro e la cella corrisponde, aggiungi sfondo verde e grassetto
    if ((selectedVolunteer || selectedShift) && matchesVolunteer && matchesShift) {
      return `${baseClasses} bg-green-50 font-bold`;
    }
    
    return baseClasses;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="w-full mx-auto bg-white rounded-lg shadow-lg">
        <div className="w-full h-[90vh] p-4">
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
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Filtra per Volontario:</label>
                <select
                  className="border rounded px-2 py-1 bg-white min-w-[200px]"
                  value={selectedVolunteer}
                  onChange={(e) => setSelectedVolunteer(e.target.value)}
                >
                  <option value="">Tutti</option>
                  {volunteers.map(volunteer => (
                    <option key={volunteer} value={volunteer}>{volunteer}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Filtra per Sede:</label>
                <select
                  className="border rounded px-2 py-1 bg-white w-24"
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                >
                  <option value="">Tutte le sedi</option>
                  {shifts.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border rounded overflow-auto h-[70vh]">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-2 text-left w-8">STATO</th>
                  <th className="py-2 px-4 text-left">DIC</th>
                  {timeSlots.map((slot, index) => (
                    <React.Fragment key={`header-${index}`}>
                      <th className="py-2 px-4 text-center border-l border-blue-500 w-12 bg-yellow-50">Dev</th>
                      <th className="py-2 px-4 text-center border-l border-blue-500">{slot}</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((day, dayIndex) => (
                  <tr key={day.day} className="border-t bg-white">
                    <td className={`py-2 px-2 border-r text-center w-8 ${isFullyBooked(day.slots) ? 'bg-green-100' : 'bg-red-100'}`}></td>
                    <td className={`py-2 px-4 border-r font-bold ${day.dayType === 'weekend' ? 'bg-yellow-100' : isFullyBooked(day.slots) ? 'bg-green-100' : 'bg-blue-100'}`}>
                      <div className="text-2xl">{day.day}</div>
                      <div className="text-sm">{day.dayName}</div>
                    </td>
                    {day.slots.map((slot, slotIndex) => (
                      <React.Fragment key={`slot-${dayIndex}-${slotIndex}`}>
                        <td className={`border-l text-center font-bold bg-yellow-50 ${(!selectedVolunteer || slot?.name === selectedVolunteer) && (!selectedShift || slot?.shift === selectedShift) ? '' : 'opacity-25'}`}>
                          {slot?.shift}
                        </td>
                        <td
                          className={getCellClassName(slot)}
                          onClick={() => openModal(slot, dayIndex, slotIndex)}
                        >
                          {slot && (
                            <div className="text-center">
                              <div>{slot.name}</div>
                            </div>
                          )}
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
                <h2 className="text-lg font-bold mb-4">Modifica Sede</h2>
                <div className="mb-4 text-sm text-gray-600">
                  Fascia oraria: {activeSlot ? activeSlot.timeSlot : ''}
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Nome Volontario</label>
                  <select
                    name="name"
                    className="border rounded px-3 py-2 w-full"
                    value={formData.name}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleziona volontario</option>
                    {volunteers.map(volunteer => (
                      <option key={volunteer} value={volunteer}>{volunteer}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Sede</label>
                  <select
                    name="shift"
                    className="border rounded px-3 py-2 w-full"
                    value={formData.shift}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleziona sede</option>
                    {shifts.map(shift => (
                      <option key={shift.value} value={shift.value}>{shift.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Annulla
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleFormSubmit}
                  >
                    Salva
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;