import React from "react";
import { fetchBoard } from "../../lib/apis/board";
import BoardList from "../../components/BoardList";
import { Button } from "react-bootstrap";

export default function page() {
  return (
    <>
      <div style={{ width: "1200px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>BoardList</h1>
        <hr
          style={{
            border: "solid 4px blue",
            width: "15%",
            margin: "auto", // 가운데 정렬을 위해 margin: auto; 추가
          }}
        />
        <BoardList fetchBoard={fetchBoard} />
      </div>
    </>
  );
}
