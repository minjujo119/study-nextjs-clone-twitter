export default async function Loading() {
  return (
    <div className="animate-pulse">
      <section className="flex items-center gap-3 *:rounded-md *:bg-[var(--skeleton-color)]">
        <span className="block size-14 rounded-full "></span>
        <div className="w-8 h-5 bg-[var(--skeleton-color)]"></div>
      </section>
      <section className="pt-5 space-y-3 *:bg-[var(--skeleton-color)] *:rounded-md">
        <p className="w-full h-5"></p>
        <p className="w-2/3 h-5"></p>
        <p className="w-1/3 h-5"></p>
      </section>

      {/* <section className="mt-5 py-2 border-y border-y-[var(--border-color)]">
        <div className="flex items-center gap-1">
          <HeartIcon className="size-8 text-red-500" />
          <p>{tweetDetails._count.Like}</p>
        </div>
      </section> */}
    </div>
  );
}
