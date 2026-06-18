import { getHoursArray } from '@/utils/dateUtils';

import styles from './TimeColumn.module.scss';

export const TimeColumn = () => {
  const hours = getHoursArray();

  return (
    <div className={styles.timeColumn} aria-hidden="true">
      {hours.map((h) => (
        <div key={h} className={styles.timeCell}>
          {h.toString().padStart(2, '0')}:00
        </div>
      ))}
    </div>
  );
};
