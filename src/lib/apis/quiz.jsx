import instance from "./base";

export const fetchQuizList = async () => {
  const baseUrl = "/test/start";

  try {
    const responses = await instance.get(baseUrl);
    const data = responses.data;

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postMyQuiz = async (userId, allQuiz, accuracy, userAnswer) => {
  const baseUrl = `/test/finish/${userId}`;
  try {
    const response = await instance.post(baseUrl, {
      allQuiz,
      accuracy,
      userAnswer,
    });
    const data = response.data;
    console.log("post", data);
    return data;
  } catch (err) {
    console.error("postMyQuiz Error:", err);
    throw err;
  }
};
