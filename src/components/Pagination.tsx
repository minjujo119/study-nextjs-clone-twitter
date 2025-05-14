import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler } from "react";

export default function Pagination({
  onNext,
  onPrev,
  isFirst,
  isLast,
}: IProps) {
  return (
    <nav className="w-full flex justify-between items-center py-1 px-containerSide">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="transition-all rounded-full p-3 
        enabled:hover:bg-[var(--primary-color)]
        enabled:hover:text-[var(--text-inversion-color)]
        enabled:active:scale-90 text-[var(--text-color)] 
        disabled:text-[var(--disabled-color)]"
      >
        <ArrowLeftIcon className="size-6" />
      </button>
      <h2 className="font-bold">TWEETS</h2>
      <button
        onClick={onNext}
        disabled={isLast}
        className="transition-all rounded-full p-3 
        enabled:hover:bg-[var(--primary-color)]
        enabled:hover:text-[var(--text-inversion-color)]
        enabled:active:scale-90 text-[var(--text-color)] 
        disabled:text-[var(--disabled-color)]"
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
