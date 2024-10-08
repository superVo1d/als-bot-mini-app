import { IScheduleData } from "@/app/api/schedule/route";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

export interface ISupplier {
  name: string;
  image: string;
  description: string;
  social: string;
  category: string;
  subcategory: string | null;
}

export interface ISupplierWithKey extends ISupplier {
  key: string;
}

export interface IDataContextProps {
  suppliers?: { [name: string]: ISupplierWithKey };
  loading: boolean;
  categories?: string[];
  getSubcategories: (categoryName: string) => string[] | void;
  getSuppliers: (subcategoryName: string) => ISupplierWithKey[] | void;
  fetchAfishaData: () => Promise<IScheduleData>;
}

const DataContext = createContext<IDataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [suppliers, setSuppliers] = useState<{
    [name: string]: ISupplierWithKey;
  }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/suppliers.json`
        );
        const data: { [name: string]: ISupplier } = await response.json();

        const dataWithKeys: { [name: string]: ISupplierWithKey } = {};

        Object.entries(data).forEach(([key, value]) => {
          dataWithKeys[key] = {
            key,
            ...value,
            image: `${process.env.NEXT_PUBLIC_BASE_URL}/logos/${key}.png`,
          };
        });
        setSuppliers(dataWithKeys);
      } catch (error) {
        console.error("Error loading suppliers:", error);
        setSuppliers({});
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, []);

  const categories = useMemo(() => {
    if (!suppliers) return;
    return Array.from(
      new Set(
        Object.values(suppliers).map((item) => item.category && item.category)
      )
    );
  }, [suppliers]);

  const getSubcategories = useCallback(
    (categoryName: string) => {
      if (!suppliers) return;

      return Array.from(
        new Set(
          Object.values(suppliers)
            .filter(
              (item) => item.category === categoryName && !!item.subcategory
            )
            .map((item) => item.subcategory)
            .sort((a, b) => {
              if (!(a && b)) return 0;
              if (a === "bezalkogolniye_napitki") return 1;
              if (b === "bezalkogolniye_napitki") return -1;
              return a.localeCompare(b);
            })
        )
      ) as string[] | void;
    },
    [suppliers]
  );

  const getSuppliers = useCallback(
    (subcategoryName: string) => {
      if (!suppliers) return;

      return Array.from(
        new Set(
          Object.values(suppliers)
            .filter((item) => item.subcategory === subcategoryName)
            .map((item) => item)
        )
      );
    },
    [suppliers]
  );

  const fetchAfishaData = async (): Promise<IScheduleData> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule`);
    const dataParsed = await res.json();

    if (dataParsed.error) {
      return [];
    }

    return dataParsed;
  };

  return (
    <DataContext.Provider
      value={{
        suppliers,
        loading,
        categories,
        getSubcategories,
        getSuppliers,
        fetchAfishaData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): IDataContextProps => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
