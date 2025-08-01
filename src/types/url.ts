export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export type SelectorType = "css" | "xpath";

export interface Selector {
  type: SelectorType;
  selector: string;
}

export interface SlackConfig {
  token?: string;
  channelId?: string;
  channelName?: string;
  webhookUrl?: string;
}

export interface Url {
  _id: string;
  userId: string;
  url: string;
  name: string;
  dayOfWeek: DayOfWeek;
  scheduleTime: string;
  lastChecked: string | null;
  selectors: Selector[];
  slack?: SlackConfig;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUrlInput {
  name: string;
  url: string;
  dayOfWeek: DayOfWeek;
  scheduleTime: string;
  selectors: Selector[];
  slack?: SlackConfig;
}
