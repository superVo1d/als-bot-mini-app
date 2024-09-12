import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface ILangContextProps {
  langData?: any;
}

const LangContext = createContext<ILangContextProps | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [langData, setLangData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLangData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/lang.json`
        );
        const data = await response.json();

        setLangData(data);
      } catch (error) {
        console.error("Error loading suppliers:", error);
        setLangData({});
      } finally {
        setLoading(false);
      }
    };

    loadLangData();
  }, []);

  return (
    <LangContext.Provider value={{ langData }}>{children}</LangContext.Provider>
  );
};

export const useLangContext = (): ILangContextProps => {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
