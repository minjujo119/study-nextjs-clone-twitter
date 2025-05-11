import { sinceWhenFormat } from "@/lib/formatter";
import Link from "next/link";
// import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as LineHeartIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";

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
      className="
        flex justify-between gap-3 items-center 
        py-5 px-containerSide 
        border-t border-t-[var(--border-color)]
        first:border-t-0
      "
    >
      <div className="flex items-center gap-3">
        <span className="avatar">
          <UserCircleIcon className="icon-avatar-default" />
        </span>
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
        <LineHeartIcon className="size-6 text-[var(--primary-color)]" />
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
