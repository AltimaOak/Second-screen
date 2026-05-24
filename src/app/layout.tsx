import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MatchProvider } from "@/context/MatchContext";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/layout/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecondScreen AI - Live IPL Cricket Companion Platform",
  description: "An AI-powered real-time IPL companion platform that enhances live cricket viewing with tactical intelligence, live fan chat, win predictions, and memes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        <MatchProvider>
          <Preloader />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </MatchProvider>
      </body>
    </html>
  );
}

