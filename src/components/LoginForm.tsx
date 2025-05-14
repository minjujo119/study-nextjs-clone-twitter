"use client";
import { loginAction } from "@/utility/login-action";
import Input from "./Input";
import { useFormState } from "react-dom";
import Button from "./Button";

export default function LoginForm() {
  const [state, trigger] = useFormState(loginAction, {
    success: false,
    fieldErrors: null,
  });
  return (
    <form action={trigger} className="space-y-3">
      <Input
        name={"email"}
        type={"text"}
        errors={state?.fieldErrors?.email}
        placeholder={"이메일 주소 입력"}
      />
      <Input
        name={"password"}
        type={"password"}
        errors={state?.fieldErrors?.password}
        placeholder={"비밀번호 입력"}
      />
      <Button text={"로그인"} />
    </form>
  );
}
