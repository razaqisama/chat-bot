"use server";

import { revalidateTag } from "next/cache";
import { config } from "@/config";
import { FetchDataOptions } from "../type";

interface createMessageBodyParams {
  role: "user" | "ai";
  message: string;
  messageHistoryId: string;
}

export async function createMessage(
  body: createMessageBodyParams,
  options?: FetchDataOptions,
) {
  const response = await fetch(`${config.APP_API_URL}/chat`, {
    method: "POST",
    body: JSON.stringify(body),
    next: {
      tags: ["create-message"],
    },
  });

  const data = await response.json();

  if (options?.revalidate) {
    revalidateTag("chat-histories");
  }

  return data;
}
