import React, { useState } from 'react';
import { Card, CardContent } from "@/components/calendars/ui/card";
import { Button } from "@/components/calendars/ui/button";
import { Input } from "@/components/calendars/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/calendars/ui/dialog";
import { Calendar, Clock, Plus } from 'lucide-react';
import '../../app/globals.css';


type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  color: string;
};

type CalendarView = 'month' | 'week' | 'day';

const CalendarComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    description: '',
    color: '#3b82f6'
  });

  const getHoursOfDay = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return hours;
  };

  const getDaysInMonth = (date: Date) => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    return days;
  };

  const getDaysInWeek = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const handleDragStart = (event: Event) => {
    setDraggedEvent(event);
  };

  const handleDrop = (dropDate: Date) => {
    if (!draggedEvent) return;

    const timeDiff = draggedEvent.end.getTime() - draggedEvent.start.getTime();
    const newStart = new Date(dropDate);
    if (view === 'month') {
      newStart.setHours(draggedEvent.start.getHours(), draggedEvent.start.getMinutes());
    }
    const newEnd = new Date(newStart.getTime() + timeDiff);

    const updatedEvents = events.map(event =>
      event.id === draggedEvent.id
        ? { ...event, start: newStart, end: newEnd }
        : event
    );

    setEvents(updatedEvents);
    setDraggedEvent(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  };

  const handleDragLeave = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
  };

  const handleAddEvent = () => {
    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      ...newEvent
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      start: new Date(),
      end: new Date(),
      description: '',
      color: '#3b82f6'
    });
  };

  const EventCreator = () => (
    <div className="p-4 border-l border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Crea Nuovo Evento</h3>
      <div className="space-y-4">
        <Input
          placeholder="Titolo evento"
          value={newEvent.title}
          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
        />
        <Input
          type="datetime-local"
          value={newEvent.start.toISOString().slice(0, 16)}
          onChange={(e) => setNewEvent({...newEvent, start: new Date(e.target.value)})}
        />
        <Input
          type="datetime-local"
          value={newEvent.end.toISOString().slice(0, 16)}
          onChange={(e) => setNewEvent({...newEvent, end: new Date(e.target.value)})}
        />
        <Input
          placeholder="Descrizione"
          value={newEvent.description}
          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
        />
        <Input
          type="color"
          value={newEvent.color}
          onChange={(e) => setNewEvent({...newEvent, color: e.target.value})}
          className="h-10"
        />
        <Button onClick={handleAddEvent} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Aggiungi Evento
        </Button>
      </div>
    </div>
  );

  const EventDialog = () => (
    <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedEvent?.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center">
            <Calendar className="mr-2" />
            <span>
              {selectedEvent?.start.toLocaleDateString()} - {selectedEvent?.end.toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2" />
            <span>
              {selectedEvent?.start.toLocaleTimeString()} - {selectedEvent?.end.toLocaleTimeString()}
            </span>
          </div>
          <p>{selectedEvent?.description}</p>
        </div>
      </DialogContent>
    </Dialog>

  );

  const renderEvent = (event: Event) => (
    <div
      key={event.id}
      draggable
      onDragStart={() => handleDragStart(event)}
      onClick={() => {
        setSelectedEvent(event);
        setShowEventDialog(true);
      }}
      className="p-1 mb-1 rounded text-sm cursor-move"
      style={{
        backgroundColor: event.color,
        opacity: draggedEvent?.id === event.id ? 0.5 : 1,
        height: view !== 'month' ? `${(event.end.getHours() - event.start.getHours()) * 4}rem` : 'auto'
      }}
    >
      {event.title}
    </div>
  );

  const renderCalendarContent = () => {
    switch (view) {
      case 'month':
        return (
          <div className="grid grid-cols-7 gap-1">
            {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
              <div key={day} className="p-2 text-center font-semibold">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map(day => (
              <div
                key={day.toISOString()}
                className="min-h-32 p-2 border border-gray-200 transition-colors duration-200"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(day)}
              >
                <div className="font-semibold">{day.getDate()}</div>
                {events
                  .filter(event => 
                    event.start.toDateString() === day.toDateString()
                  )
                  .map(event => renderEvent(event))}
              </div>
            ))}
          </div>
        );
      
      case 'week':
        return (
          <div className="grid grid-cols-8 gap-1">
            <div className="p-2"></div>
            {getDaysInWeek(currentDate).map(day => (
              <div key={day.toISOString()} className="p-2 text-center font-semibold">
                {day.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric' })}
              </div>
            ))}
            {getHoursOfDay().map(hour => (
              <React.Fragment key={hour}>
                <div className="p-2 text-right text-sm">{hour}</div>
                {getDaysInWeek(currentDate).map(day => (
                  <div
                    key={`${day.toISOString()}-${hour}`}
                    className="border border-gray-200 p-1 transition-colors duration-200"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={() => {
                      const dropDate = new Date(day);
                      dropDate.setHours(parseInt(hour));
                      handleDrop(dropDate);
                    }}
                  >
                    {events
                      .filter(event => 
                        event.start.toDateString() === day.toDateString() &&
                        event.start.getHours() === parseInt(hour)
                      )
                      .map(event => renderEvent(event))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        );
      
      case 'day':
        return (
          <div className="grid grid-cols-1 gap-1">
            {getHoursOfDay().map(hour => (
              <div 
                key={hour} 
                className="flex border-b border-gray-200"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={() => {
                  const dropDate = new Date(currentDate);
                  dropDate.setHours(parseInt(hour));
                  handleDrop(dropDate);
                }}
              >
                <div className="p-2 w-20 text-right text-sm">{hour}</div>
                <div className="flex-1 min-h-16 p-1">
                  {events
                    .filter(event =>
                      event.start.toDateString() === currentDate.toDateString() &&
                      event.start.getHours() === parseInt(hour)
                    )
                    .map(event => renderEvent(event))}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4">
        <div className="mb-4 flex justify-between items-center">
          <div className="space-x-2">
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              onClick={() => setView('month')}
            >
              Mese
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              onClick={() => setView('week')}
            >
              Settimana
            </Button>
            <Button
              variant={view === 'day' ? 'default' : 'outline'}
              onClick={() => setView('day')}
            >
              Giorno
            </Button>
          </div>
          <div className="space-x-2">
            <Button
              onClick={() => {
                const newDate = new Date(currentDate);
                switch (view) {
                  case 'month':
                    newDate.setMonth(currentDate.getMonth() - 1);
                    break;
                  case 'week':
                    newDate.setDate(currentDate.getDate() - 7);
                    break;
                  case 'day':
                    newDate.setDate(currentDate.getDate() - 1);
                    break;
                }
                setCurrentDate(newDate);
              }}
            >
              Precedente
            </Button>
            <span className="font-semibold">
              {view === 'month' 
                ? currentDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
                : view === 'week'
                  ? `${new Date(currentDate.getTime() - (currentDate.getDay() * 24 * 60 * 60 * 1000)).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} - ${new Date(currentDate.getTime() + ((6 - currentDate.getDay()) * 24 * 60 * 60 * 1000)).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}`
                  : currentDate.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
              }
            </span>
            <Button
              onClick={() => {
                const newDate = new Date(currentDate);
                switch (view) {
                  case 'month':
                    newDate.setMonth(currentDate.getMonth() + 1);
                    break;
                  case 'week':
                    newDate.setDate(currentDate.getDate() + 7);
                    break;
                  case 'day':
                    newDate.setDate(currentDate.getDate() + 1);
                    break;
                }
                setCurrentDate(newDate);
              }}
            >
              Successivo
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="p-4">
            {renderCalendarContent()}
          </CardContent>
        </Card>
        <EventDialog />
      </div>
      <EventCreator />
    </div>
  );
};

export default CalendarComponent;