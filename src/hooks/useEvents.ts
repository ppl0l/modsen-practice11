import { useContext } from 'react';

import { EventContext } from '@/context/EventContext';
import type { EventContextType } from '@/types/calendar';

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
