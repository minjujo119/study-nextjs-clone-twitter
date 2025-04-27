import { KeyIcon, EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";
import { InputHTMLAttributes } from "react";

export default function Input({ name, type, errors = [], ...rest }: IProps) {
  const inputIcon = () => {
    if (name === "username") return <UserIcon />;
    if (name === "email") return <EnvelopeIcon />;
    if (name === "password" || type === "password") return <KeyIcon />;
    return null;
  };

  return (
    <>
      <div className="relative">
        <span className="absolute size-5 top-[15px] left-5 text-neutral-500">
          {inputIcon()}
        </span>
        <input
          className={`
            w-full rounded-full 
            border border-neutral-300 outline-none 
            py-3 px-14 text-md invalid:border-[var(--invalid-color)]
            ${errors.length !== 0 ? `border-red-400` : null}
          `}
          name={name}
          {...rest}
        />
        <ul className="text-xs text-[var(--invalid-color)] px-4 mt-2">
          {errors?.map((error, index) => (
            <li className="" key={index}>
              {error}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors?: string[];
}
