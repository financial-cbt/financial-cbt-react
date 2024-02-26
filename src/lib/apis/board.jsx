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
export const insertComment = async ({ boardId, content, user }) => {
  const baseUrl = `/board/${boardId}/comment`;
  try {
    const response = await instance.post(baseUrl, { content, user });
    console.log("res", response);
    return response;
  } catch (err) {
    console.error(err);
  }
};
export async function postBoard({ title, content, user }) {
  const baseUrl = "/board";
  const response = await instance.post(baseUrl, {
    title: title,
    content: content,
    user,
  });
  return response.data;
}
export async function editBoard({ boardId, title, content, user }) {
  const baseUrl = `/board/${boardId}`;
  const response = await instance.put(baseUrl, {
    title: title,
    content: content,
    user
  });
  return response.data;
}
export async function deleteBoard({ boardId }) {
  const response = await axios.delete(
    `http://127.0.0.1:3000/api/board/${boardId}`
  );
  return response.data;
}
