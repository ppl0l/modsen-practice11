import { useCallback, useState } from 'react';

import type { ViewMode } from '@/types/calendar';
import { getNavigationDays } from '@/utils/dateUtils';

const VIEW_MODE_WEEK = 'week';
const NAV_NEXT = 'next';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODE_WEEK);

  const navigate = useCallback(
    (direction: 'prev' | 'next') => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate);
        const days = getNavigationDays(viewMode);
        newDate.setDate(prevDate.getDate() + (direction === NAV_NEXT ? days : -days));
        return newDate;
      });
    },
    [viewMode]
  );

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  return {
    currentDate,
    viewMode,
    setViewMode,
    navigate,
    goToToday,
    isLoading: false,
    error: null,
    retryLoad: () => {},
  };
};
