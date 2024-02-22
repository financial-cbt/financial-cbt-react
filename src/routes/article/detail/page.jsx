import React from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "react-bootstrap";
import { CaretLeftFill, ArrowLeft } from "react-bootstrap-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
//기자, 시간, 사진
export default function ArticleDetailpage() {
  const navigate = useNavigate();
  const wordIndex = [
    {
      start: 0,
      end: 1,
      mean: "뜻 1",
    },
    {
      start: 12,
      end: 13,
      mean: "뜻 2",
    },
    {
      start: 40,
      end: 43,
      mean: "뜻 3",
    },
  ];

  const articleText =
    "인공을 가하여 제작한 시설물 중에서 건축물을 제외한 것을 공작물이라 하는데, 건축물은 토지에 정착하는 공작물 중 지붕과 기둥 또는 벽이 있는 것과 이에 딸린 시설물, 지하나 고가의 공작물에 설치하는 사무소·공연장·점포·차고·창고 등을 말한다. 따라서 기념탑, 광고탑, 광고판, 전기통신용 철탑, 고가수조, 옹벽, 담장, 지하대피호, 기계식주차장 등이 공작물에 해당한다. 이 같은 공작물 중에서 영구적이 아니라 일시적으로 설치한 것이 가설공작물이다. 특허청은 이차전지 분야 전문임기제 특허심사관 38명을 채용한다고 21일 밝혔다.지난해 반도체 심사관 67명 채용에 이은 국가첨단전략산업 경쟁력 강화방안의 일환이다. 이차전지는 반도체와 함께 우리나라의 양대 안보·전략자산으로 우리 기업의 핵심 기술보호를 위한 특허출원이 급증하고 있으나 특허심사관 부족으로 심사처리가 지연되고 있는 실정이다.실제로 이차전지 분야 특허출원 건수는 2018년 8940건에서 연평균 증가율 11.9%를 보이며 지난해 1만5720건으로 급증했다. 이에 따라 특허청은 지난해 하반기부터 이차전지 분야 심사관 증원을 위한 관계부처 협의에 착수해 행안부, 기재부와 협의를 마쳐 이번에 심사관 채용을 진행하게 됐다. 특히 지난 19일부터는 이차전지 분야를 우선심사대상으로 추가해 22개월 가량 걸리던 심사기간을 약 2개월로 대폭 줄이기로 했다. adndjqwkdnkjwqdkjqwdkjqwjkdnqwkjdnjqndkjqwndjqnwjdknqwjdnqwjkdnjkqwndjkqwndjqndjnqkjdqnkjdnqkjdnqwkjdnqjkdnqkjdnkqjdnjqdnqjdnqdnjqkdnqjkdnjkadndjqwkdnkjwqdkjqwdkjqwjkdnqwkjdnjqndkjqwndjqnwjdknqwjdnqwjkdnjkqwndjkqwndjqndjnqkjdqnkjdnqkjdnqwkjdnqjkdnqkjdnkqjdnjqdnqjdnqdnjqkdnqjkdnjkadndjqwkdnkjwqdkjqwdkjqwjkdnqwkjdnjqndkjqwndjqnwjdknqwjdnqwjkdnjkqwndjkqwndjqndjnqkjdqnkjdnqkjdnqwkjdnqjkdnqkjdnkqjdnjqdnqjdnqdnjqkdnqjkdnjkadndjqwkdnkjwqdkjqwdkjqwjkdnqwkjdnjqndkjqwndjqnwjdknqwjdnqwjkdnjkqwndjkqwndjqndjnqkjdqnkjdnqkjdnqwkjdnqjkdnqkjdnkqjdnjqdnqjdnqdnjqkdnqjkdnjkadndjqwkdnkjwqdkjqwdkjqwjkdnqwkjdnjqndkjqwndjqnwjdknqwjdnqwjkdnjkqwndjkqwndjqndjnqkjdqnkjdnqkjdnqwkjdnqjkdnqkjdnkqjdnjqdnqjdnqdnjqkdnqjkdnjkadndjqwkdnkjwqdkjqwdkjqwjkdnqwkjdnjqndkjqwndjqnwjdknqwjdnqwjkdnjkqwndjkqwndjqndjnqkjdqnkjdnqkjdnqwkjdnqjkdnqkjdnkqjdnjqdnqjdnqdnjqkdnqjkdnjkadndjqwkdnkjwqdkjqwdkjqwjkdnqwkjdnjqndkjqwndjqnwjdknqwjdnqwjkdnjkqwndjkqwndjqndjnqkjdqnkjdnqkjdnqwkjdnqjkdnqkjdnkqjdnjqdnqjdnqdnjqkdnqjkdnjk";
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
            backgroundColor: "#92e1fb",
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
    for (let itemIdx in wordIndex) {
      const item = wordIndex[itemIdx];
      result.push(articleText.substring(cursor, item.start - 1));

      const word = articleText.substring(item.start, item.end + 1);
      result.push(addTooltip(word, item.mean, itemIdx));
      cursor = item.end + 1;
    }
    result.push(articleText.substring(cursor));
    // console.log(result);
    return result;
  };
  const article = renderText().map((elem) => {
    return elem;
  });
  return (
    <ArticleContainer>
      <DetailContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
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
          <h6 style={{ marginBottom: "0px" }}>2024년 2월 22일</h6>
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
          <img
            src="https://img.hankyung.com/photo/202402/AKR20240208062851009_01_i_P4.jpg"
            alt="11"
          />
        </div>
        <div style={{ minWidth: "50%", lineBreak: "anywhere" }}>
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
  margin: auto;
  /* max-width: 100%; */
  width: 1140px;

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
