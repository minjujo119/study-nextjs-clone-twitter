export const dynamic = "force-dynamic";

import TweetItem from "@/components/TweetItem";
import { formatedTimestamp } from "@/lib/formatter";
import { getCurrentUser } from "@/utility/get-current-user";
import { getMyTweets } from "@/utility/get-my-tweets";
import { logOut } from "@/utility/logout-action";
import Link from "next/link";

export default async function UserPage() {
  const user = await getCurrentUser();
  const tweets = await getMyTweets(user!.id);

  return (
    <div className="container pt-0">
      <section>
        <div className="h-44 w-full bg-[var(--skeleton-color)]"></div>
        <div className="flex justify-between items-center px-containerSide">
          <div className="-mt-12">
            <span className="block rounded-full size-24 bg-[var(--primary-color)] ring-4 ring-[var(--bg-color)]"></span>
            <h2 className="text-xl font-semibold pt-3">{user!.username}</h2>
            <h3 className="text-sm text-[var(--text-gray)]">{`Joined ${formatedTimestamp(
              user!.created_at
            )}`}</h3>
          </div>

          <div className="space-y-1">
            <Link
              className="block btn-sm btn-secondary min-w-10"
              href={`/users/${user!.username}/edit`}
            >
              Edit
            </Link>
            <form action={logOut}>
              <button className="block btn-sm btn-secondary min-w-[120px]">
                Logout
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="pt-5 mt-5 border-t border-t-[var(--border-color)] px-containerSide space-y-3">
        <div>
          <h3 className="text-lg font-bold">EMAIL</h3>
          <p className="">{user!.email}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">BIO</h3>
          <p className="">{user!.bio ?? "bio is empty"}</p>
        </div>
      </section>

      <section className="pt-5">
        <h3 className="text-lg font-bold px-containerSide">MY TWEETS</h3>
        <div className="pt-2">
          {tweets.map((tweet) => (
            <TweetItem
              key={tweet.id}
              id={tweet.id}
              tweet={tweet.tweet}
              username={tweet.user.username}
              created_at={tweet.created_at}
              like={tweet._count.Like}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
