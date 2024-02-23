import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  const cookieValue = cookies.get(name);
  return cookieValue;
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};
