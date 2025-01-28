"use client";

import { Button } from "@/components/ui/button";
import {
  SignedOut,
  SignOutButton,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const route = useRouter();

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        Dashboard
        <div>
          <Button onClick={() => route.push("/")}>Home</Button>
        </div>
        <UserButton />
      </div>
    </>
  );
};

export default Dashboard;
