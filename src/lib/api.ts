import type { ApiError } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeToTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function getAccessToken(): string | null {
  try {
    const store = localStorage.getItem('positivus-auth');
    if (!store) return null;
    const parsed = JSON.parse(store) as { state?: { accessToken?: string } };
    return parsed?.state?.accessToken ?? null;
  } catch {
    return null;
  }
}

async function refreshAccessToken(): Promise<string> {
  const store = localStorage.getItem('positivus-auth');
  const refreshToken = store
    ? (JSON.parse(store) as { state?: { refreshToken?: string } })?.state?.refreshToken
    : null;

  const response = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Session expired. Please log in again.');
  }

  const data = (await response.json()) as { accessToken: string };
  return data.accessToken;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 — try to refresh token
  if (response.status === 401 && token) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        isRefreshing = false;
        onTokenRefreshed(newToken);

        // Update token in storage
        const stored = localStorage.getItem('positivus-auth');
        if (stored) {
          const parsed = JSON.parse(stored) as { state: Record<string, unknown> };
          parsed.state.accessToken = newToken;
          localStorage.setItem('positivus-auth', JSON.stringify(parsed));
        }

        // Retry original request with new token
        return apiFetch<T>(endpoint, options);
      } catch {
        isRefreshing = false;
        localStorage.removeItem('positivus-auth');
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    }

    // Queue the request until token refreshes
    return new Promise((resolve, reject) => {
      subscribeToTokenRefresh((newToken) => {
        apiFetch<T>(endpoint, {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          },
        })
          .then(resolve)
          .catch(reject);
      });
    });
  }

  if (!response.ok) {
    let errorData: ApiError;
    try {
      errorData = (await response.json()) as ApiError;
    } catch {
      errorData = { message: 'Something went wrong', statusCode: response.status };
    }
    throw errorData;
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { method: 'DELETE', ...options }),
};
