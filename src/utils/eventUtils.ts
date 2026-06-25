import type { CalendarEvent, EventColor, EventFormData } from '@/types/calendar';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
};

const STORAGE_KEY = 'modsen_calendar_events';

export const saveEventsToStorage = (events: CalendarEvent[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save events to localStorage:', error);
  }
};

export const getEventsFromStorage = (): CalendarEvent[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as CalendarEvent[];
  } catch (error) {
    console.error('Failed to load events from localStorage:', error);
    return [];
  }
};

export const formatDateForForm = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const parseDateFromString = (dateStr: string): Date | null => {
  const parts = dateStr.split('.');
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  const date = new Date(year, month, day);
  if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
    return null;
  }
  return date;
};

export const getInitialEventFormData = (
  event: CalendarEvent | null,
  initialDate: Date | null,
  defaultColor: EventColor
): EventFormData => {
  if (event) {
    return {
      title: event.title,
      location: event.location || '',
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description || '',
      color: event.color as EventColor,
    };
  }
  return {
    title: '',
    location: '',
    date: formatDateForForm(initialDate || new Date()),
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    color: defaultColor,
  };
};

export const calculateEventHeight = (startTime: string, endTime: string, step: number): number => {
  const startH = parseInt(startTime.split(':')[0], 10);
  const endH = parseInt(endTime.split(':')[0], 10);
  const duration = Math.max(1, endH - startH);
  return duration * step - 4;
};

export const calculateNowIndicatorTop = (now: Date, step: number): number => {
  return (now.getHours() + now.getMinutes() / 60) * step;
};

export const groupEventsByDateHour = (events: CalendarEvent[]) => {
  return events.reduce((acc: Record<string, CalendarEvent[]>, e) => {
    const hour = parseInt(e.startTime.split(':')[0], 10);
    const key = `${e.date}-${hour}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(e);
    return acc;
  }, {});
};

export const parseCellId = (id: string) => {
  const parts = id.split('-');
  return {
    date: parts[1],
    hour: parts[2].padStart(2, '0') + ':00',
  };
};

export const isValidDate = (dateStr: string): boolean => {
  return parseDateFromString(dateStr) !== null;
};

export const isValidTime = (timeStr: string): boolean => {
  const parts = timeStr.split(':');
  if (parts.length !== 2) return false;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  return (
    !isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59
  );
};

export const isEndTimeAfterStart = (startTime: string, endTime: string): boolean => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
    return false;
  }

  const startTotal = startHours * 60 + startMinutes;
  const endTotal = endHours * 60 + endMinutes;

  return endTotal > startTotal;
};

export const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const getTodayDateString = (): string => {
  return formatDateForForm(new Date());
};

export const compareEvents = (a: CalendarEvent, b: CalendarEvent): number => {
  const dateCompare = a.date.localeCompare(b.date);
  if (dateCompare !== 0) return dateCompare;
  return a.startTime.localeCompare(b.startTime);
};

export const getColorByIndex = (index: number): EventColor => {
  const colors = [
    '#EF4444',
    '#F59E0B',
    '#10B981',
    '#3B82F6',
    '#8B5CF6',
    '#EC4899',
    '#14B8A6',
  ] as EventColor[];
  return colors[index % colors.length];
};
