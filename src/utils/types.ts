export interface TicketmasterEvent {
  id: string;
  name: string;
  description?: string;
  url?: string;
  pleaseNote?: string;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
    };
  };
  images?: { url: string }[];
  _embedded?: {
    venues?: {
      name: string;
      city?: { name: string };
    }[];
  };
  classifications?: {
    segment?: { name: string };
    genre?: { name: string };
  }[];
  priceRanges?: {
    min: number;
    max: number;
    currency: string;
  }[];
}

export interface FormattedEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  category: string;
  image: string;
  url: string;
  price: string;
}
