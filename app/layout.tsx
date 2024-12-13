import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";


export const metadata: Metadata = {
  title: "Kitch",
  description: "Meal Prep Business Software",
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
      </body>
    </html>
  );
}
