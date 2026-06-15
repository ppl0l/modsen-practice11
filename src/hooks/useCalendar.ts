import { useCallback, useState } from 'react';

import type { ViewMode } from '@/types/calendar';
import { getNavigationDays } from '@/utils/dateUtils';

export const useCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');

  const navigate = useCallback(
    (direction: 'prev' | 'next') => {
      setDate((prevDate) => {
        const newDate = new Date(prevDate);
        const days = getNavigationDays(viewMode);
        newDate.setDate(prevDate.getDate() + (direction === 'next' ? days : -days));
        return newDate;
      });
    },
    [viewMode]
  );

  const goToToday = useCallback(() => {
    setDate(new Date());
  }, []);

  return {
    date,
    viewMode,
    setViewMode,
    navigate,
    goToToday,
  };
};
