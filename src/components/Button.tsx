"use client";
import { useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        disabled={pending}
        className="
        bg-primary-color
        block w-full rounded-full
        outline-none py-3 px-12
        text-md text-white font-bold
        disabled:bg-disabled-color
        disabled:text-gray-400
        hover:opacity-90
        enabled:active:scale-95
        transition-all
        "
      >
        {pending ? "Loading..." : "LOGIN"}
      </button>
    </>
  );
}
