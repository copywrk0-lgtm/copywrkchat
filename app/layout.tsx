import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import CopywrkChatWidget from "@/components/ui/CopywrkChatWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://copywrk.website"),
  title: {
    default: "Copywrk — Websites Worth Remembering",
    template: "%s | Copywrk",
  },
  description:
    "Copywrk designs and develops expressive, mobile-first websites for brands that would rather lead than blend in.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Copywrk — Websites Worth Remembering",
    description: "Strategy, design, motion and development in one continuous digital experience.",
    url: "/",
    siteName: "Copywrk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copywrk — Websites Worth Remembering",
    description: "Strategy, design, motion and development in one continuous digital experience.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ece8df",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<CopywrkChatWidget /></body>
    </html>
  );
}
