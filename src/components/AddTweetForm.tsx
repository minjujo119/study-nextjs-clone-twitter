"use client";
import addTweetAction from "@/utility/add-tweet-action";
import { useFormState } from "react-dom";
import Button from "./Button";
import { useEffect } from "react";

export default function AddTweetForm() {
  const [state, trigger] = useFormState(addTweetAction, {
    success: false,
    fieldErrors: null,
  });

  // 트윗 등록 성공 시 강제 페이지 새로고침
  useEffect(() => {
    if (state?.success) {
      window.location.reload();
    }
  }, [state]);

  return (
    <form action={trigger}>
      <label className="block text-lg font-semibold">{`What's New?`}</label>
      <textarea
        name="tweet"
        className="block w-full h-20 p-3 my-3 text-sm bg-white rounded-xl resize-none"
        placeholder="내용을 입력하세요"
      />
      {state?.fieldErrors?.tweet?.map((error, index) => {
        return (
          <span key={index} className="text-[var(--invalid-color)] font-sm">
            {error}
          </span>
        );
      })}
      <Button text="트윗하기" />
    </form>
  );
}
