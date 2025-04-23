"use server";
import { loginSchema } from "@/utility/validation";

export async function loginAction(prevState: any, formData: FormData) {
  // 로딩 상태의 버튼 확인하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    // console.log(result.error.flatten());
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  } else {
    return {
      success: true,
      fieldErrors: null,
    };
  }
}
