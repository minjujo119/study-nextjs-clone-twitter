"use server";
import db from "@/lib/db";

export async function getTweets(page: number) {
  // 스켈레톤을 보기 위한 임시 딜레이
  // await new Promise((resolve) => setTimeout(resolve, 500));

  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      user: {
        select: {
          username: true,
        },
      },
      created_at: true,
      _count: {
        select: {
          Like: true,
        },
      },
    },
    skip: page * 5,
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export async function getTweetDetail(id: number) {
  // 임시 딜레이
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const details = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      tweet: true,
      user: {
        select: {
          username: true,
        },
      },
      created_at: true,
      _count: {
        select: {
          Like: true,
          Comment: true,
        },
      },
    },
  });

  return details;
}
