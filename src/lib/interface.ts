export interface IformState {
  success: boolean;
  fieldErrors: {
    username?: string[];
    tweet?: string[];
    email?: string[];
    password?: string[];
    password_confirm?: string[];
  } | null;
}
