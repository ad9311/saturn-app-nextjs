import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopMainNavbar from "../_layouts/components/TopMainNavbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaturnApp",
  description: "My personal app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopMainNavbar />
        {children}
      </body>
    </html>
  );
}
