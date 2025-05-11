"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { createAccountAction } from "@/utility/create-account-action";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function CreateAccountPage() {
  const [state, trigger] = useFormState(createAccountAction, {
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
          <Input
            name={"password_confirm"}
            type={"password"}
            errors={state?.fieldErrors?.password_confirm}
            placeholder={"confirm password"}
          />
          <Button text={"SIGN UP"} />
        </form>
      </div>
      <div className="pt-5 space-x-2 text-center">
        <span>이미 계정이 있나요?</span>
        <Link
          href={"/log-in"}
          className="underline text-[var(--success-color)]"
        >
          로그인
        </Link>
      </div>
    </>
  );
}
