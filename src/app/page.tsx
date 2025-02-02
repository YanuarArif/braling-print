"use client";

import { Button } from "@/components/ui/button";
import HalamanDepan from "./components/halamandepan";
import { useRouter } from "next/navigation";
import { SignInButton } from "@clerk/clerk-react";

export default function Home() {
  const route = useRouter();

  return (
    <main className="flex">
      <div className="w-full h-full">
        <HalamanDepan />
      </div>
    </main>
  );
}
