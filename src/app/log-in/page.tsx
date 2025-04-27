"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { loginAction } from "@/utility/login-action";
import { useFormState } from "react-dom";
import { IformState } from "@/lib/interface";

export default function LoginPage() {
  const initialState: IformState = {
    success: false,
    fieldErrors: null,
  };
  const [state, trigger] = useFormState(loginAction, initialState);

  return (
    <main className="main">
      <header className="pt-20">
        <h1 className="main-title">Login</h1>
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
          <Button text={"LOGIN"} />
        </form>
      </div>
    </main>
  );
}
