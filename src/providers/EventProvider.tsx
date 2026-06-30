import React, { useCallback, useMemo, useState } from 'react';

import { EventContext } from '@/context/EventContext';
import type { CalendarEvent, EventFormData } from '@/types/calendar';
import { generateId, getEventsFromStorage, saveEventsToStorage } from '@/utils/eventUtils';

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => getEventsFromStorage());
  const [isLoading] = useState(false);

  const updateEvents = useCallback(
    (newEvents: CalendarEvent[] | ((prev: CalendarEvent[]) => CalendarEvent[])) => {
      setEvents((prev) => {
        const updated = typeof newEvents === 'function' ? newEvents(prev) : newEvents;
        saveEventsToStorage(updated);
        return updated;
      });
    },
    []
  );

  const addEvent = useCallback(
    (eventData: EventFormData) => {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: generateId(),
      };
      updateEvents((prev) => [...prev, newEvent]);
    },
    [updateEvents]
  );

  const updateEvent = useCallback(
    (id: string, eventData: EventFormData) => {
      updateEvents((prev) =>
        prev.map((event) =>
          event.id === id
            ? {
                ...eventData,
                id: event.id,
              }
            : event
        )
      );
    },
    [updateEvents]
  );

  const deleteEvent = useCallback(
    (id: string) => {
      updateEvents((prev) => prev.filter((event) => event.id !== id));
    },
    [updateEvents]
  );

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
