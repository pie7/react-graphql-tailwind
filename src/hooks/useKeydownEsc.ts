import { useEffect } from "react";

export const useKeydownEsc = (handleToggle: Function) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Esc" || e.key === "Escape") {
        handleToggle(false);
      }
    };
    const ev = document.addEventListener("keydown", handleEsc);
    return () => ev;
  }, [handleToggle]);
};