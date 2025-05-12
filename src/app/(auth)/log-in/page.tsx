import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <>
      <header className="-mt-20">
        <h1 className="text-[200px] leading-none text-center">&#120168;</h1>
      </header>
      <div className="pt-5">
        <LoginForm />
      </div>
      <div className="pt-5 space-x-2 text-center">
        <span>처음 오셨나요?</span>
        <Link
          href={"/create-account"}
          className="underline text-[var(--primary-color)]"
        >
          계정 만들기
        </Link>
      </div>
    </>
  );
}
