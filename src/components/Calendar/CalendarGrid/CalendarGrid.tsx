import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';

import type { CalendarGridProps } from '@/types/calendar';
import { getHoursArray, getWeekDays } from '@/utils/dateUtils';

import { TimeColumn } from '../TimeColumn/TimeColumn';
import styles from './CalendarGrid.module.scss';

export const CalendarGrid = ({ viewMode, currentDate }: CalendarGridProps) => {
  const hours = getHoursArray();
  const days = viewMode === 'day' ? [currentDate] : getWeekDays(currentDate);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const shouldShowIndicator = days.some((day) => day.toDateString() === now.toDateString());
  const nowIndicatorTop = now.getHours() * 60 + now.getMinutes();

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.gridHeaderRow}>
        <div className={styles.headerCorner}>
          <FiClock size={16} />
        </div>

        <div className={styles.headerDaysContainer}>
          {days.map((day) => (
            <div key={day.toISOString()} className={styles.headerDayWrapper}>
              <div className={styles.columnHeader}>
                <span className={styles.weekdayLabel}>
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className={styles.dayLabel}>{day.getDate()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.gridScrollContainer}>
        <div className={styles.gridBody}>
          <TimeColumn />

          <div className={styles.gridContainer} role="grid" aria-label="Calendar grid">
            {shouldShowIndicator && (
              <div
                className={styles.nowIndicator}
                style={{ top: `${nowIndicatorTop}px` }}
                aria-hidden="true"
              />
            )}

            {days.map((day) => (
              <div key={day.toISOString()} className={styles.column}>
                {hours.map((h) => (
                  <div key={h} className={styles.cell} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
