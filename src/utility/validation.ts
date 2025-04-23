import { z } from "zod";
import {
  ERROR_USERNAME_MIN_LENGTH,
  ERROR_EMAIL_ALLOWED,
  ERROR_PWD_MIN_LENGTH,
  ERROR_PWD_MIN_NUMBER,
} from "@/lib/constants";

// 이메일 유효검사 func
const checkEmail = (val: string) => {
  return val.split("@")[1] === "zod.com" ? true : false;
};

export const loginSchema = z.object({
  username: z.string().trim().min(5, ERROR_USERNAME_MIN_LENGTH),
  email: z
    .string()
    .email()
    .trim()
    .toLowerCase()
    .refine(checkEmail, ERROR_EMAIL_ALLOWED),
  password: z
    .string()
    .trim()
    .min(10, ERROR_PWD_MIN_LENGTH)
    .regex(/\d/, ERROR_PWD_MIN_NUMBER),
});
