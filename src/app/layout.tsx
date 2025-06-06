import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | W",
    default: "W",
  },
  icons: {
    icon: "./favicon.ico",
  },
  description: "minju's study project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[var(--bg-color)]">
        <main className="relative limited-width min-h-screen m-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
