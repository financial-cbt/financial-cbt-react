import React, { useState } from "react";
import styled from "styled-components";
import ArticleItem from "./ArticleItem";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const testArticles = [
    {
      title: "title",
      content: "content",
      photoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn5w6McxThQqAMfI9xhkDrxYhpjlyznJpBSPaTuL3ZNeRcSXZwzoowk2ILYiHrnG8-2Nk&usqp=CAU",
    },
  ];

  const newArticles = [];

  for (let i = 0; i < 10; i++) {
    testArticles.forEach((article) => {
      newArticles.push({
        articleId: i,
        title: article.title + i,
        content: article.content + i,
        photoUrl: article.photoUrl,
      });
    });
  }
  console.log(newArticles);
  return (
    <ArticleListContainer>
      {newArticles.map((newArticle) => (
        <ArticleItem newArticle={newArticle} key={newArticle.articleId} />
      ))}
    </ArticleListContainer>
  );
};
const ArticleListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default ArticleList;
