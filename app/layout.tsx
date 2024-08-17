import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/cstm/navbar";
import Footer from "@/components/cstm/sections/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";
import { TooltipProvider } from "@/components/ui/tooltip";


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
    <ClerkProvider localization={arSA}>
    <TooltipProvider>
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
        )}
        dir="rtl"
        >
          {children}
        </body>
    </html>
    </TooltipProvider>
    </ClerkProvider>
  );
}
