"use client";
import { disikeAction, likeAction } from "@/utility/like-action";
import { HeartIcon as LineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

export default function LikeButton({ tweetId, isLiked, likeCount }: IProps) {
  // optimistic 사용
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );

  const onClick = async () => {
    // optimistic 훅 먼저 실행
    reducerFn(undefined);

    // liked 상태면 dislike하고, unliked면 like하기
    if (isLiked) {
      await disikeAction(tweetId);
    } else {
      await likeAction(tweetId);
    }
  };

  return (
    <button onClick={onClick} className="flex items-center gap-1">
      {state.isLiked ? (
        <SolidHeartIcon className="size-6 text-[var(--primary-color)]" />
      ) : (
        <LineHeartIcon className="size-6 text-[var(--primary-color)]" />
      )}
      <p>{state.likeCount}</p>
    </button>
  );
}

interface IProps {
  tweetId: number;
  isLiked: boolean;
  likeCount: number;
}
