import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { baseURL } from "./baseURL";

export const api = axios.create({ baseURL, withCredentials: true });

let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const url = original?.url ?? "";
    const isAuthRoute = url.includes("/api/login") || url.includes("/api/auth/refresh");

    if (!original || error.response?.status !== 401 || original._retry || isAuthRoute) {
      return Promise.reject(error);
    }
    original._retry = true;

    try {
      // one refresh shared by all requests that fail at the same time
      refreshPromise ??= api
        .post("/api/auth/refresh")
        .finally(() => {
          refreshPromise = null;
        });
      await refreshPromise;
      return api(original); // replay with the new access_token cookie
    } catch (refreshError) {
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  },
);