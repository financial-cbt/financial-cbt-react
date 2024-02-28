import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArticleItem from "./ArticleItem";
import instance from "../lib/apis/base";

const ArticleList = () => {
  const [newArticles, setNewArticles] = useState([]);

  const fetchArticles = async () => {
    const baseUrl = "/article";
    try {
      const res = await instance.get(baseUrl);
      setNewArticles(res.data);
    } catch (err) {
      // console.error(err);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, [setNewArticles]);

  return (
    <div style={{ margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>기사를 통해 공부해요</h1>
      <hr
        style={{
          border: "solid 4px blue",
          width: "20%",
          margin: "auto",
        }}
      />

      <ArticleListContainer>
        {newArticles.map((newArticle) => (
          <ArticleItem newArticle={newArticle} key={newArticle.num} />
        ))}
      </ArticleListContainer>
    </div>
  );
};
const ArticleListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 980px) {
    justify-content: center;
  }
`;

export default ArticleList;
