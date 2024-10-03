import { useCallback } from "react";

export interface IScrollTo {
  id?: string;
}

export const useScrollTo = () => {
  const scrollTo = useCallback(({ id }: IScrollTo = {}) => {
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return { scrollTo };
};
