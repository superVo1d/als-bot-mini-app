import { useState, useEffect } from "react";

function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getInitialValue = () => {
    const storedValue = sessionStorage.getItem(key);
    if (storedValue !== null) {
      return eval(storedValue) as T;
    }
    return initialValue;
  };

  const [value, setValue] = useState<T>(getInitialValue);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default usePersistentState;
