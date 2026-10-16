import { useEffect, useRef, useState } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, ref };
}