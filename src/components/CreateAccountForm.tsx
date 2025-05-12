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
  );
}
