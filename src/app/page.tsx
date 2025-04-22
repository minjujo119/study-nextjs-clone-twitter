"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { loginAction } from "@/utility/action";
import { useFormState } from "react-dom";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [state, trigger] = useFormState(loginAction, null);
  console.log(state);
  return (
    <main className="max-w-[375px] h-screen m-auto py-20 px-4">
      <header className="pt-20">
        <h1 className="text-center text-4xl font-extrabold uppercase">Login</h1>
      </header>
      <div className="pt-20">
        <form action={trigger} className="space-y-3">
          <Input name={"username"} type={"text"} errors={state?.errors} />
          <Input name={"email"} type={"email"} errors={state?.errors} />
          <Input name={"password"} type={"password"} errors={state?.errors} />
          <Button />
        </form>
      </div>
      {state?.errors.length === 0 ? (
        <div
          className="
          flex items-center gap-2
          w-full rounded-xl bg-emerald-400 
          text-white p-4 text-lg font-bold
          transition-all mt-5"
        >
          <ShieldCheckIcon className="size-6" />
          <span>Welcome back!</span>
        </div>
      ) : null}
    </main>
  );
}
