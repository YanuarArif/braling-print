"use client";

import { Button } from "@/components/ui/button";
import HalamanDepan from "./components/halamandepan";
import { useRouter } from "next/navigation";
import { SignInButton } from "@clerk/clerk-react";

export default function Home() {
  const route = useRouter();

  return (
    <main className="h-full flex justify-center items-center">
      <div className="flex flex-col space-y-2">
        <HalamanDepan />
        <Button onClick={() => route.push("/dashboard")}>Dashboard</Button>
        <Button onClick={() => route.push("/login")}>Login</Button>
        <Button onClick={() => route.push("/register")}>Register</Button>
      </div>
    </main>
  );
}
