import React, { useState, useCallback, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { commentView } from "../lib/apis/board";
import { Desktop, Mobile } from "../MediaQuery/useMediaQuery";

export default function BoardItem({ board }) {
  const { _id, title, content, createdAt, author, nickname } = board;
  const [comment, setComment] = useState([]);

  const showComment = useCallback(async () => {
    try {
      const res = await commentView(_id);
      setComment(res);
    } catch (err) {
      // console.error(err);
    }
  }, []);
  useEffect(() => {
    showComment();
  }, []);

  return (
    <>
      <Desktop>
        <ListGroup as="ul">
          <Link to={`/board/${_id}`} style={{ textDecoration: "none" }}>
            <ListGroup.Item as="li" action>
              <div
                style={{
                  display: "flex",
                  padding: " 0 20px",
                  gap: "10px",
                  height: "60px",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: "7", fontSize: "18px" }}>{title}</div>
                <div
                  style={{ flex: "1.5", overflow: "hidden", fontSize: "18px" }}
                >
                  {nickname}
                </div>
                <div
                  style={{ flex: "1.5", overflow: "hidden", fontSize: "18px" }}
                >
                  {createdAt.slice(0, 10)}
                </div>
              </div>
            </ListGroup.Item>
          </Link>
        </ListGroup>
      </Desktop>
      <Mobile>
        <ListGroup as="ul">
          <Link to={`/board/${_id}`} style={{ textDecoration: "none" }}>
            <ListGroup.Item
              as="li"
              action
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  padding: "0 20px",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "18px" }}>{title}</div>
                <div style={{ overflow: "hidden", fontSize: "18px" }}>
                  {nickname}
                </div>
                <div style={{ overflow: "hidden", fontSize: "18px" }}>
                  {createdAt.slice(0, 10)}
                </div>
              </div>
            </ListGroup.Item>
          </Link>
        </ListGroup>
      </Mobile>
    </>
  );
}
