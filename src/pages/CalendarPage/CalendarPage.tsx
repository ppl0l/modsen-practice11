import { CalendarGrid } from '@/components/Calendar/CalendarGrid/CalendarGrid';
import { CalendarHeader } from '@/components/Calendar/CalendarHeader/CalendarHeader';
import { useCalendar } from '@/hooks/useCalendar';

export const CalendarPage = () => {
  const { date, viewMode, setViewMode, navigate, goToToday } = useCalendar();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <CalendarHeader
        currentDate={date}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNavigate={navigate}
        onToday={goToToday}
      />
      <CalendarGrid viewMode={viewMode} currentDate={date} />
    </div>
  );
};
