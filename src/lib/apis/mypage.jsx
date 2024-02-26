import instance from "./base";

export const fetchMyList = async (userId) => {
  const baseUrl = `/mypage/${userId}`;

  try {
    const responses = await instance.get(baseUrl);
    const data = responses.data;

    return data;
  } catch (err) {
    console.error(err);
  }
};
