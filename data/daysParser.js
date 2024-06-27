import operationDays from "@/data/operationdays";

const daysParser = (day) => {
  const dayObj = operationDays.find((d) => d.name === day);
  if (!dayObj) return "Unknown day";
  return dayObj;
};

export default daysParser;
