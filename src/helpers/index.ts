import pick from "./pick";
import otpGenerator from "./otpGenerator";

const getMinutesBetweenDates = (startDate: Date, endDate: Date) => {
  var diff = endDate.getTime() - startDate.getTime();
  return diff / 60000;
};

const configValidator = (payload: any = {}, keys: string[] = []) => {
  let isValid = true,
    errors: string[] = [];

  keys.map((key) => {
    if (!payload[key] || payload[key] === "") {
      isValid = false;
      errors.push(`${key}`);
    }
  });

  return { isValid, errors };
};

export { pick, getMinutesBetweenDates, configValidator, otpGenerator };
