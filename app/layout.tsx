import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Modern Portfolio",
    template: "%s | Modern Portfolio",
  },
  description: "A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS",
  keywords: ["portfolio", "developer", "nextjs", "typescript", "tailwindcss"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    title: "Modern Portfolio",
    description: "A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS",
    siteName: "Modern Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Portfolio",
    description: "A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS",
    creator: "@yourusername",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
