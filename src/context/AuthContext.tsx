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
  level: number;
  prizes: IPrizeItem[];
  nextLevelProgress: number[];
  isOnboardingCompleted: boolean;
  completeOnboarding: () => void;
}

export interface IQuestDataItem {
  questId: number;
  title: string;
  code?: string;
  completed?: boolean;
}

export type IQuestData = IQuestDataItem[];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const questData: IQuestData = [
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
    questId: 5,
    title: "Попробуй злоебучий соус",
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
  {
    questId: 11,
    title: "Знак с&nbsp;которым все",
  },
  {
    questId: 11,
    title: "Знак с&nbsp;которым все",
  },
];

export interface IPrizeItem {
  name: string;
  code: string;
  requiredLevel: number;
}

const prizes: IPrizeItem[] = [
  {
    name: "magazinus-3",
    code: "magazinus-3",
    requiredLevel: 0,
  },
  {
    name: "narayone-10",
    code: "narayone-10",
    requiredLevel: 1,
  },
];

export const totalQuestLevels = 4;

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
  const [isOnboardingCompleted, setOnboardingCompleted] =
    usePersistentState<boolean>("als_29_quest-onboarding", false);

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
          completed: item.completed || completedQuests?.includes(item.questId),
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

  const level = useMemo(() => {
    if (!questProgress) return 0;

    console.log(questProgress);

    if (questProgress > 12) {
      return 4;
    } else if (questProgress > 8) {
      return 3;
    } else if (questProgress > 4) {
      return 2;
    } else if (questProgress > 1) {
      return 1;
    }

    return 0;
  }, [questProgress]);

  const nextLevelProgress = useMemo(() => {
    if (!questProgress) return [0, 0];

    switch (level) {
      case 0:
        return [questProgress, 2];
      case 1:
        return [questProgress - 2, 3];
      case 2:
        return [questProgress - 5, 4];
      case 3:
        return [questProgress - 9, 4];
      case 4:
        return [questProgress - 13, 1];
    }
  }, [questProgress, level]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        getData,
        questsData,
        completeQuest,
        questProgress,
        level,
        prizes,
        nextLevelProgress,
        isOnboardingCompleted,
        completeOnboarding: () => setOnboardingCompleted(true),
      }}
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
