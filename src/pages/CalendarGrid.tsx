import TimeColumn from './TimeColumn';

type CalendarGridProps = {
  viewMode: 'week' | 'day';
  currentDate: Date;
};

const CalendarGrid = ({ viewMode, currentDate }: CalendarGridProps) => {
  const hours = [...Array(24)].map((_, i) => i);
  
  const weekDays = () => {
    const start = new Date(currentDate);
    const day = start.getDay();
    start.setDate(start.getDate() - day + (day === 0 ? -6 : 1));
    return [...Array(7)].map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  if (viewMode === 'day') {
    return (
      <div style={{ display: 'flex', border: '1px solid #ccc' }}>
        <TimeColumn />
        <div style={{ flex: 1 }}>
          <div style={{ padding: '16px', textAlign: 'center', background: '#f5f5f5' }}>
            {currentDate.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
          {hours.map(i => <div key={i} style={{ height: '60px', borderBottom: '1px solid #eee' }}></div>)}
        </div>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', minWidth: '800px', border: '1px solid #ccc' }}>
        <TimeColumn />
        {weekDays().map((day, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ padding: '16px', textAlign: 'center', background: '#f5f5f5' }}>
              {day.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' })}
            </div>
            {hours.map(h => <div key={h} style={{ height: '60px', borderBottom: '1px solid #eee' }}></div>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;