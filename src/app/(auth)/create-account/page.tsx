import CreateAccountForm from "@/components/CreateAccountForm";
import Link from "next/link";

export const metadata = { title: "Join us" };

export default function CreateAccountPage() {
  return (
    <>
      <header className="-mt-20">
        <h1 className="text-[200px] leading-none text-center">&#120168;</h1>
      </header>
      <div className="pt-5">
        <CreateAccountForm />
      </div>
      <div className="pt-5 space-x-2 text-center">
        <span>이미 계정이 있나요?</span>
        <Link
          href={"/log-in"}
          className="underline text-[var(--primary-color)]"
        >
          로그인
        </Link>
      </div>
    </>
  );
}
