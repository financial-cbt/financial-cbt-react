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
        <div
          style={{
            display: "flex",
            padding: " 0 20px 0 30px",
            marginTop: "50px",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "6.8", fontSize: "20px", fontWeight: "600" }}>
            제목
          </div>
          <div style={{ flex: "1.52", fontSize: "20px", fontWeight: "600" }}>
            작성자
          </div>
          <div
            style={{
              flex: "1.6",
              fontSize: "20px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>날짜</div>
            <Link to={"/board/write"}>
              <Button
                variant="light"
                style={{
                  height: "40px",
                  padding: "0",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                글 쓰기
              </Button>
            </Link>
          </div>
        </div>
        {boards.slice(0).reverse().map((board) => (
          <BoardItem board={board} key={board._id} />
        ))}
      </Container>
    </div>
  );
}
