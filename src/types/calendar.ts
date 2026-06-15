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
