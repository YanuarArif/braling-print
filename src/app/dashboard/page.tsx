"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import React from "react";

const Dashboard = () => {
  const { signOut } = useAuthActions();

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        Dashboard
        <div>
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
