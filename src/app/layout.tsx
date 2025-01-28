import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./provider/ConvexClerkProvider";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Braling Print Studio",
  description: "Melayani Percetakan, Sablon Kaos, Jersey Print dan Konveksi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body className={rubik.className}>{children}</body>
      </html>
    </ConvexClientProvider>
  );
}
