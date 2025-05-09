import type { Metadata } from "next";
import "@/app/globals.css";
import Menu from "@/components/Menu";

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
    <div className="flex justify-between items-start border-x border-x-[var(--border-color)]">
      <Menu />
      {children}
    </div>
  );
}
