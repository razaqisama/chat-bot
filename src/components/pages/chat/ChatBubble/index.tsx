"use client";

import { ReactNode } from "react";

export type BubblePosition = "left" | "right";

interface ChatBubbleProps {
  id?: string;
  type?: BubblePosition;
  avatarUrl?: string;
  children: ReactNode;
}

function ChatBubble({
  id,
  type = "left",
  avatarUrl,
  children,
}: ChatBubbleProps) {
  if (type === "left") {
    return (
      <div className="flex items-end gap-2">
        {avatarUrl && (
          <div className="avatar">
            <div className="w-6 rounded-full">
              <img src={avatarUrl} alt="avatar" />
            </div>
          </div>
        )}

        <div className="chat chat-start">
          <div className="chat-bubble max-w-[100%]">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className="flex justify-end items-end gap-2">
      <div className="chat chat-end">
        <div className="chat-bubble max-w-[100%]">{children}</div>
      </div>
      {avatarUrl && (
        <div className="avatar">
          <div className="w-6 rounded-full">
            <img src={avatarUrl} alt="avatar" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBubble;
