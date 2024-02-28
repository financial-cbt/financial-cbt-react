import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Desktop, Mobile } from "../../../MediaQuery/useMediaQuery";
import instance from "../../../lib/apis/base";
//기자, 시간, 사진
export default function ArticleDetailpage() {
  const navigate = useNavigate();
  const param = useParams();
  const articleId = param.articleId;
  const [articles, setArticles] = useState({
    body: "",
    date: "",
    photoUrl: "",
    reporter: "",
    title: "",
    word: [],
  });
  const fetchArticle = async () => {
    const baseUrl = `/article/${articleId}`;
    try {
      const response = await instance.get(baseUrl);
      return response.data[0];
    } catch (err) {
      // console.error(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchArticle();
        setArticles(data);
      } catch (err) {
        // console.error(err);
      }
    };
    fetchData();
  }, []);

  let { body, date, photoUrl, reporter, title, word } = articles;

  const addTooltip = (word, mean, idx) => {
    return (
      <>
        <Desktop>
          <span
            className={`my-anchor-element-class-${idx}`}
            key={idx}
            style={{
              fontWeight: "600",
              background:
                "linear-gradient(to top, #cdeeff 100%, transparent 5%)",
              cursor: "pointer",
              position: "relative",
              padding: 3,
              borderRadius: 10,
            }}
          >
            {word}
          </span>

          <Tooltip
            style={{
              zIndex: "9",
              backgroundColor: "#5078AD",
              fontWeight: "600",
            }}
            anchorSelect={`.my-anchor-element-class-${idx}`}
            content={mean}
            place="right-start"
          />
        </Desktop>
        <Mobile>
          <span
            className={`my-anchor-element-class-${idx}`}
            key={idx}
            style={{
              fontWeight: "600",
              background:
                "linear-gradient(to top, #cdeeff 100%, transparent 5%)",
              cursor: "pointer",
              position: "relative",
              padding: 3,
              borderRadius: 10,
            }}
          >
            {word}
          </span>

          <Tooltip
            style={{
              zIndex: "9",
              backgroundColor: "#5078AD",
              fontWeight: "600",
              height: "fit-context",
              width: "90vw",
            }}
            anchorSelect={`.my-anchor-element-class-${idx}`}
            content={mean}
            place="right-start"
          />
        </Mobile>
      </>
    );
  };
  // start부터 end까지의 텍스트를 추출
  const renderText = () => {
    const result = [];
    let cursor = 0;
    word.sort((a, b) => parseInt(a.start) - parseInt(b.start));
    for (let itemIdx in word) {
      const item = word[itemIdx];
      result.push(body.substring(cursor, item.start));

      const words = body.substring(item.start, item.end);
      result.push(addTooltip(words, item.commentary, itemIdx));
      cursor = item.end;
    }
    result.push(body.substring(cursor));
    return result;
  };
  const article = renderText().map((elem) => {
    return elem;
  });
  return (
    <>
      <Desktop>
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
                  backgroundColor: "#002DAB",
                  border: "none",
                  color: "white",
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
              marginTop: 10,
            }}
          >
            <div
              style={{
                minWidth: "50%",
                lineBreak: "anywhere",
                fontSize: "20px",
                lineHeight: "1.9",
              }}
            >
              <img
                src={photoUrl}
                alt="11"
                style={{
                  minWidth: "500px",
                  width: "500px",
                  float: "left",
                  margin: 20,
                }}
              />
              {renderText()}
            </div>
          </div>
        </ArticleContainer>
      </Desktop>
      <Mobile>
        <ArticleContainer>
          <DetailContainer>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "85vw",
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
                  backgroundColor: "#002DAB",
                  border: "none",
                  color: "white",
                }}
                variant="dark"
                onClick={() => navigate(-1)}
              >
                뒤로가기
              </Button>
            </div>
          </DetailContainer>
          <div
            style={{
              display: "flex",
              gap: "20px",
              maxWidth: "90vw",
              flexDirection: "column",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={photoUrl}
              alt="11"
              style={{
                width: "80vw",
                margin: 20,
              }}
            />
            <div
              style={{
                width: "85vw",
                lineBreak: "anywhere",
                fontSize: "20px",
                lineHeight: "1.9",
              }}
            >
              {renderText()}
            </div>
          </div>
        </ArticleContainer>
      </Mobile>
    </>
  );
}

const ArticleContainer = styled.div`
  flex-direction: "column";
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  margin: 0 auto;
  width: 1040px;

  box-sizing: content-box;

  @media (max-width: 500px) {
    width: 85vw;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
