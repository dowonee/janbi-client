import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function fetchUrls() {
  const response = await axiosInstance.get("/urls");

  return response.data;
}

export async function fetchUrlHistory(id) {
  const response = await axiosInstance.get(`/urls/${id}/history`);

  return response.data;
}

export async function createUrl(data) {
  const response = await axiosInstance.post("/urls", data);

  return response.data;
}

export async function fetchUserProfile() {
  const response = await axiosInstance.get("/user/profile");

  return response.data;
}

export async function logout() {
  const response = await axiosInstance.post("/user/logout");

  return response.data;
}
