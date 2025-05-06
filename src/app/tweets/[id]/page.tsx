import { formatedTimestamp } from "@/utility/formatter";
import { getTweetDetail } from "@/utility/tweets-action";
// import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as LineHeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TweetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const tweetId = Number(params.id);
  if (isNaN(tweetId)) notFound();
  const tweetDetails = await getTweetDetail(tweetId);
  if (!tweetDetails) notFound();

  return (
    <>
      <section className="flex items-center gap-3">
        <span className="block size-14 rounded-full bg-[var(--primary-color)]"></span>
        <div className="space-x-2">
          <Link href={"/profile"} className="text-lg">
            {tweetDetails.user.username}
          </Link>
        </div>
      </section>
      <section className="pt-5 space-y-3">
        <p className="leading-7 text-xl">{tweetDetails.tweet}</p>
        <p className="text-[var(--text-gray)]">
          {formatedTimestamp(tweetDetails.created_at)}
        </p>
      </section>

      <section className="flex justify-center mt-5 py-2 border-y border-y-[var(--border-color)]">
        <form>
          <button className="flex items-center gap-1">
            <LineHeartIcon className="size-8 text-red-500" />
            <p>{tweetDetails._count.Like}</p>
          </button>
        </form>
      </section>
    </>
  );
}
