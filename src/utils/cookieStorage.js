import cookie from "js-cookie";

const ACCESS_TOKEN = "accessToken";

const getAccessToken = () => {
  const token = JSON.parse(cookie.get(ACCESS_TOKEN) || JSON.stringify(""));

  return token;
};

const setAccessToken = (token) => {
  const accessToken = JSON.stringify(token);
  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 24);

  cookie.set(ACCESS_TOKEN, accessToken, {
    expires: expireDate,
  });
};

const clearToken = () => {
  cookie.remove(ACCESS_TOKEN);
};

const isValidAccessToken = () => {
  const token = cookie.get(ACCESS_TOKEN);

  // Kiểm tra xem token có giá trị (không rỗng) và không phải là chuỗi rỗng
  return token && token !== "";
};

export { setAccessToken, getAccessToken, clearToken, isValidAccessToken };
