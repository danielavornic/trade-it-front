import $axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axios = $axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
