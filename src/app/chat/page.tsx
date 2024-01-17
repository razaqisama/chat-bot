import { ChatCreation } from "@/components/pages/chat";

export default async function ChatPage() {
  return (
    <div
      id="message-container-view"
      className="flex flex-col gap-4 flex-1 overflow-y-scroll py-4 mb-16 px-2"
    >
      <div className="flex justify-center items-center">
        <div className="badge bg-gray-300 text-gray-900 px-4 py-1">Today</div>
      </div>

      <ChatCreation />
    </div>
  );
}
