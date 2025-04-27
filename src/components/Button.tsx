"use client";
import { useFormStatus } from "react-dom";

export default function Button({ text }: IProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <button disabled={pending} className="btn-full btn-primary">
        {pending ? "Loading..." : text}
      </button>
    </>
  );
}

interface IProps {
  text: string;
}
