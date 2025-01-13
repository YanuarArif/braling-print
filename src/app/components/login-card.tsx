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
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { SignInFlow } from "../types/auth";
import { Provider } from "@supabase/supabase-js";
import supabase from "../utils/supabase/client";
// import { useRouter } from "next/navigation";

// interface LoginCardProps {
//   setLogin: (login: SignInFlow) => void;
// }

const LoginCard = () => {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
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

  useEffect(() => {
    // Watch for changes in form errors
    const subscription = form.watch(() => {
      if (Object.keys(form.formState.errors).length > 0) {
        setShowMessage(true);
        // const timer = setTimeout(() => setShowMessage(false), 30000);
        // return () => clearTimeout(timer);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  async function socialAuth(provider: Provider) {
    setIsPending(true);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  // Check session and redirect to /dashboard if logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  return (
    <>
      <Card className="w-full h-full py-5 shadow-md">
        <CardHeader className="flex items-center text-center">
          <div className="space-y-3 pb-5">
            <CardTitle className="text-3xl lg:text-4xl font-bold">
              Selamat Datang
            </CardTitle>
            <CardDescription className="text-lg font-light">
              Silahkan login untuk membuat pesanan.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 md:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Form */}
              <div className="relative">
                <FormField
                  // disabled={isAuthenticating}
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex relative items-center">
                          <VscAccount className="absolute left-3" />
                          <Input
                            className={`pl-10 text-base md:text-lg h-12 
                            ${
                              form.formState.errors.email
                                ? "border-red-300 focus-visible:ring-red-300"
                                : ""
                            }`}
                            placeholder="Email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      {showMessage && (
                        <FormMessage
                          className="absolute pt-1 pl-1 text-center top-10 font-bold text-xs
                          transform transition-all duration-300 ease-in-out
                          animate-in slide-in-from-top-1"
                        />
                      )}
                    </FormItem>
                  )}
                ></FormField>
              </div>
              {/* Password Form */}
              <div className="relative">
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
                            className={`pl-10 text-base md:text-lg h-12 
                              ${
                                form.formState.errors.password
                                  ? "border-red-300 focus-visible:ring-red-300"
                                  : ""
                              }`}
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
                      {showMessage && (
                        <FormMessage
                          className="absolute pt-1 pl-1 text-center top-10 font-bold text-xs
                          transform transition-all duration-300 ease-in-out
                          animate-in slide-in-from-top-1"
                        />
                      )}
                    </FormItem>
                  )}
                ></FormField>
              </div>
              {/* Tombol Masuk */}
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10"
              >
                <p className="text-base">Masuk</p>
              </Button>
            </form>
          </Form>
          {/* div dibawah form */}
          <div className="space-y-5">
            <div className="flex items-center">
              <div className="border-t mr-[10px] flex-1" />
              <p className="text-sm">atau login dengan</p>
              <div className="border-t ml-[10px] flex-1" />
            </div>
            {/* tombol via sosmed */}
            <div className="flex space-x-3 justify-center ">
              {/* Google */}
              <Button
                disabled={isPending}
                onClick={() => socialAuth("google")}
                variant={"outline"}
                className="flex hover:bg-blue-100 text-xs -space-x-1"
              >
                <FcGoogle size={100} />
                <p className="hidden md:block ">Google</p>
              </Button>
              {/* Twitter */}
              <Button
                disabled={isPending}
                variant={"outline"}
                className=" hover:bg-blue-100 text-xs -space-x-1"
              >
                <FaXTwitter className="text-black-600" />
                <p className="hidden md:block">Twitter/X</p>
              </Button>
              {/* Facebook */}
              <Button
                disabled={isPending}
                variant={"outline"}
                className=" hover:bg-blue-100 text-xs -space-x-1"
              >
                <FaFacebookSquare className="text-blue-600" />
                <p className="hidden md:block">Facebook</p>
              </Button>
            </div>
            <div className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <span
                  onClick={() => router.push("/daftar")}
                  className="cursor-pointer text-blue-500 hover:underline font-bold"
                >
                  Daftar
                </span>
              </p>
            </div>
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
