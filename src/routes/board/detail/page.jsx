import React, { useCallback, useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  detailBoard,
  commentView,
  deleteComment,
  insertComment,
} from "../../../lib/apis/board";
import Card from "react-bootstrap/Card";
import useAuth from "../../../lib/hooks/useAuth";

export default function page() {
  const { user } = useAuth();
  // 게시판 속성
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [nickname, setNickname] = useState("");
  // 댓글 속성
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [newComment, setNewComment] = useState("");
  const params = useParams().boardId;
  const navigate = useNavigate();

  // 게시글 불러오기
  const showDetail = useCallback(async () => {
    // e.preventDefault();
    try {
      const res = await detailBoard(params);
      console.log(res);
      const { _id, title, content, author, createdAt, nickname } = res;
      setId(_id);
      setTitle(title);
      setContent(content);
      setAuthor(author);
      setCreatedAt(createdAt);
      setNickname(nickname);
      console.log(id);
    } catch (err) {
      console.error(err);
    }
  }, []);
  // 댓글 불러오기
  const showComment = useCallback(async () => {
    try {
      const res = await commentView(params);
      console.log(res);
      setComments(res);
    } catch (err) {
      console.error(err);
    }
  }, []);
  //댓글 삭제하기
  const deleteCommentBtn = useCallback(
    async (commentId) => {
      try {
        setCommentId(commentId);
        const res = await deleteComment({
          boardId: params,
          commentId: commentId,
        });
        showComment();
        // console.log('fid:', id);
      } catch (err) {
        console.error(err);
      }
    },
    [params, showComment]
  );

  const insertCommentBtn = useCallback(async () => {
    try {
      const res = await insertComment({
        boardId: params,
        content: newComment,
        user,
      });
      showComment();
    } catch (err) {
      console.error(err);
    }
  }, [params, showComment, newComment, user]);

  useEffect(() => {
    showDetail();
    showComment();
    deleteCommentBtn(commentId);
    insertCommentBtn({
      user, // 유저 정보
    });
  }, []);
  return (
    <div style={{ padding: "50px" }}>
      {user && user.nickname === nickname && (
        <Link to={`/board/${params}/edit`}>
          <Button>수정하기</Button>
        </Link>
      )}
      <Card
        // bg={variant.toLowerCase()}
        text={"Light".toLowerCase() === "light" ? "dark" : "white"}
        style={{ width: "100%", textAlign: "left" }}
        className="mb-2"
      >
        <Card.Header
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#DCEDF6",
          }}
        >
          <div style={{ flex: "1", fontSize: "40px" }}>{title}</div>
          <div style={{ flex: "1" }}>{nickname}</div>
          <div style={{ flex: "1", color: "rgba(0,0,0,.5)" }}>
            {createdAt.slice(0, 10)}
          </div>
        </Card.Header>
        <Card.Body style={{ textAlign: "left" }}>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
      <br />
      <h3 style={{ textAlign: "left" }}>댓글 쓰기({comments.length})</h3>
      <br />
      <form
        action=""
        style={{
          width: "100%",
          height: "4rem",
          display: "flex",
          gap: "1rem",
        }}
        onSubmit={insertCommentBtn}
      >
        <input
          placeholder="댓글을 입력하세요."
          type="text"
          style={{ flex: "4" }}
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
        />
        <Button
          type="submit"
          variant="dark"
          style={{
            flex: "1",
            backgroundColor: "#DCEDF6",
            border: "none",
            fontSize: "20px",
            color: "#000",
          }}
        >
          click
        </Button>
      </form>
      <br />
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment._id} style={{ marginBottom: "30px" }}>
              <Card style={{ width: "100%" }} className="mb-2">
                <Card.Header style={{ backgroundColor: "#DCEDF6" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{nickname}</div>
                    <div>{comment.createdAt.slice(0, 10)}</div>
                  </div>
                </Card.Header>
                <Card.Body style={{ textAlign: "left" }}>
                  {/* <Card.Text> 댓글:{comment._id} </Card.Text> */}
                  <Card.Text>
                    {comment.content}
                    <br />
                    <div
                      style={{ textAlign: "right", cursor: "pointer" }}
                      onClick={() => {
                        deleteCommentBtn(comment._id);
                      }}
                    >
                      삭제
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          style={{
            backgroundColor: "#DCEDF6",
            border: "none",
            fontWeight: "600",
          }}
          onClick={(e) => {
            navigate(-1);
          }}
        >
          {"<"} Back
        </Button>
        <Button
          style={{
            backgroundColor: "#DCEDF6",
            border: "none",
            fontWeight: "600",
          }}
          onClick={(e) => {
            navigate("/");
          }}
        >
          Front{">"}
        </Button>
      </div>
    </div>
  );
}
