import './index.scss';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { EventProvider } from './context/EventContext';
import { CalendarPage } from './pages/CalendarPage/CalendarPage';

export function App() {
  return (
    <ErrorBoundary>
      <EventProvider>
        <CalendarPage />
      </EventProvider>
    </ErrorBoundary>
  );
}
