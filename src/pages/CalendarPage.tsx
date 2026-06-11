import { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'week' | 'day'>('week');

  const navigate = (dir: 'prev' | 'next') => {
    const newDate = new Date(date);
    const days = mode === 'week' ? 7 : 1;
    newDate.setDate(date.getDate() + (dir === 'next' ? days : -days));
    setDate(newDate);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <CalendarHeader
        currentDate={date}
        viewMode={mode}
        onViewModeChange={setMode}
        onNavigate={navigate}
        onToday={() => setDate(new Date())}
      />
      <CalendarGrid viewMode={mode} currentDate={date} />
    </div>
  );
};

export default CalendarPage;