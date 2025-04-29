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
      <body>
        <main className="relative max-w-[400px] min-w-[360px] h-screen m-auto py-20 px-4;">
          {children}
        </main>
      </body>
    </html>
  );
}
