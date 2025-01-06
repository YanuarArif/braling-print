"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
// import { useRouter } from "next/navigation";

const DaftarCard = () => {
  // fungsi untuk registrasi via email
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const [isLogin, setIsLogin] = useState(false);
  // const router = useRouter();

  // cek session login

  // form schema from zod
  const formschema = z.object({
    email: z.string().email({ message: "Email tidak valid" }),
    password: z
      .string()
      .min(1, { message: "Password wajib diisi" })
      .min(6, "Password minimal 6 karakter"),
  });
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // fungsi untuk submit form
  async function onSubmit(values: z.infer<typeof formschema>) {
    // setLoading(true);
    setError(null);
    console.log(values);

    try {
      const { error } = await supabaseBrowserClient.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setError(error.message);
      } else {
        alert("Cek email anda untuk verifikasi");
        form.reset();
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      // setLoading(false);
    }
  }
  // fungsi untuk supabase OAuth
  // async function socialAuth(provider: Provider) {
  //   setIsAuthenticating(true);
  //   await supabaseBrowserClient.auth.signInWithOAuth({
  //     provider,
  //     options: {
  //       redirectTo: `${location.origin}/login/callback`,
  //     },
  //   });
  //   setIsAuthenticating(false);
  // }

  // if (!isLogin) return null;

  return (
    <Card className="w-full h-full md:flex">
      <div className="md:w-1/2">
        <CardHeader className="flex items-center">
          <CardTitle>Selamat Datang</CardTitle>
          <CardDescription>
            Silahkan login untuk membuat pesanan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="relative overflow-visible">
                <FormField
                  // disabled={loading}
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex relative items-center">
                          <VscAccount className="absolute left-3" />
                          <Input
                            className="pl-10"
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
              <div className="relative">
                <FormField
                  // disabled={loading}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex relative items-center">
                          <MdOutlineLock className="absolute left-3" />
                          <Input
                            className="pl-10"
                            placeholder="Password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-center font-bold text-xs bg-white" />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
          <div className="flex items-center">
            <div className="border-t mr-[10px] flex-1" />

            <div className="border-t ml-[10px] flex-1" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Belum punya akun?{" "}
              <span className="cursor-pointer text-blue-500 hover:underline">
                Daftar
              </span>
            </p>
          </div>
        </CardContent>
      </div>
      <div className="hidden md:block w-1/2 mx-3">
        <div className="flex flex-col h-full items-center justify-center space-y-5">
          This image sections
          <p className="text-center text-sm italic">
            Merdeka menyediakan layanan service dan jual beli komputer.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DaftarCard;
