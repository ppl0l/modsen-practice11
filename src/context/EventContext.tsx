import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import type { CalendarEvent, EventContextType, EventFormData } from '@/types/calendar';
import { generateId, getEventsFromStorage, saveEventsToStorage } from '@/utils/eventUtils';

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => getEventsFromStorage());
  const [isLoading] = useState(false);

  useEffect(() => {
    saveEventsToStorage(events);
  }, [events]);

  const addEvent = useCallback((eventData: EventFormData) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: generateId(),
    };
    setEvents((prev) => [...prev, newEvent]);
  }, []);

  const updateEvent = useCallback((id: string, eventData: EventFormData) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...eventData,
              id: event.id,
            }
          : event
      )
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  const getEventsForDate = useCallback(
    (date: Date): CalendarEvent[] => {
      const dateString = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      return events.filter((event) => event.date === dateString);
    },
    [events]
  );

  const getEventById = useCallback(
    (id: string): CalendarEvent | undefined => {
      return events.find((event) => event.id === id);
    },
    [events]
  );

  const value = useMemo(
    () => ({
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      getEventsForDate,
      getEventById,
      isLoading,
    }),
    [events, addEvent, updateEvent, deleteEvent, getEventsForDate, getEventById, isLoading]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
