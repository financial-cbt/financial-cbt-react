import React, { useState } from "react";
import styled from "styled-components";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  // 아직 서버 연결 안해서 임시로 테스트해봤어요!!
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
        _id: i,
        title: article.title + i,
        content: article.content + i,
        photoUrl: article.photoUrl,
      });
    });
  }

  console.log(newArticles);

  return (
    <Container>
      <div className="row">
        {newArticles?.map((article) => (
          <div key={article._id} className="col-lg-3 col-md-6 col-12 mb-4">
            <div className="card h-100" style={{ width: "100%" }}>
              <p className="card-title">{article.title}</p>
              <img
                src={article.photoUrl}
                className="card-img-top"
                alt={article.title}
                style={{ padding: 30 }}
              />
              <div className="card-body">
                <p className="card-text">{article.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ArticleList;

const Container = styled.div`
  margin: 90px;
`;
