const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  login: async (query: string) => {
    2;
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

  quest: async () => {
    const response = await fetch(`${apiUrl}/quest`);

    if (response.ok) {
      return response.json();
    }

    return null;
  },
};
