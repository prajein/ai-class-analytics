import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientWrapper } from "@/components/ui/dashboard/client-wrapper";
import { Header } from "@/components/ui/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Class Analytics Dashboard",
  description: "Analytics dashboard for AI Department Midsem Scores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ClientWrapper>
          <Header />
          <main className="flex-1 container py-4">
            {children}
          </main>
        </ClientWrapper>
      </body>
    </html>
  );
}
