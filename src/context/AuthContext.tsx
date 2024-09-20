import usePersistentState from "@/hooks/usePersistentState";
import { authService } from "@/services/auth";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
  ReactNode,
  useMemo,
} from "react";

interface AuthContextType {
  auth: (token: string) => Promise<any>;
  getData: () => Promise<any>;
  questsData: IQuestData | null;
  completeQuest: (questId: number, code: string) => void;
  questProgress?: number;
}

export interface IQuestDataItem {
  questId: number;
  title: string;
  code?: string;
}

export interface IQuestDataWithStatus extends IQuestDataItem {
  completed: boolean;
}

export type IQuestData = IQuestDataWithStatus[];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const questData: IQuestDataItem[] = [
  {
    questId: 0,
    title: "29",
  },
  {
    questId: 1,
    title: "Найти динозавра",
  },
  {
    questId: 2,
    title: "Выложи и&nbsp;отметь студию",
  },
  {
    questId: 3,
    title: "Найди «Мылус»",
  },
  {
    questId: 4,
    title: "Попробый злоебучий соус",
  },
  {
    questId: 5,
    title: "Попробый злоебучий соус",
  },
  {
    questId: 6,
    title: "Картина Николая Иронова",
  },
  {
    questId: 7,
    title: 'Плакат <span class="cross">«ХУЙ»</span>',
  },
  {
    questId: 8,
    title: "Найди рельсус",
  },
  {
    questId: 9,
    title: "Самый честный стикерпак",
  },
  {
    questId: 10,
    title: "Человек в&nbsp;мерче",
  },
  {
    questId: 11,
    title: "Знак с&nbsp;которым все",
  },
];

export interface ICompletedQuestItem {
  quest_id: number;
}

export type ICompletedQuestsData = ICompletedQuestItem[];

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [questsData, setQuestsData] = usePersistentState<IQuestData | null>(
    "als_29_quest",
    null
  );

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
      const completedQuests = data?.map((item) => item.quest_id) || [];
      const newData = questData.map((item) => {
        return {
          ...item,
          completed: completedQuests?.includes(item.questId),
        };
      });
      setQuestsData(newData);
    });
  };

  const completeQuest = (questId: number, code: string) => {
    setQuestsData((prev) =>
      (prev || []).map((item) => {
        if (questId === item.questId) {
          return { ...item, completed: true, code };
        }
        return item;
      })
    );
  };

  const questProgress = useMemo(
    () => questsData?.reduce((acc, item) => acc + (item.completed ? 1 : 0), 0),
    [questsData]
  );

  return (
    <AuthContext.Provider
      value={{ auth, getData, questsData, completeQuest, questProgress }}
    >
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
