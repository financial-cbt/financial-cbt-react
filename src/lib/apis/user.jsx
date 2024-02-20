import instance from "./base";

export const signup = async (email, password, nickname) => {
  const baseUrl = "/users/signup";
  try {
    const response = await instance.post(baseUrl, {
      email: email,
      password: password,
      nickName: nickname,
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const login = async (email, password) => {
  const baseUrl = "/users/login";
  try {
    const response = await instance.post(baseUrl, {
      email: email,
      password: password,
    });
    const data = response;
    console.log(data);
    return data;
  } catch (err) {
    // console.error(err);
    return err;
  }
};

export const logout = async () => {
  const baseUrl = "/users/logout";
  try {
    const response = await instance.post(baseUrl);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
