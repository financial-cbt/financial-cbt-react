import instance from "./base";

export const fetchBoard = async () => {
  const baseUrl = "/board";
  try {
    const response = await instance.get(baseUrl);
    return response.data;
  } catch (err) {
    // console.log(err);
  }
};

export const detailBoard = async (boardId) => {
  const baseUrl = `/board/${boardId}`;
  try {
    const response = await instance.get(baseUrl);
    return response.data;
  } catch (err) {
    // console.log(err);
  }
};
export const commentView = async (boardId) => {
  const baseUrl = `/board/${boardId}/comment`;
  try {
    const response = await instance.get(baseUrl);
    return response.data;
  } catch (err) {
    // console.error(err);
  }
};
export const deleteComment = async ({ boardId, commentId }) => {
  const baseUrl = `/board/${boardId}/comment/${commentId}`;
  try {
    const response = await instance.delete(baseUrl);
    return response;
  } catch (err) {
    // console.error(err);
  }
};
export const updateComment = async ({ boardId, commentId, content }) => {
  const baseUrl = `/board/${boardId}/comment/${commentId}`;
  try {
    const response = await instance.put(baseUrl, {
      content,
    });
    return response;
  } catch (err) {
    // console.error(err);
  }
};
export const insertComment = async ({ boardId, content, author, nickname }) => {
  const baseUrl = `/board/${boardId}/comment`;
  try {
    const response = await instance.post(baseUrl, {
      content,
      author,
      nickname,
    });
    return response;
  } catch (err) {
    // console.error(err);
  }
};
export async function postBoard({ title, content, author, nickname }) {
  const baseUrl = "/board";
  try {
    const response = await instance.post(baseUrl, {
      title,
      content,
      author,
      nickname,
    });
    return response.data;
  } catch (err) {
    // console.error(err);
  }
}
export async function editBoard({ boardId, title, content, author, nickname }) {
  const baseUrl = `/board/${boardId}`;
  const response = await instance.put(baseUrl, {
    title: title,
    content: content,
    author,
    nickname,
  });
  return response.data;
}
export async function deleteBoard(boardId) {
  const baseUrl = `/board/${boardId}`;
  try {
    const response = await instance.delete(baseUrl);
    return response.data;
  } catch (err) {
    // console.error(err);
  }
}
