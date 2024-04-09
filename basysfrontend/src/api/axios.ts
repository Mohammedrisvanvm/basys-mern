import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

//   import { adminLogout } from "../../redux/slice/adminSlice";
//   import { userLogout } from "../../redux/slice/userSlice";
//   import { vendorLogout } from "../../redux/slice/vendorSlice";
//   import { store } from "../../redux/store/store";
// const baseURL: string = import.meta.env.VITE_BASEURL;
const baseURL: string = `http://localhost:3000`;

export const axiosBase = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  withCredentials: true,
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  console.info(`[request] [${JSON.stringify(config)}]`);
  const token = localStorage.getItem(
    config.url?.startsWith("/entity/") ? "entityToken" : "usertoken"
  );

  config.headers.Authorization = token;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${error.message}]`);

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response.data)}]`);
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);

  return error;
};
axiosBase.interceptors.request.use(onRequest, onRequestError);

axiosBase.interceptors.response.use(onResponse, onResponseError);
