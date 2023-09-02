import cookie from "js-cookie";
import { isEmpty } from "lodash";

const ACCESS_TOKEN = "accessToken";

const getAccessToken = () => {
  const token = JSON.parse(cookie.get(ACCESS_TOKEN) || JSON.stringify(""));

  return token;
};

const setAccessToken = (token) => {
  const accessToken = JSON.stringify(token);
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 5 * 60);

  cookie.set(ACCESS_TOKEN, accessToken, {
    expires: expireDate,
  });
};

const clearToken = () => {
  cookie.remove(ACCESS_TOKEN);
};

const isValidAccessToken = () => {
  const token = JSON.parse(cookie.get(ACCESS_TOKEN) || JSON.stringify(""));

  return !isEmpty(token);
};

export { setAccessToken, getAccessToken, clearToken, isValidAccessToken };
