export interface ChangedContent {
  selector: string;
  beforeHtml: string;
  afterHtml: string;
}

export interface ChangeLog {
  _id: string;
  urlId: string;
  scheduledTime: string;
  isChanged: boolean;
  changedSelectors: string[];
  changedContents: ChangedContent[];
  alreadyNotified: boolean;
}

export interface HistoryCursorResponse {
  urlHistoryLogs: ChangeLog[];
  nextCursor: string | null;
}
