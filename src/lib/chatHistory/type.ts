import { IMessage } from "../chat/type";

export interface IMessageHistory {
  id: string;
  title: string;
  messages?: IMessage[];
}
