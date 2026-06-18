import { useState } from 'react';

import { CalendarGrid } from '@/components/Calendar/CalendarGrid/CalendarGrid';
import { CalendarHeader } from '@/components/Calendar/CalendarHeader/CalendarHeader';
import { Sidebar } from '@/components/Calendar/Sidebar/Sidebar';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Loader } from '@/components/Loader/Loader';
import { useCalendar } from '@/hooks/useCalendar';

import styles from './CalendarPage.module.scss';

export const CalendarPage = () => {
  const { currentDate, viewMode, setViewMode, navigate, goToToday, isLoading, error, retryLoad } =
    useCalendar();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className={styles.mainContent}>
        <CalendarHeader
          currentDate={currentDate}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onNavigate={navigate}
          onToday={goToToday}
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
        />
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} onRetry={retryLoad} />}
        {!isLoading && !error && <CalendarGrid viewMode={viewMode} currentDate={currentDate} />}
      </main>
    </div>
  );
};
