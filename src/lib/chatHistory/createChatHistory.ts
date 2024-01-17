"use server";

import { revalidateTag } from "next/cache";
import { config } from "@/config";
import { FetchDataOptions, FetchDataResponse } from "../type";
import { IMessageHistory } from "./type";

interface createChatHistoryBodyParams {
  title: string;
}

export async function createChatHistory(
  body: createChatHistoryBodyParams,
  options?: FetchDataOptions,
): Promise<FetchDataResponse<IMessageHistory>> {
  revalidateTag("create-history");

  const response = await fetch(`${config.APP_API_URL}/chat-history`, {
    method: "POST",
    body: JSON.stringify(body),
    next: {
      tags: ["create-history"],
    },
  });

  const data = await response.json();

  if (options?.revalidate) {
    revalidateTag("chat-histories");
  }

  return data;
}
