// "use server";
import db from "@/lib/db";
import { unstable_cache } from "next/cache";

// Comment DB 가져오기
export const getComments = async (tweetId: number) => {
  const comments = await db.comment.findMany({
    where: {
      tweetId,
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
    orderBy: {
      created_at: "asc",
    },
  });
  return comments;
};

// Comment DB 캐싱하기
export const getCachedComments = async (tweetId: number) => {
  const cachedOperation = unstable_cache(getComments, ["like-status"], {
    tags: [`comments-in-${tweetId}`],
  });
  return cachedOperation(tweetId);
};

export const deleteComments = async (commentId: number) => {
  await db.comment.delete({
    where: {
      id: commentId,
    },
  });
};
