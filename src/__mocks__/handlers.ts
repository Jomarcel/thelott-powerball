import { http, HttpResponse } from 'msw'
import { mockDrawApiResponse } from './mock-data';
import { API_URL } from '../constants';

export const handlers = [
    http.post(
        API_URL,
        () => {
            return HttpResponse.json(mockDrawApiResponse, { status: 200 });
        }
    ),
];
