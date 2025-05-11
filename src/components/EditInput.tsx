import { InputHTMLAttributes } from "react";

export default function EditInput({ name, errors = [], ...rest }: IProps) {
  return (
    <>
      {name === "bio" ? (
        <textarea
          name={name}
          className={`
            w-full p-3 mt-2
            bg-transparent
            border-2 border-[var(--border-color)]
            focus:border-[var(--primary-color)]
            placeholder:font-normal
            placeholder:text-[var(--text-gray)]
            rounded-2xl
            ${errors.length !== 0 ? `border-red-400` : null}
          `}
          placeholder="새로운 bio 입력"
        />
      ) : (
        <input
          name={name}
          className={`
            w-[200px] py-1 mt-2
            bg-transparent 
            border-b-2 border-b-[var(--border-color)]
            focus:border-b-[var(--primary-color)]
            placeholder:text-[var(--text-gray)];
            ${errors.length !== 0 ? `border-red-400` : null}
          `}
          {...rest}
        />
      )}

      <ul className="text-xs text-[var(--invalid-color)] pt-2">
        {errors?.map((error, index) => (
          <li className="" key={index}>
            {error}
          </li>
        ))}
      </ul>
    </>
  );
}

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors?: string[] | undefined;
}
