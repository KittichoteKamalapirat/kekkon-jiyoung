import { useEffect, RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  onClick: Function
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (ref.current?.contains(event.target)) return;
      onClick();
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClick]);
};
