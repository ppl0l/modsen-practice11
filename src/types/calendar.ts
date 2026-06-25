export type ViewMode = 'week' | 'day';
export type NavigationDirection = 'prev' | 'next';

export interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (direction: NavigationDirection) => void;
  onToday: () => void;
}

export interface CalendarGridProps {
  viewMode: ViewMode;
  currentDate: Date;
}

export type EventColor = '#EF4444' | '#F59E0B' | '#10B981' | '#3B82F6' | '#8B5CF6' | '#EC4899' | '#14B8A6';

export const EVENT_COLORS: EventColor[] = [
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
];

export const EVENT_COLORS_WITH_NAMES = [
  { color: '#EF4444', name: 'Red' },
  { color: '#F59E0B', name: 'Amber' },
  { color: '#10B981', name: 'Emerald' },
  { color: '#3B82F6', name: 'Blue' },
  { color: '#8B5CF6', name: 'Violet' },
  { color: '#EC4899', name: 'Pink' },
  { color: '#14B8A6', name: 'Teal' },
] as const;

export interface CalendarEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  color: EventColor;
}

export type EventFormData = Omit<CalendarEvent, 'id'>;

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent | null;
  initialDate?: Date;
  onSubmit: (data: EventFormData) => void;
  onDelete?: (id: string) => void;
}

export interface EventContextType {
  events: CalendarEvent[];
  addEvent: (event: EventFormData) => void;
  updateEvent: (id: string, event: EventFormData) => void;
  deleteEvent: (id: string) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventById: (id: string) => CalendarEvent | undefined;
  isLoading: boolean;
}

export interface EventItemProps {
  event: CalendarEvent;
  onClick: () => void;
  isDraggable?: boolean;
}

export interface ApiSearchResult {
  id: number;
  title: string;
  description?: string;
}