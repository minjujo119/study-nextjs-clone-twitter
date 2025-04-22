import { KeyIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid";

export default function Input({ name, type, errors }: IProps) {
  const inputIcon = () => {
    if (name === "username") return <UserIcon />;
    if (name === "email") return <EnvelopeIcon />;
    if (name === "password") return <KeyIcon />;
    return null;
  };
  return (
    <>
      <div className="relative">
        <span className="absolute size-5 top-[15px] left-5 text-neutral-500">
          {inputIcon()}
        </span>
        <input
          className="
          w-full rounded-full border border-neutral-300
          outline-none py-3 px-14 text-md
          invalid:border-1 invalid:border-red-500
          "
          name={name}
          type={type}
        />
        {errors?.map((error, index) => {
          return type === error.path ? (
            <p key={index} className="text-sm text-red-500 px-4 mt-2">
              {error.message}
            </p>
          ) : null;
        })}
      </div>
    </>
  );
}

interface IErrors {
  path: string;
  message: string;
}
interface IProps {
  name: string;
  type: string;
  errors?: IErrors[];
}
