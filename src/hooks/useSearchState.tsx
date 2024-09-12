import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type IParams = { [key: string]: string | undefined };

export const useSearchState = (initialParams: IParams = {}) => {
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [params, setParamsState] = useState<IParams>(initialParams);

  useEffect(() => {
    const newParms: IParams = {};

    search.forEach((value, key) => {
      newParms[key] = value;
    });

    setParamsState(newParms);
  }, [search]);

  const setParams = useCallback(
    (newParams: IParams) => {
      const prevParms: IParams = {};

      search.forEach((value, key) => {
        prevParms[key] = value;
      });

      const updatedParams: IParams = { ...prevParms, ...newParams };

      // Remove keys with undefined or empty values
      Object.keys(updatedParams).forEach((key) => {
        const value = updatedParams[key];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          delete updatedParams[key];
        }
      });

      const params = new URLSearchParams();

      Object.entries(updatedParams).forEach(([key, value]) => {
        if (typeof value === "string") {
          params.set(key, value);
        }
      });

      router.push(pathname + "?" + params.toString());

      setParamsState(updatedParams);
    },
    [search, pathname, router]
  );

  return [params, setParams] as const;
};
