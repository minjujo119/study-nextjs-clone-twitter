"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag, unstable_cache } from "next/cache";

// like 액션
export async function likeAction(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
  } catch {}
  revalidateTag(`like-status-${tweetId}`);
}
// like 해제 액션
export const disikeAction = async (tweetId: number) => {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
  } catch {}
  revalidateTag(`like-status-${tweetId}`);
};

// Like DB 불러오기
export const getLikeStatus = async (tweetId: number, userId: number) => {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    isLiked: Boolean(isLiked),
    likeCount,
  };
};

// Like DB 캐싱하기
export const getCachedLikeStatus = async (tweetId: number) => {
  const userId = (await getSession()).id!;
  const cachedOperation = unstable_cache(getLikeStatus, ["like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
};
