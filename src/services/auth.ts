import { ICompletedQuestsData } from "@/context/AuthContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const isDev = process.env.NODE_ENV === "development";

export type ISubmitQuestData =
  | {
      success: true;
      quest_id: number;
    }
  | { success: false };

export const authService = {
  login: async (query: string) => {
    2;
    if (isDev) {
      return { success: true };
    }
    const response = await fetch(`${apiUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${encodeURIComponent(query)}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      return response.json();
    }

    return null;
  },

  quest: async (): Promise<ICompletedQuestsData | null> => {
    if (isDev) {
      return [
        {
          quest_id: 0,
        },
        {
          quest_id: 2,
        },
        {
          quest_id: 3,
        },
        {
          quest_id: 10,
        },
      ];
    }
    const response = await fetch(`${apiUrl}/quest`);

    if (response.ok) {
      return response.json();
    }

    return null;
  },

  submitQuest: async (code: string): Promise<ISubmitQuestData | null> => {
    if (isDev) {
      if (code === "1234") {
        return { success: true, quest_id: 1 };
      } else {
        return { success: false };
      }
    }

    const response = await fetch(`${apiUrl}/quest`, {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    if (response.ok) {
      return response.json();
    }

    return null;
  },
};
