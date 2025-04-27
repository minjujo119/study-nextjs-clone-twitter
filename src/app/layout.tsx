import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login Practice",
  description: "MJ's login Practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
