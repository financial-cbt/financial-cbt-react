import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "react-bootstrap";
import { CaretLeftFill, ArrowLeft } from "react-bootstrap-icons";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//기자, 시간, 사진
export default function ArticleDetailpage() {
  const navigate = useNavigate();
  const param = useParams();
  console.log(param);
  const articleId = param.articleId;
  const [articles, setArticles] = useState({
    body: "",
    date: "",
    photoUrl: "",
    reporter: "",
    title: "",
    word: [],
  });
  console.log(1);
  const fetchArticle = async () => {
    console.log(111);
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/article/${articleId}`
      );
      console.log(response.data);
      return response.data[0];
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchArticle();
        console.log(data);
        console.log("AB");
        setArticles(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  let { body, date, photoUrl, reporter, title, word } = articles;
  // const newWord = word.sort((a, b) => a.start - b.start);

  const addTooltip = (word, mean, idx) => {
    return (
      <>
        <span
          className={`my-anchor-element-class-${idx}`}
          key={idx}
          style={{
            fontWeight: "600",
            background: "linear-gradient(to top, #92e1fb 100%, transparent 5%)",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {word}
        </span>
        {/* &nbsp; */}
        <Tooltip
          style={{
            zIndex: "9",
            backgroundColor: "#002DAB",
            fontWeight: "600",
          }}
          anchorSelect={`.my-anchor-element-class-${idx}`}
          content={mean}
          place="right-start"
        />
      </>
    );
  };
  // start부터 end까지의 텍스트를 추출
  const renderText = () => {
    const result = [];
    let cursor = 0;
    word.sort((a, b) => parseInt(a.start) - parseInt(b.start));
    // word.sort((a, b) => a.start - b.start);
    for (let itemIdx in word) {
      const item = word[itemIdx];
      result.push(body.substring(cursor, item.start));

      const words = body.substring(item.start, item.end);
      result.push(addTooltip(words, item.commentary, itemIdx));
      cursor = item.end;
    }
    result.push(body.substring(cursor));
    // console.log(result);
    return result;
  };
  const article = renderText().map((elem) => {
    return elem;
  });
  return (
    <ArticleContainer>
      <DetailContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h6 style={{ marginRight: "10px", marginBottom: "0px" }}>
              {reporter}
            </h6>
            <h6 style={{ marginBottom: "0px", color: "rgba(0,0,0,.5)" }}>
              {date.slice(0, 10)}
            </h6>
          </div>

          <Button
            style={{
              marginRight: "10px",
              backgroundColor: "#92e1fb",
              border: "none",
            }}
            variant="dark"
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </Button>
        </div>

        <hr />
      </DetailContainer>
      <div
        style={{
          display: "flex",
          gap: "20px",
          maxWidth: "100%",
          flexDirection: "column",
        }}
      >
        <div style={{ maxWidth: "50%" }}>
          <img src={photoUrl} alt="11" style={{ minWidth: "500px" }} />
        </div>
        <div
          style={{
            minWidth: "50%",
            lineBreak: "anywhere",
            fontSize: "20px",
            lineHeight: "1.7",
          }}
        >
          {renderText()}
        </div>
      </div>
    </ArticleContainer>
  );
}

const ArticleContainer = styled.div`
  flex-direction: "column";
  align-items: center;
  justify-content: center;
  /* padding: 50px 200px; */
  padding: 50px 20px;
  margin: 0 auto;
  /* max-width: 100%; */
  width: 1040px;

  box-sizing: content-box;
`;

const StyledParagraph = styled.p`
  font-weight: 400;
  margin: 0;
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
