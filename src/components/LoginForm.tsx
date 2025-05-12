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
  );
}
