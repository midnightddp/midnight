import type { Metadata } from "next";
import { DM_Mono, Outfit } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

// DM Mono
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Outfit
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Midnight Drop",
  description: "Be part of the  Drop, and the take part in the NIGHT token",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon-16x16.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon-32x32.png",
      sizes: "48x48",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/apple-touch-icon.png",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
