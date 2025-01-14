import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "Kitch",
  description: "Software for meal prep companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div className="root-container">
        {children}
        <Analytics />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
