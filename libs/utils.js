export function cn(...args) {
  return args.flat().filter(Boolean).join(" ");
}

export const functions = {
  getData: async (url) => {
    try {
      const response = await fetch(`${url}`, { method: "GET" });
      const data = response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};
