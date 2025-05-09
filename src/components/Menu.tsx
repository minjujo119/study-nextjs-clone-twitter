export default function Menu() {
  return (
    <nav className="w-40 py-10 bg-[var(--bg-color)] flex-shrink-0">
      <ul className="flex flex-col justify-between m-auto *:py-3 *:px-5 *:text-sm">
        <li className="">Home</li>
        <li className="">Search</li>
        <li className="">Account</li>
      </ul>
    </nav>
  );
}
