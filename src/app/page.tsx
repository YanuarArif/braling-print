"use client";

import { Button } from "@/components/ui/button";
import HalamanDepan from "./components/halamandepan";
import { useRouter } from "next/navigation";
import { SignInButton } from "@clerk/clerk-react";

export default function Home() {
  const route = useRouter();

  return (
    <main className="flex h-full">
      <div className="w-full h-full pt-16">
        <HalamanDepan />
      </div>
    </main>
  );
}
