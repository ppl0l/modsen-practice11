import './index.scss';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { CalendarPage } from './pages/CalendarPage/CalendarPage';
import { EventProvider } from './providers/EventProvider';

export function App() {
  return (
    <ErrorBoundary>
      <EventProvider>
        <CalendarPage />
      </EventProvider>
    </ErrorBoundary>
  );
}
