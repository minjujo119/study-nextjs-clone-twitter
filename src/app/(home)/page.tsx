import TweetList from "@/components/TweetList";
import { getTweets } from "@/utility/tweets-action";

export default async function StartPage() {
  // 스킵 없이 첫페이지 가져오기
  const initialTweets = await getTweets(0);

  return (
    <>
      <header className="text-center">
        <h1 className="main-title">Tweets</h1>
      </header>
      <section>
        <TweetList initialTweets={initialTweets} />
      </section>
    </>
  );
}
