import type { Metadata } from "next";
import "./globals.css";

// Using the native system font stack (defined in globals.css --font-sans)
// instead of next/font/google: no external fetch at build time, and it
// still reads as clean/editorial on every platform (San Francisco, Segoe,
// Roboto...). Swap in next/font/google or next/font/local later if a
// specific typeface becomes part of the brand.

export const metadata: Metadata = {
  title: "Company OS",
  description: "Daily operating dashboard for small businesses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
