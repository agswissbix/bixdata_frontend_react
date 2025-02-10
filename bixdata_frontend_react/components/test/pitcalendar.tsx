import React, { useState, useCallback, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Plus, Check } from 'lucide-react';

const PitCalendar = () => {
  const [resources] = useState([
    { id: 'antonijevictoplica', name: 'Antonijevic Toplica' },
    { id: 'BasarabaTomislav', name: 'Basaraba Tomislav' },
    { id: 'BerishaBekim', name: 'Berisha Bekim' },
    { id: 'DokovicDorde', name: 'Dokovic Dorde' },
    { id: 'FazziLuca', name: 'Fazzi Luca' }
  ]);
  
  const defaultNewEvent = {
    title: '',
    start: new Date(),
    end: new Date(Date.now() + 3600000), // +1 ora
    description: '',
    color: '#3b82f6',
    resourceId: ''
  };
  
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Pulizia completa Condominio Lucino',
      start: new Date(2025, 0, 7, 10, 0),
      end: new Date(2025, 0, 7, 11, 30),
      description: 'Pulizia completa Condominio Lucino',
      color: '#3b82f6',
      resourceId: 'antonijevictoplica'
    },
    {
      id: '2',
      title: 'Pulizia entrata Residenza Nettuno',
      start: new Date(2025, 0, 8, 14, 0),
      end: new Date(2025, 0, 8, 15, 0),
      description: 'Pulizia entrata Residenza Nettuno',
      color: '#10b981',
      resourceId: 'BasarabaTomislav'
    }
  ]);

  // Eventi non pianificati (nuova sezione)
  const [unplannedEvents, setUnplannedEvents] = useState([
    {
      id: 'u1',
      title: 'Pulizia finestre Stabile fortuna',
      description: 'Note aggiuntive',
      color: '#f97316' // arancione
    },
    {
      id: 'u2',
      title: 'Pulizie finestre Lisano 1 Massagno',
      description: 'Note aggiuntive',
      color: '#8b5cf6' // viola
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string; start: Date; end: Date; description: string; color: string; resourceId: string } | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 21));
  const [draggedEvent, setDraggedEvent] = useState<{ id: string; title: string; description: string; color: string; start?: Date; end?: Date } | null>(null);
  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([]);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [newEvent, setNewEvent] = useState(defaultNewEvent);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  // --- Filtro per la settimana selezionata ---
  const [selectedWeek, setSelectedWeek] = useState(1);

  // Componente WeekDropdown
  const WeekDropdown: React.FC<{ selectedWeek: number, onWeekChange: (week: number) => void }> = ({ selectedWeek, onWeekChange }) => {
    return (
      <select
        className="w-48 p-2 border rounded"
        value={selectedWeek}
        onChange={(e) => onWeekChange(Number(e.target.value))}
      >
        <option value={1}>Settimana 1</option>
        <option value={2}>Settimana 2</option>
        <option value={3}>Settimana 3</option>
        <option value={4}>Settimana 4</option>
      </select>
    );
  };

  // Filtra le risorse in base a quelle selezionate
  const filteredResources = selectedResourceIds.length > 0
    ? resources.filter(resource => selectedResourceIds.includes(resource.id))
    : resources;

  // Modifichiamo la funzione in modo da gestire il "selectedWeek"
  const getWorkDaysInWeek = (date: Date, week: number) => {
    // Primo giorno del mese
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    
    // Se Domenica -> dayOfWeek = 7, altrimenti 1=Lunedì, 2=Martedì, ecc.
    let dayOfWeek = startOfMonth.getDay();
    if (dayOfWeek === 0) dayOfWeek = 7;

    // Troviamo il primo lunedì del mese
    const firstMonday = new Date(startOfMonth);
    if (dayOfWeek !== 1) {
      firstMonday.setDate(firstMonday.getDate() + (8 - dayOfWeek));
    }

    // Offset di (week - 1) * 7 giorni
    const offsetStart = new Date(firstMonday);
    offsetStart.setDate(offsetStart.getDate() + (week - 1) * 7);

    // Raccogliamo 5 giorni (lun-ven)
    const days = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(offsetStart);
      d.setDate(offsetStart.getDate() + i);
      days.push(d);
    }
    return days;
  };

  // Drag di un evento non pianificato
  const handleUnplannedDragStart = (e: React.DragEvent, event: { id: string; title: string; description: string; color: string }) => {
    e.stopPropagation();
    setDraggedEvent(event);

    // Creiamo un "drag image" invisibile per evitare il 'ghost' di default
    const dragImage = document.createElement('div');
    dragImage.style.width = '1px';
    dragImage.style.height = '1px';
    dragImage.style.position = 'fixed';
    dragImage.style.top = '-100px';
    document.body.appendChild(dragImage);

    if (e.dataTransfer) {
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      e.dataTransfer.effectAllowed = 'move';
    }

    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  // Aggiunta di un nuovo evento "da form"
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.resourceId) {
      alert('Compila tutti i campi obbligatori');
      return;
    }
    if (newEvent.end <= newEvent.start) {
      alert("L'ora di fine deve essere successiva all'ora di inizio");
      return;
    }
    
    const event = {
      id: Math.random().toString(36).substr(2, 9),
      ...newEvent
    };

    setEvents(prev => [...prev, event]);
    setNewEvent(defaultNewEvent);
  };

  // Drag di un evento già pianificato
  const handleDragStart = (e: React.DragEvent, event: { id: string; title: string; description: string; color: string; start?: Date; end?: Date }) => {
    e.stopPropagation();
    setDraggedEvent(event);

    const dragImage = document.createElement('div');
    dragImage.style.width = '1px';
    dragImage.style.height = '1px';
    dragImage.style.position = 'fixed';
    dragImage.style.top = '-100px';
    document.body.appendChild(dragImage);
    
    if (e.dataTransfer) {
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      e.dataTransfer.effectAllowed = 'move';
    }

    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  // Drop di un evento in calendario (sia pianificato che non pianificato)
  const handleDrop = useCallback((dropDate: Date, newResourceId: string) => {
    if (!draggedEvent) return;

    // Durata di default 1 ora se l'evento non era pianificato
    let duration = 3600000;
    if (draggedEvent.start && draggedEvent.end) {
      duration = draggedEvent.end.getTime() - draggedEvent.start.getTime();
    }

    // Calcola i nuovi start/end
    const newStart = new Date(dropDate);
    newStart.setHours(
      draggedEvent.start ? draggedEvent.start.getHours() : 9,
      draggedEvent.start ? draggedEvent.start.getMinutes() : 0,
      0,
      0
    );
    const newEnd = new Date(newStart.getTime() + duration);

    // Verifichiamo se è un evento già pianificato
    const isPlanned = events.find(ev => ev.id === draggedEvent.id);

    if (isPlanned) {
      // Aggiorna l'evento esistente
      setEvents(prevEvents => 
        prevEvents.map(event =>
          event.id === draggedEvent.id
            ? {
                ...event,
                start: newStart,
                end: newEnd,
                resourceId: newResourceId
              }
            : event
        )
      );
    } else {
      // Evento "unplanned": rimuovilo da unplannedEvents e aggiungilo a events
      setUnplannedEvents(prev => prev.filter(e => e.id !== draggedEvent.id));
      const newEvent = {
        id: draggedEvent.id,
        title: draggedEvent.title,
        description: draggedEvent.description,
        color: draggedEvent.color,
        start: newStart,
        end: newEnd,
        resourceId: newResourceId
      };
      setEvents(prev => [...prev, newEvent]);
    }

    setDraggedEvent(null);
  }, [draggedEvent, events]);

  const formatEventTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Componente per creare un nuovo evento
  const EventCreator = () => (
    <div className="p-4 border-l border-gray-200 w-80">
      <h3 className="text-lg font-semibold mb-4">Nuovo Evento</h3>
      <div className="space-y-4">
        <Input
          placeholder="Titolo evento"
          value={newEvent.title}
          onChange={(e) => setNewEvent(prev => ({...prev, title: e.target.value}))}
        />
        <Input
          type="datetime-local"
          value={newEvent.start.toISOString().slice(0, 16)}
          onChange={(e) => {
            const date = new Date(e.target.value);
            if (!isNaN(date.getTime())) {
              setNewEvent(prev => ({...prev, start: date}));
            }
          }}
        />
        <Input
          type="datetime-local"
          value={newEvent.end.toISOString().slice(0, 16)}
          onChange={(e) => {
            const date = new Date(e.target.value);
            if (!isNaN(date.getTime())) {
              setNewEvent(prev => ({...prev, end: date}));
            }
          }}
        />
        <select 
          className="w-full p-2 border rounded"
          value={newEvent.resourceId}
          onChange={(e) => setNewEvent(prev => ({...prev, resourceId: e.target.value}))}
        >
          <option value="">Seleziona dipendente</option>
          {resources.map(resource => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </select>
        <Input
          placeholder="Descrizione"
          value={newEvent.description}
          onChange={(e) => setNewEvent(prev => ({...prev, description: e.target.value}))}
        />
        <Input
          type="color"
          value={newEvent.color}
          onChange={(e) => setNewEvent(prev => ({...prev, color: e.target.value}))}
          className="h-10"
        />
        <Button onClick={handleAddEvent} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Aggiungi Evento
        </Button>
      </div>
    </div>
  );

  // Dropdown risorse (memo)
  const ResourcesDropdown: React.FC<{ selectedIds: string[], onSelectionChange: (ids: string[]) => void }> = React.memo(({ selectedIds, onSelectionChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return (
      <div ref={dropdownRef} className="relative">
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="w-64"
        >
          {selectedIds.length === 0 
            ? "Seleziona dipendenti" 
            : `${selectedIds.length} dipendenti selezionati`}
        </Button>
        {isOpen && (
          <div className="absolute z-50 mt-1 w-64 bg-white border rounded-md shadow-lg">
            {resources.map(resource => (
              <div
                key={resource.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedIds.includes(resource.id)) {
                    onSelectionChange(selectedIds.filter(id => id !== resource.id));
                  } else {
                    onSelectionChange([...selectedIds, resource.id]);
                  }
                }}
              >
                <div className="w-6">
                  {selectedIds.includes(resource.id) && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <span>{resource.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  });

  // Dropdown mese
  const MonthDropdown: React.FC<{ selectedMonth: number, onMonthChange: (month: number) => void }> = ({ selectedMonth, onMonthChange }) => {
    const months = [
      { value: 0, label: "Gennaio" },
      { value: 1, label: "Febbraio" },
      { value: 2, label: "Marzo" },
      { value: 3, label: "Aprile" },
      { value: 4, label: "Maggio" },
      { value: 5, label: "Giugno" },
      { value: 6, label: "Luglio" },
      { value: 7, label: "Agosto" },
      { value: 8, label: "Settembre" },
      { value: 9, label: "Ottobre" },
      { value: 10, label: "Novembre" },
      { value: 11, label: "Dicembre" }
    ];

    return (
      <select
        className="w-48 p-2 border rounded"
        value={selectedMonth}
        onChange={(e) => onMonthChange(Number(e.target.value))}
      >
        {months.map(month => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    );
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    // Evitiamo problemi se la data corrente è oltre il numero di giorni del mese
    newDate.setDate(1);
    setCurrentDate(newDate);
  };

  // Sincronizziamo selectedMonth con currentDate
  useEffect(() => {
    setSelectedMonth(currentDate.getMonth());
  }, [currentDate]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4">
        {/* FILTRI IN ALTO */}
        <div className="mb-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <ResourcesDropdown 
                selectedIds={selectedResourceIds}
                onSelectionChange={setSelectedResourceIds}
              />
              <MonthDropdown 
                selectedMonth={selectedMonth}
                onMonthChange={handleMonthChange}
              />
              {/* Filtro settimana: WeekDropdown */}
              <WeekDropdown
                selectedWeek={selectedWeek}
                onWeekChange={setSelectedWeek}
              />
            </div>
            <div className="space-x-2">
              <Button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(currentDate.getDate() - 7);
                  setCurrentDate(newDate);
                }}
              >
                Precedente
              </Button>
              <span className="font-semibold">
                {`${new Date(currentDate.getTime() - (currentDate.getDay() * 24 * 60 * 60 * 1000))
                  .toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} - 
                ${new Date(currentDate.getTime() + (4 * 24 * 60 * 60 * 1000))
                  .toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}`}
              </span>
              <Button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(currentDate.getDate() + 7);
                  setCurrentDate(newDate);
                }}
              >
                Successivo
              </Button>
            </div>
          </div>
        </div>

        {/* CALENDARIO */}
        <Card className="p-4 overflow-auto">
          <div className="grid grid-cols-6 gap-1">
            <div className="p-2 border-b border-r border-gray-200 bg-gray-200 font-semibold">
              Dipendenti
            </div>
            {getWorkDaysInWeek(currentDate, selectedWeek).map(day => (
              <div key={day.toISOString()} className="p-2 text-center border-b border-gray-200 bg-gray-50 font-semibold">
                {day.toLocaleDateString('it-IT', { weekday: 'short' })}<br />
                {day.getDate()}
              </div>
            ))}

            {filteredResources.map(resource => (
              <React.Fragment key={resource.id}>
                <div className="p-2 border-r border-b border-gray-200 font-medium">
                  {resource.name}
                </div>
                {getWorkDaysInWeek(currentDate, selectedWeek).map(day => (
                  <div
                    key={`${resource.id}-${day.toISOString()}`}
                    className="min-h-40 p-2 border border-gray-200 transition-colors duration-200"
                    onDragOver={(e) => { 
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.add('bg-blue-50');
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.remove('bg-blue-50');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDrop(day, resource.id);
                      e.currentTarget.classList.remove('bg-blue-50');
                    }}
                  >
                    {events
                      .filter(event => 
                        event.resourceId === resource.id &&
                        event.start.toDateString() === day.toDateString()
                      )
                      .sort((a, b) => a.start.getTime() - b.start.getTime())
                      .map(event => (
                        <div
                          key={event.id}
                          draggable="true"
                          onDragStart={(e) => handleDragStart(e, event)}
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventDialog(true);
                          }}
                          onDoubleClick={() => {
                            alert(`Hai fatto doppio click sull'evento: ${event.title}`);
                          }}
                          className="p-2 mb-2 rounded text-sm cursor-move text-white select-none"
                          style={{
                            backgroundColor: event.color,
                            opacity: draggedEvent?.id === event.id ? 0.5 : 1
                          }}
                        >
                          <div className="font-semibold">{event.title}</div>
                          <div className="text-xs">
                            {formatEventTime(event.start)} - {formatEventTime(event.end)}
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* DIALOG EVENTO */}
        <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <span>{selectedEvent?.start.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span>
                  {selectedEvent && `${formatEventTime(selectedEvent.start)} - ${formatEventTime(selectedEvent.end)}`}
                </span>
              </div>
              <p>{selectedEvent?.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* SEZIONE DESTRA: EventCreator + Eventi da pianificare */}
      <div className="flex flex-col border-l">
        <EventCreator />
        
        {/* Eventi da pianificare */}
        <div className="p-4 w-80">
          <h3 className="text-lg font-semibold mb-4">Eventi da pianificare</h3>
          <div className="space-y-2">
            {unplannedEvents.map(ev => (
              <div
                key={ev.id}
                draggable="true"
                onDragStart={(e) => handleUnplannedDragStart(e, ev)}
                className="p-2 bg-gray-200 rounded cursor-move"
                style={{ backgroundColor: ev.color, color: 'white' }}
              >
                <div className="font-semibold">{ev.title}</div>
                {ev.description && (
                  <div className="text-xs">{ev.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitCalendar;
