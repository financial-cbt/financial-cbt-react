import React, { useState, useCallback, useEffect } from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { commentView } from "../lib/apis/board";

export default function BoardItem({ board }) {
  const { _id, title, content, createdAt, author, nickname } = board;
  const [comment, setComment] = useState([]);
  //댓글 수 구하기
  const showComment = useCallback(async () => {
    try {
      const res = await commentView(_id);
      setComment(res);
      console.log("comment!!");
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    showComment();
  }, []);
  const commentLength = comment.length;
  return (
    <ListGroup as="ul">
      <Link to={`/board/${_id}`} style={{ textDecoration: "none" }}>
        <ListGroup.Item
          as="li"
          action
          // className="d-flex justify-content-between align-items-start"
        >
          <div
            style={{
              display: "flex",
              padding: " 0 20px",
              gap: "10px",
              height: "60px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "7" }}>{title}</div>
            <div style={{ flex: "1.5", overflow: "hidden" }}>{nickname}</div>
            <div style={{ flex: "1.5", overflow: "hidden" }}>
              {createdAt.slice(0, 10)}
            </div>
          </div>
        </ListGroup.Item>
      </Link>
    </ListGroup>
  );
}
