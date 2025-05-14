import CommentSection from "@/components/CommentSection";
import LikeButton from "@/components/LikeButton";
import { formatedTimestamp } from "@/lib/formatter";
import { getCachedComments } from "@/utility/comments-action";
import { getCachedLikeStatus } from "@/utility/like-action";
import { getTweetDetail } from "@/utility/tweets-action";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = { title: "tweet" };

export default async function TweetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const tweetId = Number(params.id);
  if (isNaN(tweetId)) notFound();

  // Tweet DB 가져오기
  const tweetDetails = await getTweetDetail(tweetId);
  if (!tweetDetails) notFound();

  // 캐싱된 likeDB 가져오기
  const likeStatus = await getCachedLikeStatus(tweetId);

  // 캐싱된 Comment 가져오기
  const comments = await getCachedComments(tweetId);

  return (
    <div className="container">
      <section>
        {/* 유저정보 */}
        <div className="flex items-center gap-2 px-containerSide">
          <span className="avatar">
            <UserCircleIcon className="icon-avatar-default" />
          </span>
          <Link
            href={`/users/${tweetDetails.user.username}`}
            className="text-lg"
          >
            {tweetDetails.user.username}
          </Link>
        </div>
        {/* 본문 */}
        <div className="pt-5 space-y-3 px-containerSide">
          <p className="leading-7 text-xl">{tweetDetails.tweet}</p>
          <p className="text-[var(--text-gray)]">
            {formatedTimestamp(tweetDetails.created_at)}
          </p>
        </div>
        {/* 하단 바 */}
        <div className="flex justify-around mt-5 py-2 px-containerSide border-y border-y-[var(--border-color)]">
          <LikeButton
            tweetId={tweetId}
            isLiked={likeStatus.isLiked}
            likeCount={likeStatus.likeCount}
          />
          <button className="flex items-center gap-1">
            <ChatBubbleBottomCenterTextIcon className="size-6 text-[var(--primary-color)]" />
            <p>{tweetDetails._count.Comment}</p>
          </button>
        </div>
      </section>

      {/* 답글 섹션 */}
      <section>
        <CommentSection tweetId={tweetId} allComments={comments} />
      </section>
    </div>
  );
}
