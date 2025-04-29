export default function TweetLoading() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((el, i) => {
        return (
          <div key={i} className="py-5 flex items-center gap-6 animate-pulse">
            <span className="img size-14 shrink-0 rounded-full bg-[var(--skeleton-color)]"></span>
            <div className="w-full space-y-2">
              <p className="w-full h-4 bg-[var(--skeleton-color)] rounded-lg"></p>
              <p className="w-full h-4 bg-[var(--skeleton-color)] rounded-lg"></p>
            </div>
          </div>
        );
      })}
    </>
  );
}
