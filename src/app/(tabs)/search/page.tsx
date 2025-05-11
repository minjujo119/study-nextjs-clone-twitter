"use client";
import TweetItem from "@/components/TweetItem";
import { searchAction } from "@/utility/search-action";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useFormState } from "react-dom";

export default function SearchPage() {
  const [state, trigger] = useFormState(searchAction, {
    success: false,
    fieldErrors: null,
    searchResults: null,
  });
  return (
    <div className="container">
      {/* 검색창 */}
      <section className="pt-7 px-containerSide">
        <form action={trigger} className="relative">
          <input
            className="
            w-full outline-none rounded-full 
            bg-transparent 
            ring-1 ring-[var(--border-color)] py-4 px-9
            placeholder:text-[var(--text-gray)]
            focus:ring-[var(--primary-color)]
            "
            name="search"
            type="search"
            placeholder="검색어를 입력하세요"
          />
          <span>{state?.fieldErrors?.search}</span>
          <button
            className="p-2 absolute top-1 right-5 text-[var(--text-gray)]"
            aria-label="search"
          >
            <MagnifyingGlassIcon className="size-8 text-inherit" />
          </button>
        </form>
      </section>

      {/* 검색 결과 */}
      <section className="pt-14">
        {state.searchResults?.map((result) => (
          <TweetItem
            key={result.id}
            id={result.id}
            tweet={result.tweet}
            username={result.user.username}
            created_at={result.created_at}
            like={result._count.Like}
          />
        ))}
      </section>
    </div>
  );
}
