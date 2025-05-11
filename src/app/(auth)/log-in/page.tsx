"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { loginAction } from "@/utility/login-action";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function LoginPage() {
  const [state, trigger] = useFormState(loginAction, {
    success: false,
    fieldErrors: null,
  });

  return (
    <>
      <header className="-mt-20">
        <h1 className="text-[200px] leading-none text-center">&#120168;</h1>
      </header>
      <div className="pt-5">
        <form action={trigger} className="space-y-3">
          <Input
            name={"username"}
            type={"text"}
            errors={state?.fieldErrors?.username}
            placeholder={"username"}
          />
          <Input
            name={"email"}
            type={"email"}
            errors={state?.fieldErrors?.email}
            placeholder={"email"}
          />
          <Input
            name={"password"}
            type={"password"}
            errors={state?.fieldErrors?.password}
            placeholder={"password"}
          />
          <Button text={"LOGIN"} />
        </form>
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
