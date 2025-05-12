export const dynamic = "force-dynamic";
import AddTweetForm from "@/components/AddTweetForm";
import TweetList from "@/components/TweetList";
import { getTweets } from "@/utility/tweets-action";

export const metadata = { title: "Home" };

export default async function StartPage() {
  // 스킵 없이 첫페이지 가져오기
  const initialTweets = await getTweets(0);

  return (
    <div className="container">
      <section className="px-containerSide">
        <AddTweetForm />
      </section>
      <section className="relative mt-10 border-t border-t-[var(--border-color)]">
        <TweetList initialTweets={initialTweets} />
      </section>
    </div>
  );
}
