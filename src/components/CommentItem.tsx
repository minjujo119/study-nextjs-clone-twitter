import { formatedTimestamp } from "@/lib/formatter";
import { deleteComments } from "@/utility/comments-action";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function CommentItem({
  tweetId,
  commentId,
  comment,
  username,
  created_at,
}: IProps) {
  // 삭제 버튼 클릭 시 동작

  return (
    <div className="flex gap-3 py-4 px-containerSide justify-between items-start border-t border-t-[var(--border-color)]">
      <span className="avatar">
        <UserCircleIcon className="icon-avatar-default" />
      </span>
      <div className="flex-1 space-y-1">
        <p className="text-lg font-semibold">{username}</p>
        <p className="leading-7 text-lg font-light">{comment}</p>
        <p className="text-[var(--text-gray)]">
          {formatedTimestamp(created_at)}
        </p>
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
