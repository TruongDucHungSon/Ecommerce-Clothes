import axios from "axios";
import { isEmpty } from "lodash";
import { BASE_URL } from "./../utils/constanst";
import { getAccessToken } from "../utils/cookieStorage";

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    if (typeof window === undefined) {
      return config;
    }

    const token = getAccessToken();
    console.log(token);
    config.headers.Authorization = !isEmpty(token) ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use((response) => {
  return response?.data || response?.data?.data || response;
});

export { http };
