import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
<link rel="icon" href="/favicon.ico" sizes="any" />

export const metadata: Metadata = {
  title: "Cartão Saúde da Família",
  description: "Cuidando sempre de você",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
