import { useCallback, useEffect, useState } from 'react';

import type { ViewMode } from '@/types/calendar';
import { getNavigationDays } from '@/utils/dateUtils';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error('Test');
    } catch {
      setError('Failed to fetch calendar events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      await loadData();
      setIsLoading(false);
    };

    fetchData();
  }, [currentDate, viewMode, loadData]);

  const navigate = useCallback(
    (direction: 'prev' | 'next') => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate);
        const days = getNavigationDays(viewMode);
        newDate.setDate(prevDate.getDate() + (direction === 'next' ? days : -days));
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
    isLoading,
    error,
    retryLoad: loadData,
  };
};
