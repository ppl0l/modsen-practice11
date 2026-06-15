export const getWeekDays = (currentDate: Date): Date[] => {
  const start = new Date(currentDate);
  const day = start.getDay();
  start.setDate(start.getDate() - day + (day === 0 ? -6 : 1));
  return [...Array(7)].map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

export const getHoursArray = (): number[] => [...Array(24)].map((_, i) => i);

export const getNavigationDays = (viewMode: 'week' | 'day'): number => {
  const NAVIGATION_DAYS = {
    week: 7,
    day: 1,
  } as const;
  return NAVIGATION_DAYS[viewMode];
};
