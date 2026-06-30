import { useState } from 'react';

import { CalendarGrid } from '@/components/Calendar/CalendarGrid/CalendarGrid';
import { CalendarHeader } from '@/components/Calendar/CalendarHeader/CalendarHeader';
import { Sidebar } from '@/components/Calendar/Sidebar/Sidebar';
import { ConfirmModal } from '@/components/ConfirmModal/ConfirmModal';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { EventModal } from '@/components/EventModal/EventModal';
import { Loader } from '@/components/Loader/Loader';
import { useCalendar } from '@/hooks/useCalendar';
import { useEvents } from '@/hooks/useEvents';
import type { CalendarEvent, EventFormData } from '@/types/calendar';

import styles from './CalendarPage.module.scss';

export const CalendarPage = () => {
  const { currentDate, viewMode, setViewMode, navigate, goToToday, isLoading, error, retryLoad } =
    useCalendar();
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const handleCreateEvent = (date?: Date) => {
    setEditingEvent(null);
    setSelectedDate(date);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedDate(undefined);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (data: EventFormData) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    } else {
      addEvent(data);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEventToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete);
      setEventToDelete(null);
    }
  };

  const handleCellClick = (date: Date) => {
    handleCreateEvent(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    handleEditEvent(event);
  };

  const handleEventDrop = (eventId: string, newDate: string, newStartTime: string) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    const [startHour, startMinute] = event.startTime.split(':').map(Number);
    const [endHour, endMinute] = event.endTime.split(':').map(Number);
    const durationMinutes = endHour * 60 + endMinute - (startHour * 60 + startMinute);

    const [newStartHour, newStartMinute] = newStartTime.split(':').map(Number);
    const newEndTotal = newStartHour * 60 + newStartMinute + durationMinutes;
    const newEndHour = Math.floor(newEndTotal / 60);
    const newEndMinute = newEndTotal % 60;
    const newEndTime = `${String(newEndHour).padStart(2, '0')}:${String(newEndMinute).padStart(2, '0')}`;

    updateEvent(eventId, {
      title: event.title,
      location: event.location,
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      description: event.description,
      color: event.color,
    });
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className={styles.mainContent}>
        <CalendarHeader
          currentDate={currentDate}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onNavigate={navigate}
          onToday={goToToday}
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
        />
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} onRetry={retryLoad} />}
        {!isLoading && !error && (
          <CalendarGrid
            viewMode={viewMode}
            currentDate={currentDate}
            events={events}
            onCellClick={handleCellClick}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
          />
        )}
      </main>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        event={editingEvent}
        initialDate={selectedDate}
        onSubmit={handleSaveEvent}
        onDelete={editingEvent ? handleDeleteEvent : undefined}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
