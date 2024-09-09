import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import Header from "@/components/Header";
import {QueryProvider} from "@/providers/query-provider";
import {SheetProvider} from "@/providers/sheet-provider";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance App",
  description: "Welcome fiance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider afterSignOutUrl={"/"} >
        <html lang="en">
        <head>
            <meta property="og:title" content="Yours Finance"/>
            <meta property="og:description" content="Finance app to track your income & expenses.."/>
            <meta property="og:image" content="https://www.example.com/shadcn-logo.png"/>
            <meta property="og:url" content="https://shadcn-finance.vercel.app"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="Shadcn Finance"/>

        </head>
        <body className={inter.className}>
        <QueryProvider>
            <SheetProvider/>
            <Toaster/>
            {children}
        </QueryProvider>
        </body>
        </html>
      </ClerkProvider>

  );
}
