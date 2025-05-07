export interface IFormState {
  success: boolean;
  fieldErrors: {
    username?: string[];
    tweet?: string[];
    comment?: string[];
    email?: string[];
    password?: string[];
    password_confirm?: string[];
  } | null;
  newComment?: IComment | null;
}

export interface IComment {
  id: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  user: { username: string };
  tweet: { id: number };
}
