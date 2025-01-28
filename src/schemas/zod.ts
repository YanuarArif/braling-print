import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(1, { message: "Password wajib diisi" })
    .min(6, "Password minimal 6 karakter"),
  flow: z.enum(["signIn", "signUp"]),
});

export const DaftarSchema = z
  .object({
    username: z.string().min(1, { message: "Username wajib diisi" }),
    email: z.string().email({ message: "Email tidak valid" }),
    password: z
      .string()
      .min(1, { message: "Password wajib diisi" })
      .min(6, "Password minimal 6 karakter"),
    confirmPassword: z
      .string()
      .min(1, { message: "Konfirmasi password wajib diisi" }),
    flow: z.enum(["signIn", "signUp"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });
