import { isValidPhoneNumber } from "libphonenumber-js";

//Validates phone number
export const validatePhone = async (phone = "", countryWatch) => {
  const isValidNumber = isValidPhoneNumber(phone, countryWatch);
  return isValidNumber;
};
