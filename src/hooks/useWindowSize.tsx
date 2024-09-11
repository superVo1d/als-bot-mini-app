import { useState, useEffect, useMemo } from "react";

export interface IWindowSize {
  width: number;
  height: number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 1,
    height: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(() => windowSize, [windowSize]);
};

export { useWindowSize };
