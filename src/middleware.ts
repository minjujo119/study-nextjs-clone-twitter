import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/session";

const publicPath = new Set(["/log-in", "/create-account"]);

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const isLogin = Boolean((await getSession()).id);
  const isPublicPath = publicPath.has(currentPath);
  // console.log(isLogin);

  // 로그인 되어있고 공공 페이지로 접근 시 not-found 화면 띄우기
  if (isLogin && isPublicPath) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
  // 로그인 안되어있고 유저전용 페이지로 접근 시 로그인 페이지로 이동
  if (!isLogin && !isPublicPath) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }
}
export const config = {
  matcher: [
    //_next/static, /_next/image, favicon.ico 또는 이미지 파일(svg, png, jpg, jpeg, gif, webp) 로 끝나는 경로를 제외한 모든 경로
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
