"use client";
import { useFormState } from "react-dom";
import EditInput from "./EditInput";
import { IFormState } from "@/lib/interface";

export default function EditForm({
  editType,
  inputType,
  editAction,
  userData,
}: IProps) {
  const [state, trigger] = useFormState(editAction, {
    success: false,
    fieldErrors: null,
  });

  return (
    <form action={trigger}>
      <h3 className="text-lg font-bold uppercase">{editType}</h3>
      {/* 암호화된 기존 비밀번호는 노출 X */}
      {editType === "password" ? null : <p className="pt-2">{userData}</p>}
      <EditInput
        name={editType}
        type={inputType}
        placeholder={`새로운 ${editType} 입력`}
        errors={
          editType === "username"
            ? state?.fieldErrors?.username
            : editType === "email"
            ? state?.fieldErrors?.email
            : editType === "password"
            ? state?.fieldErrors?.password
            : editType === "bio"
            ? state?.fieldErrors?.bio
            : []
        }
      />
      <button className="btn-sm btn-secondary mt-2">save</button>
    </form>
  );
}

interface IProps {
  editType: string;
  inputType?: string;
  editAction: (
    prevState: IFormState,
    formData: FormData
  ) => Promise<IFormState>;
  userData: string | null;
}
