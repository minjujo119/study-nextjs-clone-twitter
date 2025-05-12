"use client";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const menulinks = [
  { title: "Home", href: "/" },
  { title: "Search", href: "/search" },
  { title: "My Page", href: "/users" },
];

export default function Menu({ username }: IProps) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="relative w-36 h-screen py-10 bg-[var(--bg-color)] flex-shrink-0">
      <div className="*:text-lg *:rounded-full *:overflow-hidden *:transition-colors">
        {menulinks.map((menu, index) => {
          // 경로가 메뉴명으로 시작하면 강조
          const isActive =
            menu.href === "/"
              ? pathname === "/"
              : pathname.startsWith(menu.href);
          return (
            <Link
              key={index}
              href={menu.href == "/users" ? `/users/${username}` : menu.href}
              className={`
              hover:text-[var(--primary-color)] inline-block py-3 px-5
              ${
                isActive
                  ? "text-[var(--primary-color)] font-bold"
                  : "text-[var(--text-color)]"
              }
            `}
            >
              {menu.title}
            </Link>
          );
        })}
      </div>

      <div className="absolute flex gap-2 items-center bottom-4 left-3">
        <span className="avatar size-8">
          <UserCircleIcon className="icon-avatar-default" />
        </span>
        <p className="text-center">{username}</p>
      </div>
    </nav>
  );
}

interface IProps {
  username: string;
}
