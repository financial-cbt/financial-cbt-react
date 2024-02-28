import React from "react";
import { fetchBoard } from "../../lib/apis/board";
import BoardList from "../../components/BoardList";
import { Desktop, Mobile } from "../../MediaQuery/useMediaQuery";

export default function page() {
  return (
    <>
      <Desktop>
        <div style={{ width: "1200px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center" }}>질문해봐요</h1>
          <hr
            style={{
              border: "solid 4px blue",
              width: "15%",
              margin: "auto",
            }}
          />
          <BoardList fetchBoard={fetchBoard} />
        </div>
      </Desktop>
      <Mobile>
        <div style={{ width: "90vw", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center" }}>질문해봐요</h1>
          <hr
            style={{
              border: "solid 4px blue",
              width: "15%",
              margin: "auto",
            }}
          />
          <BoardList fetchBoard={fetchBoard} />
        </div>
      </Mobile>
    </>
  );
}
