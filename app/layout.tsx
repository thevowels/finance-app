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
    title: 'Shadcn Finance',
    description: 'Finance app to track your income & expenses..',
    openGraph: {
        title: 'Yours Finance',
        description: 'Finance app to track your income & expenses..',
        url: 'https://shadcn-finance.vercel.app',
        siteName: 'Shadcn Finance',
        type: 'website',
        images: [
            {
                url: 'https://shadcn-finance.vercel.app/shadcn-logo.png',
                width: 800,
                height: 600,
                alt: 'Shadcn Finance Logo',
            },
        ],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider afterSignOutUrl={"/"} >
        <html lang="en">
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
