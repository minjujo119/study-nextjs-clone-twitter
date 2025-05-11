"use server";
import db from "@/lib/db";

export const getMyTweets = async (userId: number) => {
  const tweets = await db.tweet.findMany({
    where: {
      userId,
    },
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
  });
  return tweets;
};
