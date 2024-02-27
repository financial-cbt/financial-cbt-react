import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_HOST}/api`;
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 500) {
      console.error("서버 에러 발생");
    }
    return Promise.reject(error);
  }
);

export default instance;
