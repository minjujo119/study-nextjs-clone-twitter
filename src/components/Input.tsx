import { KeyIcon, EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";

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
          className={`w-full rounded-full border border-neutral-300 outline-none py-3 px-14 text-md invalid:border-red-400
            ${
              errors?.some((error) => error.path === name)
                ? "border-red-400"
                : null
            }
          `}
          name={name}
          type={type}
          placeholder={name}
        />
        {errors?.map((error, index) => {
          // 에러가 발생한 input 아래에만 메시지 띄우기
          return name === error.path ? (
            <p
              className="error-message text-sm text-red-500 px-4 mt-2"
              key={index}
            >
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
