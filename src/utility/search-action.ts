"use server";
import { z } from "zod";
import db from "@/lib/db";
import { IFormState } from "@/lib/interface";

const searchSchema = z.string().min(1, "최소 1자 이상 입력하세요");

export const searchAction = async (
  prevState: IFormState,
  formData: FormData
): Promise<IFormState> => {
  const keyword = formData.get("search");
  const result = searchSchema.safeParse(keyword);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
      searchResults: null,
    };
  } else {
    const searchResults = await db.tweet.findMany({
      where: {
        tweet: {
          contains: keyword as string,
        },
      },
      select: {
        id: true,
        tweet: true,
        user: {
          select: {
            username: true,
          },
        },
        created_at: true,
        _count: {
          select: {
            Like: true,
          },
        },
      },
    });
    return {
      success: true,
      fieldErrors: null,
      searchResults: searchResults,
    };
  }
};
