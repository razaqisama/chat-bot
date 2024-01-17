import Link from "next/link";
import { getChatHistories } from "../../lib/chatHistory/getChatHistories";

export const runtime = "edge";

async function ChatHistoryPage() {
  const { data } = await getChatHistories();

  return (
    <main className="flex flex-col gap-4 p-4 overflow-y-scroll">
      {data?.reverse().map((item) => {
        return (
          <Link
            className="bg-[#2e353d] hover:bg-[#37414b] p-4"
            key={item.id}
            href={`/chat/${item.id}`}
          >
            {item.title}
          </Link>
        );
      })}
    </main>
  );
}

export default ChatHistoryPage;
