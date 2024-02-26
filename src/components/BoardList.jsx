import React, { useState, useEffect } from "react";
import BoardItem from "./BoardItem";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function BoardList({ fetchBoard }) {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBoard();
        console.log(data);
        setBoards(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchBoard]);

  return (
    <div>
      <Container>
        <Link to={"/board/write"}>
          <Button>작성하기</Button>
        </Link>

        <div
          style={{
            display: "flex",
            padding: " 0 20px 0 30px",
            marginTop: "50px",
            marginBottom: "20px",
          }}
        >
          <div style={{ flex: "7" }}>제목</div>
          <div style={{ flex: "1.5" }}>작성자</div>
          <div style={{ flex: "1.5" }}>날짜</div>
        </div>
        {boards.map((board) => (
          <BoardItem board={board} key={board._id} />
        ))}
      </Container>
    </div>
  );
}
