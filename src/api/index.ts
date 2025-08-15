/*
  api/index.ts
  Configuration for axios
*/

import axios, { InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
const BASE_URL = "http://localhost:4000/api";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  return config;
}

export const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error, "ERROR");
    const message =
      error.response.data.message ?? error.response.data.error ?? error.message;
    toast.error(message);
    return Promise.reject(message);
  }
);
