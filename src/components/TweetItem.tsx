import { sinceWhenFormat } from "@/lib/formatter";
import Link from "next/link";
// import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as LineHeartIcon } from "@heroicons/react/24/outline";

export default function TweetItem({
  id,
  tweet,
  username,
  created_at,
  like,
}: IProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="py-5 flex justify-between gap-3 items-center border-b border-b-[var(--border-color)]"
    >
      <div className="flex items-center gap-4">
        <span className="img block shrink-0 size-14 rounded-full bg-[var(--primary-color)]"></span>
        <div>
          <div className="flex gap-1">
            <p className="font-semibold">{username}</p>
            <span className="text-[var(--text-gray)]">•</span>
            <p className="text-[var(--text-gray)]">
              {sinceWhenFormat(created_at)}
            </p>
          </div>
          <p className="line-clamp-1">{tweet}</p>
        </div>
      </div>
      <div>
        <LineHeartIcon className="size-8 text-red-500" />
        <p className="text-sm text-center leading-none">{like}</p>
      </div>
    </Link>
  );
}

interface IProps {
  id: number;
  tweet: string;
  username: string;
  created_at: Date;
  like: number;
}
