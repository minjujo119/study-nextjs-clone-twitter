"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { createAccountAction } from "@/utility/create-account-action";
import { useFormState } from "react-dom";
import { IformState } from "@/lib/interface";
import Link from "next/link";

export default function CreateAccountPage() {
  const initialState: IformState = {
    success: false,
    fieldErrors: null,
  };
  const [state, trigger] = useFormState(createAccountAction, initialState);

  return (
    <>
      <header className="pt-20">
        <h1 className="main-title">Join us</h1>
      </header>
      <div className="pt-20">
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
          href={"/create-account"}
          className="underline text-[var(--success-color)]"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
