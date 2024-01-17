import { IMessage } from "@/lib/chat/type";
import ChatBubble, { BubblePosition } from "../ChatBubble";
import OptionsButton from "./OptionsButton";

interface ChatListProps {
  messages: IMessage[];
}

function ChatList({ messages }: ChatListProps) {
  return (
    <>
      {messages.map((item, index) => {
        const uniqueKey = `${item.id}-${index}`;
        const position =
          item.role === "ai" ? "left" : ("right" as BubblePosition);

        return (
          <ChatBubble type={position} key={uniqueKey}>
            <p>
              {item.message}
              <span className="text-xs pl-2">12.56</span>
            </p>
            {position === "left" && (
              <OptionsButton
                messageId={item.id}
                copyText={item.message}
                ratingStatus={item.ratingStatus}
              />
            )}
          </ChatBubble>
        );
      })}
    </>
  );
}

export default ChatList;
