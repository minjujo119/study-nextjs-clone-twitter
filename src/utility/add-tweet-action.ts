"use server";
import db from "@/lib/db";
import { IformState } from "@/lib/interface";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z
    .string({
      required_error: "내용을 작성해주세요",
    })
    .min(2, "너무 짧아요"),
});

export default async function addTweetAction(
  prevState: IformState,
  formdata: FormData
) {
  // 임시 딜레이 설정
  await new Promise((resolve) => setTimeout(resolve, 500));

  const data = {
    tweet: formdata.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  } else {
    // 현재 로그인한 유저 확인
    const session = await getSession();
    if (session.id) {
      // 트윗 DB레코드에 현재 트윗 내용 등록하기
      await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id, // 현재 로그인한 유저 아이디로 User레코드 연결
            },
          },
        },
        select: {
          id: true,
        },
      });
    }
    // data.tweet = "";
    revalidatePath("/write2");
    return {
      success: true,
      fieldErrors: null,
    };
  }
}
