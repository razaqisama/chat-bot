import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center h-dvh">
      <div className="flex-1 flex justify-center items-center px-4">
        <h1 className="text-center">
          Welcome to the Extraordinary Fantastic Marveolus Chat Bot
        </h1>
      </div>
      <div className="flex-1 flex flex-col gap-4 justify-center items-center px-4">
        <Link type="button" href="/chat" className="btn w-[240px]">
          New Chat
        </Link>
        <Link type="button" href="/chat-history" className="btn w-[240px]">
          Chat History
        </Link>
      </div>
    </main>
  );
}
