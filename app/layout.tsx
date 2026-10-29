import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Header from "./components/header";

const michelangelus = localFont({
  src: [
    {
      path: "./fonts/Michelangelus-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Michelangelus-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    { path: "./fonts/Michelangelus-Bold.ttf", weight: "700", style: "normal" },
    {
      path: "./fonts/Michelangelus-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  fallback: ["Georgia", "serif"],
});
export const metadata: Metadata = {
  title: "Abi's Portfolio",
  description: "A collection of work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={michelangelus.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
