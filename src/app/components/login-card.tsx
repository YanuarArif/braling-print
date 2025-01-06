"use client";

import { Input } from "@/components/ui/input";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import {
  MdOutlineLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Provider } from "@supabase/supabase-js";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
// import { useRouter } from "next/navigation";

const LoginCard = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  // cek session login
  useEffect(() => {}, []);

  // form schema from zod
  const formSchema = z.object({
    email: z.string().email({ message: "Email tidak valid" }),
    password: z
      .string()
      .min(1, { message: "Password wajib diisi" })
      .min(6, "Password minimal 6 karakter"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // fungsi untuk submit form via email dan password
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAuthenticating(true);

    try {
      console.log(values);
      // Sign in with Supabase
      const { error } = await supabaseBrowserClient.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        // Handle authentication error
        console.error("Authentication error:", error.message);
        alert("Login failed. Please check your email and password.");
        setIsAuthenticating(false); // Reset loading state on error
        return;
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard");
    } finally {
      // Ensure loading state is reset
      setIsAuthenticating(false);
    }
  }

  // fungsi untuk supabase OAuth
  async function socialAuth(provider: Provider) {
    setIsAuthenticating(true);
    await supabaseBrowserClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsAuthenticating(false);
  }

  // if (!isLogin) return null;

  return (
    <>
      <Card className="w-full h-full py-5 shadow-md">
        <CardHeader className="flex items-center text-center">
          <CardTitle className="text-2xl font-bold">Selamat Datang</CardTitle>
          <CardDescription>
            Silahkan login untuk membuat pesanan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="">
                <FormField
                  // disabled={isAuthenticating}
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex relative items-center ">
                          <VscAccount className="absolute left-3" />
                          <Input
                            className="pl-10 text-sm"
                            placeholder="Email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-center top-10 font-bold text-xs bg-white" />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="pb-3">
                <FormField
                  // disabled={isAuthenticating}
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex relative items-center">
                          <MdOutlineLock className="absolute left-3" />
                          <Input
                            className="pl-10 text-sm"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 focus:outline-none text-sm"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <MdOutlineVisibility />
                            ) : (
                              <MdOutlineVisibilityOff />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-center font-bold text-xs bg-white" />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <Button
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <p>Masuk</p>
              </Button>
            </form>
          </Form>
          <div className="flex items-center">
            <div className="border-t mr-[10px] flex-1" />
            <p className="text-sm">atau login dengan</p>
            <div className="border-t ml-[10px] flex-1" />
          </div>

          {/* tombol via sosmed */}
          <div className="flex space-x-3 justify-center ">
            {/* Google */}
            <Button
              disabled={isAuthenticating}
              onClick={() => socialAuth("google")}
              variant={"outline"}
              className="flex hover:bg-blue-100 text-xs -space-x-1"
            >
              <FcGoogle size={100} />
              <p className="hidden md:block ">Google</p>
            </Button>
            {/* Twitter */}
            <Button
              disabled={isAuthenticating}
              onClick={() => socialAuth("facebook")}
              variant={"outline"}
              className=" hover:bg-blue-100 text-xs -space-x-1"
            >
              <FaXTwitter className="text-black-600" />
              <p className="hidden md:block">Twitter/X</p>
            </Button>
            {/* Facebook */}
            <Button
              disabled={isAuthenticating}
              onClick={() => socialAuth("facebook")}
              variant={"outline"}
              className=" hover:bg-blue-100 text-xs -space-x-1"
            >
              <FaFacebookSquare className="text-blue-600" />
              <p className="hidden md:block">Facebook</p>
            </Button>
          </div>
          <div className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              Belum punya akun?{" "}
              <span className="cursor-pointer text-blue-500 hover:underline font-bold">
                Daftar
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center mt-2 text-xs font-mono">
        <p>Copyright &copy; {new Date().getFullYear()} Braling Print Studio</p>
      </div>
    </>
  );
};

export default LoginCard;
