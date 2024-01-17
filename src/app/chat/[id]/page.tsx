import { ChatSubmission } from "@/components/pages/chat";
import ChatList from "@/components/pages/chat/ChatList";
import { getChatHistoryById } from "@/lib/chatHistory/getChatHistoryById";

interface ChatPageProps {
  params: { id: string };
  searchParams: unknown;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { data } = await getChatHistoryById(params.id, { revalidate: true });
  const { messages } = data;

  return (
    <div
      id="message-container-view"
      className="flex flex-col gap-4 flex-1 overflow-y-scroll py-4 mb-16 px-2"
    >
      <div className="flex justify-center items-center">
        <div className="badge bg-gray-300 text-gray-900 px-4 py-1">Today</div>
      </div>

      <ChatList messages={messages || []} />
      <ChatSubmission />
    </div>
  );
}
