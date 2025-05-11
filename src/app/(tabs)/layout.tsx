import type { Metadata } from "next";
import "@/app/globals.css";
import Menu from "@/components/Menu";
import getSession from "@/utility/get-session";

export const metadata: Metadata = {
  title: {
    template: "%s | Zwitter",
    default: "Zwitter",
  },
  description: "MJ's Zwitter",
};

export default async function TabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 현재 로그인된 유저 쿠키 가져오기
  const { username } = await getSession();

  // console.log(id, username);
  return (
    <div className="flex justify-between items-start border-x border-x-[var(--border-color)]">
      <Menu username={username} />
      {children}
    </div>
  );
}
