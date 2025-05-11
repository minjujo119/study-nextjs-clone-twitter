"use server";
import notFound from "@/app/not-found";
import db from "@/lib/db";
import getSession from "@/utility/get-session";

export const getCurrentUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  // session id도 없고 user도 찾지 못했을 경우(로그인 쿠키가 없는 경우)
  // 유저 전용 페이지에 접근하지 못하도록 notFound 실행
  notFound();
};
