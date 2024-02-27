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
  margin: 40px;
`;

const ArticleItem = ({ newArticle }) => {
  const { num, title, body, photoUrl } = newArticle;

  return (
    <Container>
      <CardLink to={`${num}`}>
        <div
          className="card"
          style={{
            width: "400px",
            height: "430px",
            gap: "20px",
            alignItems: "center",
            // border: "2px solid rgba(0, 0, 0, 0.175)",
          }}
        >
          <img
            src={photoUrl}
            className="card-img-top"
            alt={title}
            style={{ height: "300px", padding: 20 }}
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
              height: "23px",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                textAlign: "left",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {body}
            </p>
          </div>
        </div>
      </CardLink>
    </Container>
  );
};

export default ArticleItem;
