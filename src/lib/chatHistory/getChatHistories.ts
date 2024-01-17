"use server";

import { revalidateTag } from "next/cache";
import { config } from "@/config";
import { redirect } from "next/navigation";
import { FetchDataOptions, FetchDataResponse } from "../type";
import { IMessageHistory } from "./type";

export async function getChatHistories(
  options?: FetchDataOptions,
): Promise<FetchDataResponse<IMessageHistory[]>> {
  const response = await fetch(`${config.APP_API_URL}/chat-history`, {
    next: {
      revalidate: 3600,
      tags: ["chat-histories"],
    },
  });

  const data = await response.json();

  if (data.err) {
    redirect("/");
  }

  if (options?.revalidate) {
    revalidateTag("chat-histories");
  }

  return data;
}
