"use client";
import { formatedTimestamp } from "@/lib/formatter";
import { deleteComments } from "@/utility/comments-action";

export default function CommentItem({
  tweetId,
  commentId,
  comment,
  username,
  created_at,
}: IProps) {
  // 삭제 버튼 클릭 시 동작

  return (
    <div className="flex gap-5 py-4 px-containerSide justify-between items-start border-t border-t-[var(--border-color)]">
      <span className="block size-14 rounded-full bg-[var(--primary-color)]"></span>
      <div className="flex-1">
        <p className="text-lg">{username}</p>
        <p className="leading-7 text-lg font-normal">{comment}</p>
        <p>{formatedTimestamp(created_at)}</p>
      </div>
      <form action={() => deleteComments(tweetId, commentId)}>
        <button className="btn btn-sm text-red-500 border-red-500">삭제</button>
      </form>
    </div>
  );
}

interface IProps {
  tweetId: number;
  commentId: number;
  comment: string;
  username: string;
  created_at: Date;
}
