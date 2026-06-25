import axios, { AxiosError } from 'axios';

const API_KEY = 'PbeMSVsgVdGJ3zyHHOGG9GZ6kTiGS5wS';

export const apiClient = axios.create({
  baseURL: '/api',
  params: { apikey: API_KEY },
});

const ERR_MAP: Record<number, string> = {
  401: 'Неверный API ключ. Проверьте настройки.',
  403: 'Доступ запрещен. Проверьте права доступа.',
  404: 'События не найдены.',
  429: 'Слишком много запросов. Попробуйте позже.',
};

interface ApiErrorResponse {
  message?: string;
}

apiClient.interceptors.response.use(
  (r) => r,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status) {
      const data = error.response?.data as ApiErrorResponse;
      error.message = ERR_MAP[status] || data?.message || 'Ошибка API';
    } else if (error.request) {
      error.message = 'Проблемы с сетью.';
    }

    return Promise.reject(error);
  }
);
