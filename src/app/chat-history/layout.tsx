import { ChevronLeftIcon } from "@/icons";
import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <nav className="sticky top-0 navbar gap-4 shadow-lg">
        <Link href="/">
          <ChevronLeftIcon color="white" />
          <h1>Kembali</h1>
        </Link>
      </nav>
      {children}
    </div>
  );
}