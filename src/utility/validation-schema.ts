import { z } from "zod";
import {
  ERROR_USERNAME_MIN_LENGTH,
  ERROR_USERNAME_EXISTED,
  ERROR_EMAIL_ALLOWED,
  ERROR_EMAIL_EXISTED,
  ERROR_EMAIL_INVALID,
  ERROR_PWD_MIN_LENGTH,
  ERROR_PWD_MIN_NUMBER,
  ERROR_PWD_NOT_SAME,
  ERROR_PWD_NOT_CORRECT,
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  ERROR_EMAIL_NOT_CORRECT,
  ERROR_PWD_NEED_CHANGE,
} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "./get-session";

// 이메일 형식 검사
const checkEmail = (val: string) => {
  if (val) {
    return val.split("@")[1] === "zod.com" ? true : false;
  }
};

// 두 비밀번호 일치 검사
const checkPassword = ({
  password,
  password_confirm,
}: {
  password: string;
  password_confirm: string;
}) => password === password_confirm;

// 회원가입 zod 스키마
export const createAccountSchema = z
  .object({
    username: z
      .string()
      .toLowerCase()
      .trim()
      .min(USERNAME_MIN_LENGTH, ERROR_USERNAME_MIN_LENGTH),
    email: z
      .string()
      .email(ERROR_EMAIL_INVALID)
      .trim()
      .toLowerCase()
      .refine(checkEmail, ERROR_EMAIL_ALLOWED),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, ERROR_PWD_MIN_LENGTH)
      .regex(/\d/, ERROR_PWD_MIN_NUMBER),
    password_confirm: z.string(),
  })
  // 중복 닉네임 검사
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: ERROR_USERNAME_EXISTED,
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  // 중복 이메일 검사
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: ERROR_EMAIL_EXISTED,
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  // 두 비밀번호 일치 검사
  .refine(checkPassword, {
    message: ERROR_PWD_NOT_SAME,
    path: ["password_confirm"],
  });

// 로그인 zod 스키마
export const loginSchema = z
  .object({
    email: z.string().email(ERROR_EMAIL_INVALID).trim().toLowerCase(),
    password: z.string().trim(),
  })
  // 유저 레코드에 등록된 이메일 일치 검사
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
      },
    });
    // 입력된 email과 DB의 email이 다른 경우 에러
    if (email !== user!.email) {
      ctx.addIssue({
        code: "custom",
        message: ERROR_EMAIL_NOT_CORRECT,
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  // 유저 레코드에 등록된 비번 일치 검사
  .superRefine(async ({ email, password }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    // bcrypt로 해시된 비번과 현재 입력값을 비교하여
    // 통과 시 true 반환, 다르면 false 반환
    const pass = await bcrypt.compare(password, user!.password ?? "");
    if (!pass) {
      ctx.addIssue({
        code: "custom",
        message: ERROR_PWD_NOT_CORRECT,
        path: ["password"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

// 프로필 수정 zod 스키마
// export const editProfileSchema = z
//   .object({
//     username: z
//       .string()
//       .optional()
//       .refine(
//         (val) => !val || val.length >= USERNAME_MIN_LENGTH,
//         ERROR_USERNAME_MIN_LENGTH
//       ),
//     email: z
//       .string()
//       .optional()
//       .refine(
//         (val) => !val || val.split("@")[1] === "zod.com",
//         ERROR_EMAIL_ALLOWED
//       ),
//     password: z
//       .string()
//       .optional()
//       .refine((val) => !val || /\d/.test(val), ERROR_PWD_MIN_NUMBER)
//       .refine(
//         (val) => !val || val.length >= PASSWORD_MIN_LENGTH,
//         ERROR_PWD_MIN_LENGTH
//       ),
//     bio: z.string().optional(),
//   })
//   // 중복 닉네임 검사
//   .refine(
//     async ({ username }) => {
//       const isUsername = await db.user.findUnique({
//         where: {
//           username,
//         },
//         select: {
//           id: true,
//         },
//       });
//       if (username) {
//         return !Boolean(isUsername);
//       } else {
//         return true;
//       }
//     },
//     {
//       message: ERROR_USERNAME_EXISTED,
//       path: ["username"],
//     }
//   )
//   // 중복 이메일 검사
//   .refine(
//     async ({ email }) => {
//       const isEmail = await db.user.findUnique({
//         where: {
//           email,
//         },
//         select: {
//           id: true,
//         },
//       });
//       if (email) {
//         return !Boolean(isEmail);
//       } else {
//         return true;
//       }
//     },
//     {
//       message: ERROR_EMAIL_EXISTED,
//       path: ["email"],
//     }
//   )
//   // 기존 비번과 중복되는지 검사
//   .refine(
//     async ({ username, password }) => {
//       const isPassword = await db.user.findUnique({
//         where: {
//           username,
//         },
//         select: {
//           password: true,
//         },
//       });

//       // password가 빈 문자열이 아니면
//       // bcrypt로 해시된 비번과 현재 입력값을 비교하여 같으면 false 반환, 다르면 true 반환
//       return (
//         !password || !(await bcrypt.compare(password, isPassword!.password))
//       );
//     },
//     {
//       message: ERROR_PWD_NEED_CHANGE,
//       path: ["password"],
//     }
//   );

// 유저네임 수정 스키마
export const editUsernameSchema = z.object({
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, ERROR_USERNAME_MIN_LENGTH)
    .refine(
      async (username) => {
        // 유저네임 중복 있는지 검사
        const isUsername = await db.user.findUnique({
          where: {
            username,
          },
          select: {
            id: true,
          },
        });
        // username이 빈문자열이 아닐 때 중복이 아니면 통과
        return !username || !isUsername;
      },
      {
        message: ERROR_USERNAME_EXISTED,
        path: ["username"],
      }
    ),
});

// 이메일 수정 스키마
export const editEmailSchema = z.object({
  email: z
    .string()
    .email("")
    .refine(checkEmail, ERROR_EMAIL_ALLOWED)
    // 중복 이메일 검사
    .refine(
      async (email) => {
        const isEmail = await db.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        });
        return !Boolean(isEmail);
      },
      {
        message: ERROR_EMAIL_EXISTED,
        path: ["email"],
      }
    ),
});

// 비밀번호 수정 스키마
export const editPasswordSchema = z.object({
  password: z
    .string()
    .regex(/\d/, ERROR_PWD_MIN_NUMBER)
    .refine(
      (val) => !val || val.length >= PASSWORD_MIN_LENGTH,
      ERROR_PWD_MIN_LENGTH
    )
    // 기존 비번과 중복되는지 검사
    .refine(
      async (password) => {
        const session = await getSession();
        const isPassword = await db.user.findUnique({
          where: {
            id: session.id,
          },
          select: {
            password: true,
          },
        });

        // password가 빈 문자열이 아니면
        // bcrypt로 해시된 비번과 현재 입력값을 비교하여 같으면 false 반환, 다르면 true 반환
        return (
          !password || !(await bcrypt.compare(password, isPassword!.password))
        );
      },
      {
        message: ERROR_PWD_NEED_CHANGE,
        path: ["password"],
      }
    ),
});

// 바이오 수정 스키마
export const editBioSchema = z.object({ bio: z.string() });
