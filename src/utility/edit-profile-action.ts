"use server";
import { IFormState } from "@/lib/interface";
import {
  editBioSchema,
  editEmailSchema,
  editPasswordSchema,
  // editProfileSchema,
  editUsernameSchema,
} from "./validation-schema";
import db from "@/lib/db";
import getSession from "@/utility/get-session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

// 유저네임 수정 서버액션
export const editUsernameAction = async (
  prevState: IFormState,
  formData: FormData
) => {
  const data = {
    username: formData.get("username"),
  };
  // zod 스키마로 validate 실행
  const validation = await editUsernameSchema.safeParseAsync(data);

  // validation 실패 시 에러 문구 반환
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  // validation 통과 시 입력값으로 프로필 업데이트
  const session = await getSession();

  // 1. 유저네임이 빈 문자열이 아니면 DB에 업데이트
  await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      username: validation.data.username,
    },
  });

  // 현재 세션에 바뀐 username 업데이트
  session.username = validation.data.username;
  session.save();

  // 페이지 업데이트
  revalidatePath(`/users/${session.username}/edit`);
  redirect(`/users/${session.username}/edit`);

  return {
    success: true,
    fieldErrors: null,
  };
};

// 이메일 수정 서버액션
export const editEmailAction = async (
  prevState: IFormState,
  formData: FormData
) => {
  const data = {
    email: formData.get("email"),
  };

  // zod 스키마로 validate 실행
  const validation = await editEmailSchema.safeParseAsync(data);

  // validation 실패 시 에러 문구 반환
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  // validation 통과 시 입력값으로 프로필 업데이트
  const session = await getSession();
  await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      email: validation.data.email,
    },
  });
  // 페이지 업데이트
  revalidatePath(`/users/${session.username}/edit`);
  redirect(`/users/${session.username}/edit`);

  // return {
  //   success: true,
  //   fieldErrors: null,
  // };
};

// 패스워드 수정 서버액션
export const editPasswordAction = async (
  prevState: IFormState,
  formData: FormData
) => {
  const data = {
    password: formData.get("password"),
  };

  // zod 스키마로 validate 실행
  const validation = await editPasswordSchema.safeParseAsync(data);

  // validation 실패 시 에러 문구 반환
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  // validation 통과 시 비번 해싱해서 프로필 업데이트
  const hashedPassword = await bcrypt.hash(validation.data.password, 10);
  const session = await getSession();
  await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  // 페이지 업데이트
  revalidatePath(`/users/${session.username}/edit`);
  redirect(`/users/${session.username}/edit`);

  return {
    success: true,
    fieldErrors: null,
  };
};

// Bio 수정 서버액션
export const editBioAction = async (
  prevState: IFormState,
  formData: FormData
) => {
  const data = {
    bio: formData.get("bio"),
  };

  // zod 스키마로 validate 실행
  const validation = await editBioSchema.safeParseAsync(data);

  // validation 실패 시 에러 문구 반환
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  // validation 통과 시 입력값으로 프로필 업데이트
  const session = await getSession();
  await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      bio: validation.data.bio,
    },
  });
  // 페이지 업데이트
  revalidatePath(`/users/${session.username}/edit`);
  redirect(`/users/${session.username}/edit`);

  return {
    success: true,
    fieldErrors: null,
  };
};

// 프로필 수정 한번에 저장하는 액션
// export const editProfileAction = async (
//   prevState: IFormState,
//   formData: FormData
// ) => {
//   // 로딩 상태의 버튼 확인하기 위한 딜레이
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   // 입력값 가져오기
//   const data = {
//     username: formData.get("username"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//     bio: formData.get("bio"),
//   };

//   // zod 스키마로 validate 실행
//   const validation = await editProfileSchema.safeParseAsync(data);

//   // validation 실패 시 에러 문구 반환
//   if (!validation.success) {
//     return {
//       success: false,
//       fieldErrors: validation.error.flatten().fieldErrors,
//     };
//   }

//   // validation 통과 시 입력값으로 프로필 업데이트
//   const session = await getSession();

//   // 1. 유저네임이 빈 문자열이 아니면 DB에 업데이트
//   if (validation.data.username) {
//     await db.user.update({
//       where: {
//         id: session.id,
//       },
//       data: {
//         username: validation.data.username,
//       },
//     });

//     // 현재 세션에 바뀐 username 업데이트
//     session.username = validation.data.username;
//     session.save();
//   }

//   // 2. 이메일이 빈 문자열이 아니면 DB에 업데이트
//   if (validation.data.email) {
//     await db.user.update({
//       where: {
//         id: session.id,
//       },
//       data: {
//         email: validation.data.email,
//       },
//     });
//   }

//   // 3. bio가 빈 문자열이 아니면 DB에 업데이트
//   if (validation.data.bio) {
//     await db.user.update({
//       where: {
//         id: session.id,
//       },
//       data: {
//         bio: validation.data.bio,
//       },
//     });
//   }

//   // 4. 비밀번호가 빈 문자열이 아니면 해싱 후 DB에 업데이트
//   if (validation.data.password) {
//     const hashedPassword = await bcrypt.hash(validation.data.password, 10);
//     await db.user.update({
//       where: {
//         id: session.id,
//       },
//       data: {
//         password: hashedPassword,
//       },
//     });
//   }

//   // 페이지 업데이트
//   revalidatePath(`/users/${session.username}/edit`);
//   redirect(`/users/${session.username}/edit`);

//   return {
//     success: true,
//     fieldErrors: null,
//   };
// };
