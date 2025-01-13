import { Button } from "@/components/ui/button";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

async function Dashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const handleLogout = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        Dashboard
        <div>
          <form action={handleLogout}>
            <Button>Logout</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
