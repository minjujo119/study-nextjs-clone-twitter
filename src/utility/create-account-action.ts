"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/utility/get-session";
import { IFormState } from "@/lib/interface";
import { createAccountSchema } from "@/utility/validation-schema";
import { redirect } from "next/navigation";

export const createAccountAction = async (
  prevState: IFormState,
  formData: FormData
) => {
  // 로딩 상태의 버튼 확인하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // input 입력값 가져오기
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };

  // zod 스키마로 validation
  const result = await createAccountSchema.safeParseAsync(data);

  // validation 미통과 시 에러 반환
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
  // validation 통과 시 유저 등록 및 로그인
  else {
    // 1. 유저가 입력한 비번 해싱하기
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    // 2. DB에 레코드 등록
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    // 3. 세션에 유저정보 저장 후(=로그인) 다른 페이지로 리다이렉팅
    const session = await getSession();
    session.id = user!.id;
    await session.save();

    redirect("/");

    return {
      success: false,
      fieldErrors: null,
    };
  }
};
