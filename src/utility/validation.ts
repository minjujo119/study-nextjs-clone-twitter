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
  ERROR_USERNAME_NOT_EXISTED,
  ERROR_EMAIL_NOT_CORRECT,
} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";

// 이메일 형식 검사
const checkEmail = (val: string) => {
  return val.split("@")[1] === "zod.com" ? true : false;
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
    username: z.string().trim(),
    email: z.string().email(ERROR_EMAIL_INVALID).trim().toLowerCase(),
    password: z.string().trim(),
  })
  // 존재하는 유저인지 검사
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      ctx.addIssue({
        code: "custom",
        message: ERROR_USERNAME_NOT_EXISTED,
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  // 유저 레코드에 등록된 이메일 일치 검사
  .superRefine(async ({ username, email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
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
  .superRefine(async ({ username, password }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
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
