import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
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

export default async function ProfilePage() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <>
      <section>
        <h1 className="main-title">profile</h1>
      </section>
      <section className="pt-8 space-y-8">
        <h2 className="text-center text-2xl">{`Welcome, ${user.username}!`}</h2>
        <div>
          <h3 className="text-xl font-bold">USERNAME</h3>
          <p className="">{user.username}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">EMAIL</h3>
          <p className="">{user.email}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">BIO</h3>
          <p className="">{user.bio ?? "bio is empty"}</p>
        </div>
      </section>
      <nav className="flex justify-center items-center pt-10 ">
        <form className="w-full" action={logOut}>
          <button className="btn-full btn-secondary">Logout</button>
        </form>
      </nav>
    </>
  );
}
