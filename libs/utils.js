export function cn(...args) {
  return args.flat().filter(Boolean).join(" ");
}

export function formatMilliseconds(milliseconds) {
  const date = new Date(milliseconds);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

const functions = {
  getAllAppointment: async (url) => {
    try {
      const response = await fetch("/api/appointment", { method: "GET" });
      const data = response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default functions;
