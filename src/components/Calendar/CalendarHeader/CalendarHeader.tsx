import { FiChevronLeft, FiChevronRight, FiMenu } from 'react-icons/fi';

import type { CalendarHeaderProps } from '@/types/calendar';

import styles from './CalendarHeader.module.scss';

interface ExtendedHeaderProps extends CalendarHeaderProps {
  onMenuToggle: () => void;
}

export const CalendarHeader = ({
  currentDate,
  viewMode,
  onViewModeChange,
  onNavigate,
  onToday,
  onMenuToggle,
}: ExtendedHeaderProps) => {
  const dateLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <button className={styles.burgerBtn} onClick={onMenuToggle} aria-label="Open menu">
          <FiMenu size={20} />
        </button>
        <button className={styles.todayBtn} onClick={onToday} aria-label="Today">
          Today
        </button>
      </div>

      <div className={styles.navGroup} role="group" aria-label="Date navigation">
        <button className={styles.navBtn} onClick={() => onNavigate('prev')} aria-label="Previous">
          <FiChevronLeft size={20} />
        </button>
        <span className={styles.dateLabel} aria-live="polite">
          {dateLabel}
        </span>
        <button className={styles.navBtn} onClick={() => onNavigate('next')} aria-label="Next">
          <FiChevronRight size={20} />
        </button>
      </div>

      <div className={styles.viewToggle} role="radiogroup" aria-label="View mode">
        {(
          [
            ['week', 'Week'],
            ['day', 'Day'],
          ] as const
        ).map(([mode, text]) => (
          <button
            key={mode}
            className={`${styles.toggleBtn} ${viewMode === mode ? styles.active : ''}`}
            onClick={() => onViewModeChange(mode)}
            aria-checked={viewMode === mode}
          >
            {text}
          </button>
        ))}
      </div>
    </header>
  );
};
