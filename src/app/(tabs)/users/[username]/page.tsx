export const dynamic = "force-dynamic";

import TweetItem from "@/components/TweetItem";
import { formatedTimestamp } from "@/lib/formatter";
import { getSessionUser } from "@/utility/get-session-user";
import { getMyTweets } from "@/utility/get-my-tweets";
import { logOut } from "@/utility/logout-action";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import db from "@/lib/db";

export const metadata = { title: "My page" };

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  // url로 받아온 유저네임이 한글일 경우를 대비해 디코딩
  const decodedUsername = decodeURI(decodeURIComponent(params.username));
  console.log(decodedUsername);
  // 현재 로그인한 유저의 정보
  const sessionUser = await getSessionUser();
  // URL에 있는 유저의 정보
  const urlUser = await db.user.findUnique({
    where: {
      username: decodedUsername,
    },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      created_at: true,
    },
  });
  const tweets = await getMyTweets(urlUser!.id);

  return (
    <div className="container pt-0">
      <section>
        <div className="h-44 w-full bg-[var(--skeleton-color)]"></div>
        <div className="flex justify-between items-center px-containerSide">
          <div className="-mt-12">
            <span className="block rounded-full size-24 bg-[var(--bg-color)] ring-4 ring-[var(--bg-color)]">
              <UserCircleIcon className="icon-avatar-default" />
            </span>
            <h2 className="text-xl font-semibold pt-3">{urlUser?.username}</h2>
            <h3 className="text-sm text-[var(--text-gray)]">{`Joined ${formatedTimestamp(
              urlUser!.created_at
            )}`}</h3>
          </div>

          {/* 본인 프로필일 경우에만 edit, logout 버튼 노출 */}
          {params.username === sessionUser?.username ? (
            <div className="space-y-1">
              <Link
                className="block btn-sm btn-secondary min-w-10"
                href={`/users/${sessionUser!.username}/edit`}
              >
                Edit
              </Link>
              <form action={logOut}>
                <button className="block btn-sm btn-secondary min-w-[120px]">
                  Logout
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </section>

      <section className="pt-5 mt-5 border-t border-t-[var(--border-color)] px-containerSide space-y-7">
        <div>
          <h3 className="text-lg font-bold text-[var(--primary-color)]">
            EMAIL
          </h3>
          <p className="font-light">{urlUser!.email}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--primary-color)]">BIO</h3>
          <p className="font-light">{urlUser!.bio ?? "bio is empty"}</p>
        </div>
      </section>

      <section className="pt-9">
        <h3 className="text-lg font-bold px-containerSide text-[var(--primary-color)]">
          TWEETS
        </h3>
        <div className="pt-2">
          {tweets.length !== 0 ? (
            tweets.map((tweet) => (
              <TweetItem
                key={tweet.id}
                id={tweet.id}
                tweet={tweet.tweet}
                username={tweet.user.username}
                created_at={tweet.created_at}
                like={tweet._count.Like}
              />
            ))
          ) : (
            <p className="font-light px-containerSide">
              아직 작성한 트윗이 없습니다.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
