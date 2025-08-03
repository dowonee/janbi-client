import axios from "axios";
import type { Url, CreateUrlInput } from "../types/url";
import type { ChangeLog, HistoryCursorResponse } from "../types/history";
import type { UserProfileResponse } from "../types/user";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function fetchUrls(): Promise<Url[]> {
  const response = await axiosInstance.get<Url[]>("/urls");

  return response.data;
}

export async function fetchUrlHistory(
  id: string,
): Promise<{ url: Url; urlHistoryLogs: ChangeLog[] }> {
  const response = await axiosInstance.get(`/urls/${id}/history`);

  return response.data;
}

export async function fetchUrlHistoryCursor(
  id: string,
  cursor: string | null = null,
  limit: number = 10,
): Promise<HistoryCursorResponse> {
  const params = new URLSearchParams();

  if (cursor) params.append("cursor", cursor);
  params.append("limit", limit.toString());

  const response = await axiosInstance.get<HistoryCursorResponse>(
    `/urls/${id}/history?${params}`,
  );
  return response.data;
}

export async function createUrl(data: CreateUrlInput): Promise<Url> {
  const response = await axiosInstance.post<Url>("/urls", data);

  return response.data;
}

export async function fetchUserProfile(): Promise<UserProfileResponse> {
  const response =
    await axiosInstance.get<UserProfileResponse>("/user/profile");

  return response.data;
}

export async function logout(): Promise<void> {
  const response = await axiosInstance.post("/user/logout");
}
