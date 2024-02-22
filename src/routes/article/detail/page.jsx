import React from "react";
import { Tooltip } from "react-tooltip";

export default function ArticleDetailpage() {
  const wordIndex = [
    {
      start: 1,
      mean: "뜻 1",
    },
    {
      start: 5,
      mean: "뜻 211111111",
    },
  ];

  const articleText =
    "인공을 가하여 제작한 시설물 중에서 건축물을 제외한 것을 공작물이라 하는데, 건축물은 토지에 정착하는 공작물 중 지붕과 기둥 또는 벽이 있는 것과 이에 딸린 시설물, 지하나 고가의 공작물에 설치하는 사무소·공연장·점포·차고·창고 등을 말한다. 따라서 기념탑, 광고탑, 광고판, 전기통신용 철탑, 고가수조, 옹벽, 담장, 지하대피호, 기계식주차장 등이 공작물에 해당한다. 이 같은 공작물 중에서 영구적이 아니라 일시적으로 설치한 것이 가설공작물이다.";

  // start부터 end까지의 텍스트를 추출
  const highlightedText = articleText.split(" ").map((word, index) => {
    const wordInfo = wordIndex.find((info) => index === info.start);

    return wordInfo ? (
      <>
        <span
          className={`my-anchor-element-class-${index}`}
          key={index}
          style={{
            background: "linear-gradient(to top, #000 5%, transparent 5%)",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {word}&nbsp;
        </span>
        <Tooltip
          style={{ backgroundColor: "#5078AD" }}
          anchorSelect={`.my-anchor-element-class-${index}`}
          content={wordInfo.mean}
          place="right-start"
        />
      </>
    ) : (
      <span key={index}>{word}&nbsp;</span>
    );
  });

  return (
    <div>
      <p>{highlightedText}</p>
    </div>
  );
}
