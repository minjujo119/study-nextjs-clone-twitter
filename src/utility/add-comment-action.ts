"use server";
import db from "@/lib/db";
import { IFormState } from "@/lib/interface";
import getSession from "@/utility/get-session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

// 코멘트 스키마
const commentSchema = z.object({
  comment: z
    .string({
      required_error: "",
    })
    .min(1, "내용을 작성해주세요"),
});

export default async function addCommentAction(
  prevState: IFormState,
  formdata: FormData
): Promise<IFormState> {
  // 임시 딜레이 설정
  // await new Promise((resolve) => setTimeout(resolve, 500));

  const data = {
    comment: formdata.get("comment"),
    tweetId: formdata.get("tweetId"),
  };
  const result = commentSchema.safeParse(data);

  if (!result.success) {
    // console.log(result.error.flatten().fieldErrors);
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
      newComment: null,
    };
  } else {
    // 현재 로그인한 유저 및 트윗 확인
    const session = await getSession();
    const tweetId = Number(data.tweetId);

    if (session.id) {
      // 현재 코멘트 내용 DB에 등록하기
      const newComment = await db.comment.create({
        data: {
          comment: result.data.comment,
          user: {
            connect: {
              id: session.id, // 현재 로그인한 유저 아이디로 User레코드 연결
            },
          },
          tweet: {
            connect: {
              id: tweetId,
            },
          },
        },
        select: {
          id: true,
          comment: true,
          created_at: true,
          updated_at: true,
          user: {
            select: {
              username: true,
            },
          },
          tweet: {
            select: {
              id: true,
            },
          },
        },
      });

      revalidateTag(`comments-in-${tweetId}`);
      return {
        success: true,
        fieldErrors: null,
        newComment: newComment,
      };
    }
  }
  return { success: false, fieldErrors: null, newComment: null };
}
