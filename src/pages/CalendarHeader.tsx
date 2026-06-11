type CalendarHeaderProps = {
  currentDate: Date;
  viewMode: 'week' | 'day';
  onViewModeChange: (mode: 'week' | 'day') => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onToday: () => void;
};

const CalendarHeader = ({
  currentDate,
  viewMode,
  onViewModeChange,
  onNavigate,
  onToday,
}: CalendarHeaderProps) => {
  const date = currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
      <button onClick={onToday}>Today</button>
      <div>
        <button onClick={() => onNavigate('prev')}> ◀ </button>
        <span style={{ margin: '0 16px', fontWeight: 'bold' }}>{date}</span>
        <button onClick={() => onNavigate('next')}> ▶ </button>
      </div>
      <div>
        <button onClick={() => onViewModeChange('week')} style={{ fontWeight: viewMode === 'week' ? 'bold' : 'normal' }}>Week</button>
        <button onClick={() => onViewModeChange('day')} style={{ fontWeight: viewMode === 'day' ? 'bold' : 'normal' }}>Day</button>
      </div>
    </div>
  );
};

export default CalendarHeader;