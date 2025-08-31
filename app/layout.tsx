// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Dongle - Your Gateway to Onchain dApps",
  description:
    "Discover, review, and submit the best decentralized applications onchain. The premier dApp directory for the onchain ecosystem.",
  generator: "v0.app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
