"use client";

import { PaperAirplaneIcon } from "@/icons";
import { useCompletion } from "ai/react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { createMessage } from "@/lib/chat/createMessage";
import { createChatHistory } from "@/lib/chatHistory/createChatHistory";
import { useRouter } from "next/navigation";
import ChatBubble, { BubblePosition } from "../ChatBubble";

interface IMessages {
  id: string;
  role: "user" | "ai";
  message: string;
}

function ChatCreation() {
  const router = useRouter();
  const chatHistoryId = useRef("");
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const { completion, input, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      onFinish: async (_prompt: string, completionResponse: string) => {
        await createMessage({
          role: "ai",
          message: completionResponse,
          messageHistoryId: chatHistoryId.current,
        });

        router.replace(`/chat/${chatHistoryId.current}`);
      },
    });

  const handleScrollDown = useCallback(() => {
    const m = document.getElementById("scroll-view");

    if (m) {
      m.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsButtonDisabled(true);

      const promptInput = (e.target as HTMLFormElement).elements.namedItem(
        "prompt",
      ) as HTMLInputElement;

      const history = await createChatHistory(
        {
          title: promptInput.value,
        },
        { revalidate: true },
      );

      if (history.data) {
        chatHistoryId.current = history.data.id;

        const { data } = await createMessage({
          role: "user",
          message: promptInput.value,
          messageHistoryId: history.data.id,
        });

        setMessages((prevState) => {
          const messageData = [...prevState];
          messageData.push({
            id: data.id,
            role: data.role,
            message: data.message,
          });

          return messageData;
        });

        handleScrollDown();
        handleSubmit(e);
        setInput("");
      }
    },
    [handleScrollDown, handleSubmit, setInput],
  );

  useEffect(() => {
    handleScrollDown();
  }, [completion, handleScrollDown]);

  return (
    <>
      {messages.map((item, index) => {
        const uniqueKey = `${item.id}-${index}`;
        const position =
          item.role === "ai" ? "left" : ("right" as BubblePosition);

        return (
          <ChatBubble type={position} key={uniqueKey}>
            {item.message}
          </ChatBubble>
        );
      })}
      {completion && <ChatBubble type="left">{completion}</ChatBubble>}

      <div id="scroll-view" />

      <form
        onSubmit={onSubmit}
        className="fixed bottom-0 left-0 flex justify-center py-4 px-6 w-full bg-[#1d232a]"
      >
        <div className="input input-bordered w-full flex justify-between items-center">
          <input
            value={input}
            onChange={handleInputChange}
            name="prompt"
            type="text"
            placeholder="Send Message..."
            className="w-full h-full bg-transparent"
          />
          <button
            disabled={isButtonDisabled}
            type="submit"
            className="w-8 h-8 flex justify-center items-center rounded-full"
          >
            <PaperAirplaneIcon />
          </button>
        </div>
      </form>
    </>
  );
}

export default ChatCreation;
