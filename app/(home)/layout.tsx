import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/cstm/navbar";
import Footer from "@/components/cstm/sections/footer";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Kotbi.tn",
  description: "Kotbi.tn, le site de petites annonces en Tunisie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[90vh] flex-col pt-[80px]">
        {children}
      </main>
      <Footer /> 
    </>
  );
}
