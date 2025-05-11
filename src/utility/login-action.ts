"use server";
import db from "@/lib/db";
import getSession from "@/utility/get-session";
import { IFormState } from "@/lib/interface";
import { loginSchema } from "@/utility/validation-schema";
import { redirect } from "next/navigation";

export const loginAction = async (
  prevState: IFormState,
  formData: FormData
) => {
  // 로딩 상태의 버튼 확인하기 위한 딜레이
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // input 입력값 가져오기
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // zod 스키마로 validation
  const result = await loginSchema.safeParseAsync(data);

  // validation 미통과 시 에러 반환
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
  // validation 통과 시 로그인 시키기
  else {
    // console.log(result);
    // 1. 입력된 닉네임에 해당하는 DB 레코드 찾기
    const user = await db.user.findUnique({
      where: {
        username: result.data.username,
      },
      select: {
        id: true,
        username: true,
      },
    });

    // 2. 세션에 유저정보 저장 후(=로그인) 다른 페이지로 리다이렉팅
    const session = await getSession();
    session.id = user!.id;
    session.username = user!.username;
    await session.save();
    redirect("/");

    return {
      success: true,
      fieldErrors: null,
    };
  }
};
