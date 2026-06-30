import type { FormattedEvent, TicketmasterEvent } from '../utils/types';
import { apiClient } from './axios';

const formatEvent = (e: TicketmasterEvent): FormattedEvent => {
  const {
    id,
    name,
    description,
    pleaseNote,
    dates,
    images,
    _embedded,
    classifications,
    priceRanges,
    url,
  } = e;

  const venue = _embedded?.venues?.[0];
  const category = classifications?.[0];
  const price = priceRanges?.[0];

  return {
    id,
    title: name || 'Без названия',
    description: description || pleaseNote || '',
    location: venue?.name ?? venue?.city?.name ?? 'Не указано',
    date: dates.start.localDate,
    time: dates.start.localTime?.slice(0, 5) ?? '12:00',
    category: category?.segment?.name ?? category?.genre?.name ?? 'Другое',
    image: images?.[0]?.url ?? '',
    url: url ?? '',
    price: price ? `${price.min} - ${price.max} ${price.currency}` : 'Бесплатно',
  };
};

export const searchEvents = async (keyword: string, size = 5): Promise<TicketmasterEvent[]> => {
  const { data } = await apiClient.get('/events.json', {
    params: { keyword, size, sort: 'relevance,desc', countryCode: 'US' },
  });
  return data?._embedded?.events ?? [];
};

export const searchEventsSafe = async (query: string, limit = 5) => {
  try {
    if (!query?.trim() || query.length < 2) {
      return { data: [], error: null };
    }

    const events = await searchEvents(query, limit);
    return { data: events.map(formatEvent), error: null };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Ошибка при поиске мероприятий';
    return { data: [], error: errorMessage };
  }
};

export const getEventDetails = async (id: string): Promise<TicketmasterEvent | null> => {
  const { data } = await apiClient.get(`/events/${id}.json`);
  return data;
};
