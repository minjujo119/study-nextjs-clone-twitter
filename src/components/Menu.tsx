import Link from "next/link";

export default function Menu({ username }: IProps) {
  return (
    <nav className="w-40 min-h-screen py-10 bg-[var(--bg-color)] flex-shrink-0">
      <div className="*:text-lg *:rounded-full *:overflow-hidden *:transition-colors">
        <Link className="hover:underline inline-block py-3 px-5" href={"/"}>
          Home
        </Link>
        <Link
          className="hover:underline inline-block py-3 px-5"
          href={"/search"}
        >
          Search
        </Link>
        <Link
          className="hover:underline inline-block py-3 px-5"
          href={`/users/${username}`}
        >
          My Page
        </Link>
      </div>

      <div>
        <span></span>
        <p>{username}</p>
      </div>
    </nav>
  );
}

interface IProps {
  username: string;
}
