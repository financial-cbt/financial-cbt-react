import React, { useCallback, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  detailBoard,
  commentView,
  deleteComment,
  insertComment,
  deleteBoard,
  updateComment,
} from "../../../lib/apis/board";
import Card from "react-bootstrap/Card";
import useAuth from "../../../lib/hooks/useAuth";
import user_blue from "../../../imgs/user_blue.png";
import { Desktop, Mobile } from "../../../MediaQuery/useMediaQuery";

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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const params = useParams().boardId;
  const navigate = useNavigate();

  // 게시글 불러오기
  const showDetail = useCallback(async () => {
    try {
      const res = await detailBoard(params);
      const { _id, title, content, author, createdAt, nickname } = res;
      setId(_id);
      setTitle(title);
      setContent(content);
      setAuthor(author);
      setCreatedAt(createdAt);
      setNickname(nickname);
    } catch (err) {
      // console.error(err);
    }
  }, [params]);
  // 댓글 불러오기
  const showComment = useCallback(async () => {
    try {
      const res = await commentView(params);
      setComments(res);
    } catch (err) {
      // console.error(err);
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
      } catch (err) {
        // console.error(err);
      }
    },
    [params, comments]
  );
  const editComment = useCallback((commentId, content) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(content);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingCommentId(null);
    setEditingCommentContent("");
  }, []);
  // 댓글 수정하기
  const updateCommentBtn = useCallback(async () => {
    try {
      await updateComment({
        boardId: params,
        commentId: editingCommentId,
        content: editingCommentContent,
      });

      setEditingCommentId(null);
      setEditingCommentContent("");

      showComment();
    } catch (error) {
      // console.error(error);
    }
  }, [params, editingCommentId, editingCommentContent]);
  // 게시글 삭제
  const deleteBoardBtn = useCallback(async () => {
    try {
      const res = await deleteBoard(params);
    } catch (err) {
      // console.error(err);
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
      // console.error(err);
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
    <>
      <Desktop>
        <div style={{ padding: "50px" }}>
          <Card
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
                    <Button
                      style={{
                        backgroundColor: "#92E1FB",
                        border: "1px solid #92E1FB",
                      }}
                    >
                      수정하기
                    </Button>
                  </Link>
                )}
                {user && user.nickname === nickname && (
                  <Link
                    to={"/board"}
                    style={{
                      position: "absolute",
                      right: "0",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#92E1FB",
                        border: "1px solid #92E1FB",
                      }}
                      onClick={deleteBoardBtn}
                    >
                      삭제하기
                    </Button>
                  </Link>
                )}
              </div>

              <div style={{ flex: "1", fontSize: "30px", padding: "15px" }}>
                {title}
              </div>
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
                    <Card.Header style={{ backgroundColor: "#EBF0F7" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "0 10px",
                        }}
                      >
                        <div>{comment.nickname}</div>
                        {comment.updatedAt ? (
                          <div>
                            {comment.updatedAt.slice(5, 7)}
                            {"월"}
                            {comment.updatedAt.slice(8, 10)}
                            {"일"}&ensp;
                            {comment.updatedAt.slice(11, 13)}
                            {"시"}
                            {comment.updatedAt.slice(14, 16)}
                            {"분"}
                          </div>
                        ) : (
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
                        )}
                      </div>
                    </Card.Header>
                    <Card.Body style={{ textAlign: "left", margin: "0 10px" }}>
                      <Card.Text>
                        {editingCommentId === comment._id ? (
                          // 수정 중인 댓글 표시
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              position: "relative",
                              gap: "5px",
                            }}
                          >
                            <textarea
                              style={{ width: "100%", resize: "none" }}
                              value={editingCommentContent}
                              onChange={(e) =>
                                setEditingCommentContent(e.target.value)
                              }
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <button
                                style={{
                                  backgroundColor: "#fff",
                                  border: "none",
                                }}
                                onClick={updateCommentBtn}
                              >
                                저장
                              </button>
                              <button
                                style={{
                                  backgroundColor: "#fff",
                                  border: "none",
                                }}
                                onClick={cancelEdit}
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {comment.content}
                            <br />
                            {user && user.nickname === comment.nickname && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <div
                                  style={{
                                    textAlign: "right",
                                    cursor: "pointer",
                                    marginRight: "10px",
                                  }}
                                  onClick={() => deleteCommentBtn(comment._id)}
                                >
                                  삭제
                                </div>
                                <div
                                  style={{
                                    textAlign: "right",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    editComment(comment._id, comment.content)
                                  }
                                >
                                  수정
                                </div>
                              </div>
                            )}
                          </>
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
                backgroundColor: "#92E1FB",
                border: "none",
                fontSize: "20px",
                color: "#fff",
              }}
            >
              Click
            </Button>
          </form>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              style={{
                backgroundColor: "#92E1FB",
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
                backgroundColor: "#92E1FB",
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
      </Desktop>
      <Mobile>
        <div
          style={{
            padding: "50px",
          }}
        >
          <div
            style={{
              margin: "0px auto 20px auto",
            }}
          >
            {user && user.nickname === nickname && (
              <Link to={`/board/${params}/edit`} style={{}}>
                <Button
                  style={{
                    backgroundColor: "#92E1FB",
                    border: "1px solid #92E1FB",
                    marginRight: "10px",
                  }}
                >
                  수정하기
                </Button>
              </Link>
            )}
            {user && user.nickname === nickname && (
              <Link to={"/board"} style={{}}>
                <Button
                  style={{
                    backgroundColor: "#92E1FB",
                    border: "1px solid #92E1FB",
                  }}
                  onClick={deleteBoardBtn}
                >
                  삭제하기
                </Button>
              </Link>
            )}
          </div>
          <Card
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
              </div>

              <div style={{ flex: "1", fontSize: "20px", padding: "15px" }}>
                {title}
              </div>
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
                    <Card.Header style={{ backgroundColor: "#EBF0F7" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "0 10px",
                        }}
                      >
                        <div>{comment.nickname}</div>
                        {comment.updatedAt ? (
                          <div>
                            {comment.updatedAt.slice(5, 7)}
                            {"월"}
                            {comment.updatedAt.slice(8, 10)}
                            {"일"}&ensp;
                            {comment.updatedAt.slice(11, 13)}
                            {"시"}
                            {comment.updatedAt.slice(14, 16)}
                            {"분"}
                          </div>
                        ) : (
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
                        )}
                      </div>
                    </Card.Header>
                    <Card.Body style={{ textAlign: "left", margin: "0 10px" }}>
                      <Card.Text>
                        {editingCommentId === comment._id ? (
                          // 수정 중인 댓글 표시
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              position: "relative",
                              gap: "5px",
                            }}
                          >
                            <textarea
                              style={{ width: "100%" }}
                              value={editingCommentContent}
                              onChange={(e) =>
                                setEditingCommentContent(e.target.value)
                              }
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <button
                                style={{
                                  backgroundColor: "#fff",
                                  border: "none",
                                }}
                                onClick={updateCommentBtn}
                              >
                                저장
                              </button>
                              <button
                                style={{
                                  backgroundColor: "#fff",
                                  border: "none",
                                }}
                                onClick={cancelEdit}
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {comment.content}
                            <br />
                            {user && user.nickname === comment.nickname && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <div
                                  style={{
                                    textAlign: "right",
                                    cursor: "pointer",
                                    marginRight: "10px",
                                  }}
                                  onClick={() => deleteCommentBtn(comment._id)}
                                >
                                  삭제
                                </div>
                                <div
                                  style={{
                                    textAlign: "right",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    editComment(comment._id, comment.content)
                                  }
                                >
                                  수정
                                </div>
                              </div>
                            )}
                          </>
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
              style={{ width: "80%" }}
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            />
            <Button
              type="submit"
              variant="dark"
              style={{
                width: "20%",
                backgroundColor: "#92E1FB",
                border: "none",
                fontSize: "15px",
                color: "#fff",
              }}
            >
              등록
            </Button>
          </form>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              style={{
                backgroundColor: "#92E1FB",
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
                backgroundColor: "#92E1FB",
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
      </Mobile>
    </>
  );
}
