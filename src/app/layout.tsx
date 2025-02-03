import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

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
    <html lang="en" className="h-full">
      <body className={`${rubik.className} h-full`}>
        <div className="w-full z-50">
          <Navbar />
        </div>
        <div className="z-10 h-full">{children}</div>
      </body>
    </html>
  );
}
