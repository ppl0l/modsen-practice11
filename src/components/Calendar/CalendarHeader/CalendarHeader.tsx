import type { CalendarHeaderProps } from '@/types/calendar';

export const CalendarHeader = ({
  currentDate,
  viewMode,
  onViewModeChange,
  onNavigate,
  onToday,
}: CalendarHeaderProps) => {
  const dateLabel = currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
      }}
    >
      <button onClick={onToday} aria-label="Сегодня">
        Today
      </button>

      <div role="group" aria-label="Навигация по датам">
        <button onClick={() => onNavigate('prev')} aria-label="Назад">
          {' '}
          ◀{' '}
        </button>
        <span style={{ margin: '0 16px', fontWeight: 'bold' }} aria-live="polite">
          {dateLabel}
        </span>
        <button onClick={() => onNavigate('next')} aria-label="Вперед">
          {' '}
          ▶{' '}
        </button>
      </div>

      <div role="radiogroup" aria-label="Режим просмотра">
        <button
          onClick={() => onViewModeChange('week')}
          aria-checked={viewMode === 'week'}
          style={{ fontWeight: viewMode === 'week' ? 'bold' : 'normal' }}
        >
          Week
        </button>
        <button
          onClick={() => onViewModeChange('day')}
          aria-checked={viewMode === 'day'}
          style={{ fontWeight: viewMode === 'day' ? 'bold' : 'normal' }}
        >
          Day
        </button>
      </div>
    </header>
  );
};
