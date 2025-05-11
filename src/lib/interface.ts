export interface IComment {
  id: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  user: { username: string };
  tweet: { id: number };
}

export interface ITweet {
  id: number;
  tweet: string;
  user: { username: string };
  created_at: Date;
  _count: { Like: number };
}

export interface IFormState {
  success: boolean;
  fieldErrors: {
    username?: string[];
    tweet?: string[];
    comment?: string[];
    email?: string[];
    password?: string[];
    password_confirm?: string[];
    search?: string[];
    bio?: string[];
  } | null;
  newComment?: IComment | null;
  searchResults?: ITweet[] | null;
}
