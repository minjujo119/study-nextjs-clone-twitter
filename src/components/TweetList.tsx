"use client";
import { useRef, useState } from "react";
import TweetItem from "./TweetItem";
import { getTweets } from "@/utility/tweets-action";
import Pagination from "./Pagination";
import TweetSkeleton from "./TweetLoading";

export default function TweetList({ initialTweets }: IProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const page = useRef(0);
  // console.log("now", page.current);

  // 다음 페이지 넘기기
  const onNextButtonClick = async () => {
    setIsLoading(true);
    page.current += 1;
    const newTweets = await getTweets(page.current);

    if (newTweets.length === 0) {
      // page.current -= 1;
      setIsLast(true);
      return setIsLoading(false);
    }
    setTweets([...newTweets]);
    setIsLoading(false);
    // console.log("click", page.current);
  };

  // 이전 페이지 넘기기
  const onPrevButtonClick = async () => {
    setIsLoading(true);
    setIsLast(false);
    if (page.current === 0) {
      return setIsLoading(false);
    }

    page.current -= 1;
    const newTweets = await getTweets(page.current);

    setTweets([...newTweets]);
    setIsLoading(false);
    // console.log("click", page.current);
  };

  return (
    <>
      <Pagination
        onNext={onNextButtonClick}
        onPrev={onPrevButtonClick}
        isFirst={page.current === 0}
        isLast={isLast}
      />
      {isLoading ? (
        <TweetSkeleton />
      ) : isLast ? (
        <p className="mt-10 text-center text-[var(--disabled-color)]">
          더 이상 트윗이 없습니다.
        </p>
      ) : (
        tweets.map((tweet) => (
          <TweetItem
            key={tweet.id}
            id={tweet.id}
            tweet={tweet.tweet}
            username={tweet.user.username}
            created_at={tweet.created_at}
            like={tweet._count.Like}
          />
        ))
      )}
    </>
  );
}

interface IProps {
  initialTweets: {
    id: number;
    tweet: string;
    user: { username: string };
    created_at: Date;
    _count: { Like: number };
  }[];
}
