import type { Metadata } from "next";
import "./globals.css";


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
        </div>
      </body>
    </html>
  );
}
