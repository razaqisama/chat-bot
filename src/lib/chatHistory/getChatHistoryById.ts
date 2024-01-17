"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { config } from "@/config";
import { FetchDataOptions, FetchDataResponse } from "../type";
import { IMessageHistory } from "./type";

export async function getChatHistoryById(
  id: string,
  options?: FetchDataOptions,
): Promise<FetchDataResponse<IMessageHistory>> {
  const test = await fetch(`${config.APP_API_URL}/chat-history/${id}`, {
    next: {
      revalidate: 3600,
      tags: [`chat-history-${id}`],
    },
  });

  const res = await test.json();

  if (res.err) {
    redirect("/");
  }

  if (options?.revalidate) {
    revalidateTag(`chat-history-${id}`);
  }

  return res;
}
