"use client";
import CommentItem from "./CommentItem";
import { useOptimistic, useRef } from "react";
import addCommentAction from "@/utility/add-comment-action";
import { useFormState } from "react-dom";
import { IComment, IFormState } from "@/lib/interface";

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
  const [formState, formAction] = useFormState(
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
        <span className="block size-14 rounded-full bg-[var(--primary-color)]"></span>
        <form action={formAction} className="flex-1">
          <textarea
            ref={textAreaRef}
            name="comment"
            placeholder="답글을 입력하세요"
            className="
          block w-full h-20 p-3 
          text-sm bg-white rounded-xl resize-none
          outline-none focus:ring-2 focus:ring-[var(--primary-color)]
          "
          />
          <input type="hidden" name="tweetId" value={tweetId} />
          <span>{formState.fieldErrors?.comment}</span>
          <button type="submit" className="btn btn-sm">
            Reply
          </button>
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
