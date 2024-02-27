import React, { useCallback, useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  detailBoard,
  commentView,
  deleteComment,
  insertComment,
  deleteBoard,
} from "../../../lib/apis/board";
import Card from "react-bootstrap/Card";
import useAuth from "../../../lib/hooks/useAuth";
import user_blue from "../../../imgs/user_blue.png";

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
  }, [params]);
  // 댓글 불러오기
  const showComment = useCallback(async () => {
    try {
      const res = await commentView(params);
      console.log(res);
      setComments(res); // 기존 상태를 유지하면서 새로운 배열을 생성하여 업데이트
    } catch (err) {
      console.error(err);
    }
  }, [params, setComments]);
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
    [params, comments]
  );
  // 게시글 삭제
  const deleteBoardBtn = useCallback(async () => {
    console.log(22);
    try {
      const res = await deleteBoard(params);
    } catch (err) {
      console.error(err);
    }
  }, [params]);
  const insertCommentBtn = useCallback(async () => {
    try {
      const res = await insertComment({
        boardId: params,
        content: newComment,
        author: user._id,
        nickname: user.nickname,
      });
      showComment();
    } catch (err) {
      console.error(err);
    }
  }, [params, showComment, newComment, user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setNewComment("");
    await insertCommentBtn();
  };

  useEffect(() => {
    showDetail();
  }, [showDetail]);

  useEffect(() => {
    showComment();
  }, [showComment, params]);
  return (
    <div style={{ padding: "50px" }}>
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
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              position: "relative",
              margin: "0 10px",
            }}
          >
            <img
              src={user_blue}
              alt="user"
              style={{ width: "35px", height: "35px" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{}}>{nickname}</div>
              <div style={{ color: "rgba(0,0,0,.5)" }}>
                {createdAt.slice(0, 10)}
              </div>
            </div>
            {user && user.nickname === nickname && (
              <Link
                to={`/board/${params}/edit`}
                style={{ position: "absolute", right: "90px" }}
              >
                <Button>수정하기</Button>
              </Link>
            )}
            {user && user.nickname === nickname && (
              <Link to={"/board"} style={{ position: "absolute", right: "0" }}>
                <Button onClick={deleteBoardBtn}>삭제하기</Button>
              </Link>
            )}
          </div>

          <div style={{ flex: "1", fontSize: "40px" }}>{title}</div>
        </Card.Header>
        <Card.Body style={{ textAlign: "left" }}>
          <Card.Text style={{ margin: "0 10px" }}>{content}</Card.Text>
        </Card.Body>
      </Card>
      <br />

      <h3 style={{ textAlign: "left", margin: "5px 10px" }}>
        댓글 쓰기({comments.length})
      </h3>

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
                      margin: "0 10px",
                    }}
                  >
                    <div>{comment.nickname}</div>
                    <div>
                      {comment.createdAt.slice(5, 7)}
                      {"월"}
                      {comment.createdAt.slice(8, 10)}
                      {"일"}&ensp;
                      {comment.createdAt.slice(11, 13)}
                      {"시"}
                      {comment.createdAt.slice(14, 16)}
                      {"분"}
                    </div>
                  </div>
                </Card.Header>
                <Card.Body style={{ textAlign: "left", margin: "0 10px" }}>
                  {/* <Card.Text> 댓글:{comment._id} </Card.Text> */}
                  <Card.Text>
                    {comment.content}
                    <br />
                    {user && user.nickname === comment.nickname && (
                      <div
                        style={{ textAlign: "right", cursor: "pointer" }}
                        onClick={() => {
                          deleteCommentBtn(comment._id);
                        }}
                      >
                        삭제
                      </div>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
      <form
        action=""
        style={{
          width: "100%",
          height: "4rem",
          display: "flex",
          gap: "1rem",
        }}
        onSubmit={onSubmit}
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          style={{
            backgroundColor: "#DCEDF6",
            border: "none",
            fontWeight: "600",
          }}
          onClick={(e) => {
            navigate("/board");
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
          Home{">"}
        </Button>
      </div>
    </div>
  );
}
