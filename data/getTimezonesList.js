const getTimezonesList = () => {
  const timezones = ["America/Ciudad_Juarez", "America/Mexico_City"];

  const timezonesList = timezones.map((timezone) => {
    return {
      value: timezone,
      label: timezone,
    };
  });

  return timezonesList;
};

export default getTimezonesList;
