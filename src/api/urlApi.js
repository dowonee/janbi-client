import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchUrls() {
  const response = await axios.get(`${BASE_URL}/urls`);

  return response.data;
}

export async function fetchUrlHistory(id) {
  const response = await axios.get(`${BASE_URL}/urls/${id}/history`);

  return response.data;
}

export async function createUrl(data) {
  const response = await axios.post(`${BASE_URL}/urls`, data);

  return response.data;
}
