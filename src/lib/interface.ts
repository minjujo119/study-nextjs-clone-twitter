export interface IformState {
  success: boolean;
  fieldErrors: {
    username?: string[];
    email?: string[];
    password?: string[];
    password_confirm?: string[];
  } | null;
}
