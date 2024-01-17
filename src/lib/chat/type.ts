export interface IMessage {
  id: string;
  role: string;
  message: string;
  ratingStatus?: number | null;
  feedback?: string | null;
  messageHistoryId: string;
}
