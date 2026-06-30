import { createContext } from 'react';

import type { EventContextType } from '@/types/calendar';

export const EventContext = createContext<EventContextType | undefined>(undefined);
