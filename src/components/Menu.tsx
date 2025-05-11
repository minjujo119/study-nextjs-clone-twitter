import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Menu({ username }: IProps) {
  return (
    <nav className="relative w-36 h-screen py-10 bg-[var(--bg-color)] flex-shrink-0">
      <div className="*:text-lg *:rounded-full *:overflow-hidden *:transition-colors">
        <Link
          className="hover:text-[var(--primary-color)] inline-block py-3 px-5"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="hover:text-[var(--primary-color)] inline-block py-3 px-5"
          href={"/search"}
        >
          Search
        </Link>
        <Link
          className="hover:text-[var(--primary-color)] inline-block py-3 px-5"
          href={`/users/${username}`}
        >
          My Page
        </Link>
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
