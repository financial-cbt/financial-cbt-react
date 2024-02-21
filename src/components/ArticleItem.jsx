import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function ArticleItem({ newArticle }) {
  const { articleId, title, content, photoUrl } = newArticle;
  return (
    <Container>
      {/* <div className="row"> */}
      <div>
        <Link to={`${articleId}`}>
          <div className="card h-100" style={{ width: "100%" }}>
            <p className="card-title">{title}</p>
            <img
              src={photoUrl}
              className="card-img-top"
              alt={title}
              style={{ padding: 30 }}
            />
            <div className="card-body">
              <p className="card-text">{content}</p>
            </div>
          </div>
        </Link>
      </div>
      {/* </div> */}
    </Container>
  );
}

const Container = styled.div`
  flex: 0 0 33%; /* flex-basis를 100%로 설정 */
  min-width: 33%; /* 최대 너비도 100%로 설정 */
  box-sizing: border-box;
  flex-wrap: wrap;
  margin: 0;
  padding: 30px; /* 각 열 사이의 간격을 위해 padding 추가 */
`;

