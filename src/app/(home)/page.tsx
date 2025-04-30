import AddTweetForm from "@/components/AddTweetForm";
import TweetList from "@/components/TweetList";
import { getTweets } from "@/utility/tweets-action";

export default async function StartPage() {
  // 스킵 없이 첫페이지 가져오기
  const initialTweets = await getTweets(0);

  return (
    <>
      <section className="pb-16">
        <AddTweetForm />
      </section>
      <section className="relative pt-16 after:absolute after:z-50 after:top-0 after:left-1/2 after:-translate-x-1/2 after:content-[''] after:w-screen after:h-4 after:bg-white">
        <h2 className="main-title">Tweets</h2>
        <TweetList initialTweets={initialTweets} />
      </section>
    </>
  );
}
