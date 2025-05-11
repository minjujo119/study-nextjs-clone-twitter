import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "current-user",
    password: process.env.COOKIE_PASSWORD!, // 사용자가 쿠키를 수정할 수 없도록 복잡한 비번 설정
  });
}

interface SessionContent {
  id?: number;
  username: string;
}
