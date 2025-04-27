# NextJS로 로그인 구현 연습하기

## Assignment26

1. Tailwind, Server Actions, useFormStatus, 그리고 useFormState 를 활용하여 빌드하자.
2. 유저의 비밀번호가 '12345' 라면, 성공 메시지를 보여야 하고 아닐 경우 에러 메시지가 보여야 한다.

## Assignment27

1. Zod 를 활용하여 server action의 form 검증하자.
2. 검증에 성공하면 성공 메시지를, 실패하면 에러 메시지를 표기해야 한다.
3. 오직 "@zod.com" 이메일만 허용 된다.
4. 유저명은 5 글자 이상이어야 한다.
5. 비밀번호는 10 글자 이상이어야 하며, 반드시 1개 이상의 숫자를 포함해야 한다.

## Assignment28

1. SQLite로 프리즈마를 초기화하고 유저, 트윗, 좋아요 모델을 생성합니다.
2. User 모델에는 username, password, email, bio, created_at updated_at 필드가 있어야 합니다.
3. Tweet 모델에는 tweet, created_at 및 updated_at 필드가 있어야 합니다. 또한 User 와의 관계가 있어야 합니다.
4. Like 모델에는 created_at 필드가 있어야 하며 User 및 Tweet과의 관계가 있어야 합니다.
5. 모든 모델에는 primary key 가 있어야 합니다.

## Assignment29

1. Zod, 서버 액션, 미들웨어, 테일윈드, 프리즈마, iron-session 및 bcrypt를 사용하여 유저 인증을 구현합니다.
2. 3가지 페이지를 구현합니다: /create-account, /log-in, /profile.
3. /create-account 및 /log-in양식은 Zod를 사용하여 유효성을 검사하고 오류를 표시해야 합니다.
4. 유저는 로그인한 후에만 /profile을 볼 수 있어야 합니다.
5. /profile 페이지에는 유저 프로필이 표시되어야 합니다.
