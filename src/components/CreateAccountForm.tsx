"use client";
import Input from "./Input";
import { useFormState } from "react-dom";
import Button from "./Button";
import { createAccountAction } from "@/utility/create-account-action";

export default function CreateAccountForm() {
  const [state, trigger] = useFormState(createAccountAction, {
    success: false,
    fieldErrors: null,
  });
  return (
    <form action={trigger} className="space-y-3">
      <Input
        name={"username"}
        type={"text"}
        errors={state?.fieldErrors?.username}
        placeholder={"닉네임"}
      />
      <Input
        name={"email"}
        type={"text"}
        errors={state?.fieldErrors?.email}
        placeholder={"이메일 주소"}
      />
      <Input
        name={"password"}
        type={"password"}
        errors={state?.fieldErrors?.password}
        placeholder={"비밀번호 | 최소 1개 이상의 숫자 포함"}
      />
      <Input
        name={"password_confirm"}
        type={"password"}
        errors={state?.fieldErrors?.password_confirm}
        placeholder={"비밀번호 확인"}
      />
      <Button text={"회원가입"} />
    </form>
  );
}
