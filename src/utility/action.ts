"use server";

export async function loginAction(prevState: any, formData: FormData) {
  // 로딩 상태의 버튼 확인하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(formData);
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // 간단한 입력값 validation
  if (data.password !== "12345") {
    return {
      errors: [{ path: "password", message: "Wrong Password" }],
    };
  } else {
    return {
      errors: [],
    };
  }
}
