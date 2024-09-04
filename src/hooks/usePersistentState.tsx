import { useState, useEffect } from "react";

function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Retrieve the initial value from localStorage if it exists, otherwise use the provided initial value
  const getInitialValue = () => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return eval(storedValue) as T;
    }
    return initialValue;
  };

  const [value, setValue] = useState<T>(getInitialValue);

  useEffect(() => {
    // Save the current state to localStorage whenever it changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default usePersistentState;
