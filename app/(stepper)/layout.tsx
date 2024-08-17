import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NavbarStepper } from "@/components/cstm/navbar-stepper";
import { Toaster } from "@/components/ui/toaster";

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
      <NavbarStepper />
      <Toaster />
      <main className="flex min-h-screen flex-col pt-[80px]">
        {children}
      </main>
    </>
  );
}
