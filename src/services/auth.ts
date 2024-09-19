export const authService = {
  login: async (query: string) => {
    2;
    const response = await fetch("https://vb6.srv.design.ru/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer query_id%3DAAEWJzgGAAAAABYnOAa985k9%26user%3D%257B%2522id%2522%253A104343318%252C%2522first_name%2522%253A%25220xgrisha%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522supervoid%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522is_premium%2522%253Atrue%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1726650382%26hash%3Dfa5fd3e59989370d1757d2bcb765c79537b1416358bedd210c9da8c568ef3007`,
      },
      credentials: "include",
    });

    if (response.ok) {
      return response.json();
    }

    return null;
  },

  quest: async () => {
    const response = await fetch("https://vb6.srv.design.ru/api/quest");

    if (response.ok) {
      return response.json();
    }

    return null;
  },
};
