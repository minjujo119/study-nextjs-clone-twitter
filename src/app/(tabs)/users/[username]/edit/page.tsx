export const dynamic = "force-dynamic";

import EditForm from "@/components/Editform";
import {
  editBioAction,
  editEmailAction,
  editPasswordAction,
  editUsernameAction,
} from "@/utility/edit-profile-action";
import { getCurrentUser } from "@/utility/get-current-user";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const metadata = { title: "Edit" };

export default async function EditPage() {
  // 현재 로그인된 유저 정보 가져오기
  const user = await getCurrentUser();

  return (
    <div className="container pt-0">
      <section>
        {/* 프로필 배경 */}
        <div className="h-44 w-full bg-[var(--skeleton-color)]"></div>

        {/* 닉네임 수정 */}
        <div className="px-containerSide">
          <div className="-mt-12">
            <span className="block rounded-full size-24 bg-[var(--bg-color)] ring-4 ring-[var(--bg-color)]">
              <UserCircleIcon className="icon-avatar-default" />
            </span>
            <EditForm
              editType={"username"}
              inputType={"text"}
              editAction={editUsernameAction}
              userData={user!.username}
            />
          </div>
        </div>
      </section>
      <section className=" px-containerSide pt-8 space-y-8">
        {/* 이메일 수정 */}
        <EditForm
          editType={"email"}
          inputType={"text"}
          editAction={editEmailAction}
          userData={user!.email}
        />
        {/* 비밀번호 수정 */}
        <EditForm
          editType={"password"}
          inputType={"password"}
          editAction={editPasswordAction}
          userData={user!.password}
        />
        {/* 바이오 수정 */}
        <EditForm
          editType={"bio"}
          editAction={editBioAction}
          userData={user!.bio}
        />
      </section>
      <div className="px-containerSide pt-10">
        <button className="btn-full btn-secondary">Save</button>
      </div>
    </div>
  );
}
