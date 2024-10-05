import axios from "axios";

const _API_URL_ = import.meta.env.VITE_PUBLIC_API_URL_

export const $api = axios.create({
  baseURL: _API_URL_,
});
