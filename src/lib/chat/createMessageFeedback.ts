"use server";

import { revalidateTag } from "next/cache";
import { config } from "@/config";
import { FetchDataOptions, FetchDataResponse } from "../type";
import { IMessage } from "./type";

interface createMessageBodyParams {
  id: string;
  ratingStatus: 1 | -1;
  feedback: string;
}

export async function createMessageFeedback(
  body: createMessageBodyParams,
  options?: FetchDataOptions,
): Promise<FetchDataResponse<IMessage>> {
  const response = await fetch(`${config.APP_API_URL}/chat`, {
    method: "PATCH",
    body: JSON.stringify(body),
    next: {
      tags: ["create-message-feedback"],
    },
  });

  const data = await response.json();

  if (options?.revalidate) {
    revalidateTag(`chat-history-${body.id}`);
  }

  return data;
}
