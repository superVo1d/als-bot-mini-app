import { authService } from "@/services/auth";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
  ReactNode,
} from "react";

interface AuthContextType {
  auth: (token: string) => Promise<any>;
  getData: () => Promise<any>;
  questData: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [questData, setQuestData] = useState<any | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const auth = async (query: string) => {
    return authService.login(query).then(() => {
      localStorage.setItem("token", query);
      setToken(query);
    });
  };

  const getData = async () => {
    if (!token) return;

    return authService.quest().then((data) => {
      setQuestData(data);
    });
  };

  return (
    <AuthContext.Provider value={{ auth, getData, questData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
