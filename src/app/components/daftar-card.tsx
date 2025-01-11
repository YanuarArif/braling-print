"use client";

import { Input } from "@/components/ui/input";
import { VscAccount } from "react-icons/vsc";
import {
  MdOutlineLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
import { SignInFlow } from "../types/auth";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface DaftarCardProps {
//   setLogin: (login: SignInFlow) => void;
// }

const DaftarCard = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  // form schema from zod
  const formschema = z
    .object({
      email: z.string().email({ message: "Email tidak valid" }),
      password: z
        .string()
        .min(1, { message: "Password wajib diisi" })
        .min(6, "Password minimal 6 karakter"),
      confirmPassword: z
        .string()
        .min(1, { message: "Konfirmasi password wajib diisi" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password tidak cocok",
      path: ["confirmPassword"],
    });
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Watch for changes in form errors
    const subscription = form.watch(() => {
      if (Object.keys(form.formState.errors).length > 0) {
        setShowMessage(true);
        const timer = setTimeout(() => setShowMessage(false), 3000);
        return () => clearTimeout(timer);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: z.infer<typeof formschema>) => {
    console.log(data);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center text-center">
        <CardTitle className="text-3xl lg:text-4xl font-bold">
          Selamat Datang
        </CardTitle>
        <CardDescription className="text-lg font-light">
          Silahkan daftar untuk bisa mengakses akun.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
            {/* Konfirmasi Password */}
            <div className="relative">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex relative items-center">
                        <MdOutlineLock className="absolute left-3" />
                        <Input
                          className={`pl-10 text-base md:text-lg h-12 
                            ${
                              form.formState.errors.confirmPassword
                                ? "border-red-300 focus-visible:ring-red-300"
                                : ""
                            }`}
                          placeholder="Konfirmasi Password"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 focus:outline-none text-sm"
                          onClick={() => {
                            setShowConfirmPassword(!showConfirmPassword);
                          }}
                        >
                          {showConfirmPassword ? (
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
            {/* Tombol Daftar */}
            <Button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10"
            >
              <p className="text-base">Daftar</p>
            </Button>
          </form>
        </Form>
        <div className="flex items-center">
          <div className="border-t mr-[10px] flex-1" />

          <div className="border-t ml-[10px] flex-1" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="cursor-pointer font-bold text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DaftarCard;
