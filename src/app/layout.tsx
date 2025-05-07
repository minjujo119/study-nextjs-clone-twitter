import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Zwitter",
    default: "Zwitter",
  },
  description: "MJ's Zwitter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[var(--bg-color)]">
        <main className="relative max-w-[480px] min-w-[360px] min-h-screen m-auto py-20 px-3">
          {children}
        </main>
      </body>
    </html>
  );
}
