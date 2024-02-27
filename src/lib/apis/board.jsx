import React, { useState } from "react";
import axios from "axios";
import instance from "./base";
//port 번호 바꾸기
export const fetchBoard = async () => {
  const baseUrl = "/board";
  try {
    const response = await instance.get(baseUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const detailBoard = async (boardId) => {
  const baseUrl = `/board/${boardId}`;
  console.log(baseUrl);
  try {
    const response = await instance.get(baseUrl);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const commentView = async (boardId) => {
  const baseUrl = `/board/${boardId}/comment`;
  try {
    const response = await instance.get(baseUrl);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
export const deleteComment = async ({ boardId, commentId }) => {
  const baseUrl = `/board/${boardId}/comment/${commentId}`;
  try {
    const response = await instance.delete(baseUrl);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};
export const updateComment = async ({ boardId, commentId, content }) => {
  const baseUrl = `/board/${boardId}/comment/${commentId}`;
  try {
    const response = await instance.put(baseUrl, {
      content
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
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
    console.log("res", response);
    return response;
  } catch (err) {
    console.error(err);
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
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
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
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
