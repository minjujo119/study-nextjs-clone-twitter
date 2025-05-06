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

## Assignment30

1. 로그인한 유저만 / 페이지로 이동할 수 있습니다.
2. '/' 페이지에는 데이터베이스에 있는 모든 트윗의 목록이 표시되어야 합니다.
3. 유저가 다음 페이지로 이동하거나 이전 페이지로 돌아갈 수 있도록 화살표를 표시하는 페이지네이션(pagination)을 구현합니다.
4. 유저가 트윗을 클릭하면 /tweets/[id] 페이지로 이동하여 해당 트윗의 상세 보기를 볼 수 있어야 합니다(나중에 여기에 답글을 표시할 예정임).

## Assignment31

1. 컴포넌트를 만들어 '/' 페이지 상단에 배치하기
2. 트윗을 업로드하는 폼을 만들고, 폼을 처리하는 서버 액션을 구현, Zod로 유효성 검사를 수행한 다음, Prisma로 트윗을 DB에 저장하기
3. DB에 성공적으로 저장하고 나면 페이지 새로고침하여 DB에 등록된 새 트윗이 리스트에 바로 보이도록 구현

## Assignment32

1. /tweets/[id] 페이지에서 유저가 트윗에 답글을 추가할 수 있어야 하며 트윗에 좋아요 표시할 수 있어야 합니다.
2. 프리즈마에서 Response 모델을 만들고 서버 액션, Zod 유효성 검사, revalidatePath 및 useOptimistic을 사용합니다.
3. 좋아요와 트윗 답글은 useOptimistic 으로 처리해야 합니다.
