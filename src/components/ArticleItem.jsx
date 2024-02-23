import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const CardLink = styled(Link)`
  text-decoration: none;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s ease-in-out;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 40px 40px 0 40px;
`;

const ArticleItem = ({ newArticle }) => {
  const { articleId, title, content, photoUrl } = newArticle;

  return (
    <Container>
      <CardLink to={`${articleId}`}>
        <div
          className="card"
          style={{
            width: "400px",
            height: "450px",
            gap: "30px",
            alignItems: "center",
            // border: "2px solid rgba(0, 0, 0, 0.175)",
          }}
        >
          <img
            src={photoUrl}
            className="card-img-top"
            alt={title}
            style={{ height: "300px" }}
          />
          <p
            style={{
              fontSize: "20px",
              width: "90%",
              height: "30px",
              overflow: "hidden",
              fontWeight: "600",
            }}
            className="card-title"
          >
            {title}
          </p>
          <div
            style={{
              width: "90%",
              padding: "0",
              height: "23px",
              overflow: "hidden",
            }}
          >
            <p style={{ fontSize: "15px", textAlign: "left" }}>{content}</p>
          </div>
        </div>
      </CardLink>
    </Container>
  );
};

export default ArticleItem;
