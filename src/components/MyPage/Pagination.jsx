import React, { useState } from "react";
import styled from "styled-components";

const ButtonWrap = styled.div`
  margin: 60px auto;
`;
const Button = styled.button`
  color: black;
  margin: 5px;
  border: none;
  background: none;
  cursor: pointer;
  opacity: 0.8;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &.activeButton {
    border: none;
    color: black;
    font-weight: 900;
    opacity: 1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const Pagination = ({ totalPosts, limit, page, setPage }) => {
  const numPages = Math.ceil(totalPosts / limit);
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;

  return (
    <ButtonWrap>
      <Button
        onClick={() => {
          const newPage = Math.max(1, page - 5);
          setPage(newPage);
          setCurrPage(newPage);
        }}
        disabled={page === 1}
      >
        &lt;
      </Button>
      <Button
        onClick={() => setPage(firstNum)}
        aria-current={page === firstNum ? "page" : null}
        className={page === firstNum ? "activeButton" : ""}
      >
        {firstNum}
      </Button>
      {Array(4)
        .fill()
        .map((_, i) => {
          const pageNum = firstNum + i + 1;
          if (pageNum <= numPages) {
            return (
              <Button
                key={pageNum}
                onClick={() => {
                  setPage(pageNum);
                }}
                className={page === pageNum ? "activeButton" : ""}
                aria-current={page === pageNum ? "page" : null}
              >
                {pageNum}
              </Button>
            );
          } else {
            return null;
          }
        })}
      <Button
        onClick={() => {
          const newPage = Math.min(numPages, page + 5);
          setPage(newPage);
          setCurrPage(newPage);
        }}
        disabled={page === numPages}
      >
        &gt;
      </Button>
    </ButtonWrap>
  );
};

export default Pagination;
