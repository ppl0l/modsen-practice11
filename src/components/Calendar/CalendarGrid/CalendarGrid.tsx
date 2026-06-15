import type { CalendarGridProps } from '@/types/calendar';

import { TimeColumn } from '../TimeColumn/TimeColumn';

const hours = [...Array(24)].map((_, i) => i);

export const CalendarGrid = ({ viewMode, currentDate }: CalendarGridProps) => {
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
      <div
        style={{ display: 'flex', border: '1px solid #ccc' }}
        role="grid"
        aria-label={`Расписание на ${currentDate.toLocaleDateString()}`}
      >
        <TimeColumn />
        <div style={{ flex: 1 }}>
          <div role="row">
            <div
              style={{ padding: '16px', textAlign: 'center', background: '#f5f5f5' }}
              role="columnheader"
              aria-label={currentDate.toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            >
              {currentDate.toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </div>
          </div>
          {hours.map((h) => (
            <div key={h} role="row">
              <div
                role="gridcell"
                aria-label={`${h}:00, ${currentDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}`}
                style={{ height: '60px', borderBottom: '1px solid #eee' }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <div
        style={{ display: 'flex', minWidth: '800px', border: '1px solid #ccc' }}
        role="grid"
        aria-label="Календарь на неделю"
      >
        <TimeColumn />
        {weekDays().map((day) => (
          <div key={day.toISOString()} style={{ flex: 1 }}>
            <div role="row">
              <div
                style={{ padding: '16px', textAlign: 'center', background: '#f5f5f5' }}
                role="columnheader"
                aria-label={day.toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              >
                {day.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' })}
              </div>
            </div>
            {hours.map((h) => (
              <div key={h} role="row">
                <div
                  role="gridcell"
                  aria-label={`${h}:00, ${day.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}`}
                  style={{ height: '60px', borderBottom: '1px solid #eee' }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
