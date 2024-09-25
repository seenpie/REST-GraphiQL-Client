import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers/Providers";
import { Suspense } from "react";

const inter = Roboto({ subsets: ["latin", "cyrillic"], weight: "500" });

export const metadata: Metadata = {
  title: "seenGraphQl",
  description: "seenGraphQl 2024",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<span>loading</span>}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
