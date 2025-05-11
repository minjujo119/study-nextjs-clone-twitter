"use server";
import getSession from "@/utility/get-session";
import { redirect } from "next/navigation";

export const logOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
