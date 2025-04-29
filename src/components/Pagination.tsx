import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler } from "react";

export default function Pagination({
  onNext,
  onPrev,
  isFirst,
  isLast,
}: IProps) {
  return (
    <nav className="w-full flex justify-between items-center pt-3">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="transition-all rounded-full p-3 enabled:hover:bg-teal-300 enabled:active:scale-90 text-[var(--text-black)] disabled:text-[var(--disabled-color)]"
      >
        <ArrowLeftIcon className="size-6" />
      </button>
      <button
        onClick={onNext}
        disabled={isLast}
        className="transition-all rounded-full p-3 enabled:hover:bg-teal-300 enabled:active:scale-90 text-[var(--text-black)] disabled:text-[var(--disabled-color)]"
      >
        <ArrowRightIcon className="size-6" />
      </button>
    </nav>
  );
}

interface IProps {
  onNext: MouseEventHandler;
  onPrev: MouseEventHandler;
  isFirst: boolean;
  isLast: boolean;
}
