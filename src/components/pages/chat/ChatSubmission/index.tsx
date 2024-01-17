"use client";

import { PaperAirplaneIcon } from "@/icons";
import { useCompletion } from "ai/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { createMessage } from "@/lib/chat/createMessage";
import { useParams } from "next/navigation";
import { IMessage } from "@/lib/chat/type";
import ChatBubble from "../ChatBubble";
import ChatList from "../ChatList";

function ChatSubmission() {
  const params = useParams();
  const { id } = params;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    setCompletion,
    setInput,
  } = useCompletion({
    onFinish: async (_prompt: string, completionResponse: string) => {
      const { data } = await createMessage({
        role: "ai",
        message: completionResponse,
        messageHistoryId: id as string,
      });

      setMessages((prevState) => {
        const messageData = [...prevState];
        messageData.push({
          id: data.id,
          role: data.role,
          message: data.message,
          messageHistoryId: id as string,
        });

        return messageData;
      });

      setCompletion("");
      setIsButtonDisabled(false);
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

      const { data } = await createMessage({
        role: "user",
        message: promptInput.value,
        messageHistoryId: id as string,
      });

      setMessages((prevState) => {
        const messageData = [...prevState];
        messageData.push({
          id: data.id,
          role: data.role,
          message: data.message,
          messageHistoryId: id as string,
        });

        return messageData;
      });

      handleScrollDown();
      handleSubmit(e);
      setInput("");
    },
    [handleScrollDown, handleSubmit, id, setInput],
  );

  useEffect(() => {
    handleScrollDown();
  }, [completion, handleScrollDown]);

  return (
    <>
      <ChatList messages={messages} />
      {completion && (
        <ChatBubble type="left">
          <p>
            {completion}
            <span className="text-xs pl-2">12.56</span>
          </p>
        </ChatBubble>
      )}

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

export default ChatSubmission;
