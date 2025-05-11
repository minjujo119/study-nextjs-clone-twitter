"use client";
import CommentItem from "./CommentItem";
import { useOptimistic, useRef } from "react";
import addCommentAction from "@/utility/add-comment-action";
import { useFormState } from "react-dom";
import { IComment, IFormState } from "@/lib/interface";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function CommentSection({ tweetId, allComments }: IProps) {
  // 답글 입력폼 초기화를 위한 저장
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // optimistic 사용해서 답글 배열에 가상으로 추가
  const [optimisticComments, addOptimistic] = useOptimistic(
    allComments,
    (prevComments: IComment[], newComment: IComment) => [
      ...prevComments,
      newComment,
    ]
  );

  // 답글 폼 제출 시 동작
  const [state, trigger] = useFormState(
    async (prevState: IFormState, formdata: FormData): Promise<IFormState> => {
      const result = await addCommentAction(prevState, formdata);

      // 입력값이 validation 통과 했을 때
      if (result?.success && result.newComment && textAreaRef.current) {
        // optimistic 실행
        addOptimistic(result.newComment);
        // 입력값 초기화
        textAreaRef.current.value = "";
      }
      return result;
    },
    // 초기 formState값
    {
      success: false,
      fieldErrors: null,
      newComment: null,
    }
  );

  return (
    <>
      {/* 답글 입력 폼*/}
      <div className="flex items-start gap-3 py-6 px-containerSide">
        <span className="avatar">
          <UserCircleIcon className="icon-avatar-default" />
        </span>
        <form action={trigger} className="flex-1 space-y-2">
          <textarea
            ref={textAreaRef}
            name="comment"
            placeholder="답글을 입력하세요"
            className={`
              block w-full h-20 p-3 
              bg-transparent
              text-sm rounded-xl resize-none
              ring-1 ring-[var(--border-color)]
              outline-none focus:ring-[var(--primary-color)]
              placeholder:text-[var(--text-gray)]
            `}
          />
          <input type="hidden" name="tweetId" value={tweetId} />
          <p className="text-sm text-[var(--invalid-color)]">
            {state.fieldErrors?.comment}
          </p>
          <div className="text-right">
            <button type="submit" className="btn-sm btn-secondary">
              댓글 달기
            </button>
          </div>
        </form>
      </div>

      {/* 답글 리스트 */}
      <ul>
        {optimisticComments.map((comment) => (
          <li key={comment.id}>
            <CommentItem
              tweetId={tweetId}
              commentId={comment.id}
              comment={comment.comment}
              username={comment.user.username}
              created_at={comment?.created_at}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

interface IProps {
  tweetId: number;
  allComments: IComment[];
}
