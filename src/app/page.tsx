import Link from "next/link";

export default function StartPage() {
  return (
    <main className="main">
      <header className="pt-20 text-center">
        <span className="block text-9xl">🦚</span>
        <h1 className="main-title">peacock</h1>
      </header>
      <div className="pt-20 space-y-3">
        <Link className="btn-full btn-primary" href={"/login"}>
          LOGIN
        </Link>
        <Link className="btn-full btn-secondary" href={"/create-account"}>
          JOIN US
        </Link>
      </div>
    </main>
  );
}
