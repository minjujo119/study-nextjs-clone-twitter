// 숫자 상수
export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 8;

// 에러 문구
export const ERROR_USERNAME_MIN_LENGTH = `닉네임은 최소 ${USERNAME_MIN_LENGTH}자 이상이어야 합니다`;
export const ERROR_USERNAME_EXISTED = "이미 있는 닉네임입니다.";
export const ERROR_USERNAME_NOT_EXISTED = "등록된 닉네임이 없습니다.";
export const ERROR_EMAIL_EXISTED = "이 이메일을 가진 계정이 있습니다.";
export const ERROR_EMAIL_ALLOWED = "'@zod.com'형식의 이메일만 가능합니다.";
export const ERROR_EMAIL_INVALID = "옳지 않은 형식의 이메일입니다.";
export const ERROR_PWD_MIN_LENGTH = `최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`;
export const ERROR_PWD_MIN_NUMBER = "최소 1개 이상의 숫자를 포함해야 합니다.";
export const ERROR_PWD_NOT_SAME = "위 비밀번호와 일치하지 않습니다.";
export const ERROR_PWD_NEED_CHANGE = "기존과 다른 비밀번호를 입력해주세요.";
export const ERROR_EMAIL_NOT_CORRECT = "이메일이 맞지 않습니다.";
export const ERROR_PWD_NOT_CORRECT = "비밀번호가 맞지 않습니다.";
