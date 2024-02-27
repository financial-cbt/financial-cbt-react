import React from "react";
import * as S from "./styles";
// import { GlobalStyle } from "../../fonts/fonts";
import user_green from "../imgs/user_green.png";
import user_blue from "../imgs/user_blue.png";
import useScrollFadeIn from "../hooks/useScrollFadeIn";

const ProjectTarget = () => {
  const title = useScrollFadeIn("up", 1, 0);
  const newflow_Q = useScrollFadeIn("up", 1, 0);
  const newflow_A = useScrollFadeIn("up", 1, 0);
  const bitcoin_Q = useScrollFadeIn("up", 1, 0);
  const bitcoin_A1 = useScrollFadeIn("up", 1, 0);
  const bitcoin_A2 = useScrollFadeIn("up", 1, 0);
  const CTI_Q = useScrollFadeIn("up", 1, 0);
  const CTI_A1 = useScrollFadeIn("up", 1, 0);
  const CTI_A2 = useScrollFadeIn("up", 1, 0);
  const mypage_Q = useScrollFadeIn("up", 1, 0);
  const mypage_A1 = useScrollFadeIn("up", 1, 0);
  const mypage_A2 = useScrollFadeIn("up", 1, 0);

  return (
    <S.TargetContainer>
      <S.CommonTitle {...title}>
        <span style={{ color: "#69e4d3", fontSize: "39px" }}>우리는 </span>
        이런 서비스를 제공해요
      </S.CommonTitle>
      <S.BubbleContainer content="question" {...newflow_Q}>
        <S.profileImg src={user_green} />
        <S.speechBubble direction="left">
          {"1. 경제·금융·상식 퀴즈 제공"}
        </S.speechBubble>
      </S.BubbleContainer>
      <S.BubbleContainer content="answer">
        <S.bubbleBox {...newflow_A}>
          <S.speechBubble direction="right">
            {"✔️ 현재 트렌드에 맞는 다양한 상식 퀴즈를 풀 수 있어요!"}
          </S.speechBubble>
        </S.bubbleBox>
      </S.BubbleContainer>
      <S.BubbleContainer content="question" {...bitcoin_Q}>
        <S.profileImg src={user_green} />
        <S.speechBubble direction="left">
          {"2. 기사 페이지 제시 후 어려운 키워드 해설 제공"}
        </S.speechBubble>
      </S.BubbleContainer>
      <S.BubbleContainer content="answer">
        <S.bubbleBox {...bitcoin_A1}>
          <S.speechBubble direction="right">
            {"✔️ 경제, 금융 등 다양한 분야에 대한 기사를 제공해요!"}
          </S.speechBubble>
        </S.bubbleBox>
        <S.bubbleBox {...bitcoin_A2}>
          <S.speechBubble direction="right">
            {
              "✔️ 기사 내용 중 어려운 단어들은 Tooltip을 통해 뜻을 확인할 수 있어요!"
            }
          </S.speechBubble>
        </S.bubbleBox>
      </S.BubbleContainer>
      <S.BubbleContainer content="question" {...CTI_Q}>
        <S.profileImg src={user_green} />
        <S.speechBubble direction="left">{"3. 게시판 기능"}</S.speechBubble>
      </S.BubbleContainer>
      <S.BubbleContainer content="answer">
        <S.bubbleBox {...CTI_A1}>
          <S.speechBubble direction="right">
            {
              "✔️ 게시판에서 모르는 문제에 대해서 다른 사람들과 소통할 수 있어요!"
            }
          </S.speechBubble>
        </S.bubbleBox>
      </S.BubbleContainer>
      <S.BubbleContainer content="question" {...mypage_Q}>
        <S.profileImg src={user_green} />
        <S.speechBubble direction="left">
          {"4. 마이페이지에서 성적표 확인"}
        </S.speechBubble>
      </S.BubbleContainer>
      <S.BubbleContainer content="answer">
        <S.bubbleBox {...mypage_A1}>
          <S.speechBubble direction="right">
            {
              "✔️ 마이페이지 내부에서 날짜별로 성적표를 확인하고 취약한 점을 파악해요"
            }
          </S.speechBubble>
        </S.bubbleBox>
        <S.bubbleBox {...mypage_A2}>
          <S.speechBubble direction="right">
            {"✔️ 맞은 문제와 틀린 문제를 체크 수 있어서 오답 정리에 유용해요!"}
          </S.speechBubble>
        </S.bubbleBox>
      </S.BubbleContainer>
    </S.TargetContainer>
  );
};
const ProjectIntro = () => {
  const title = useScrollFadeIn("up", 1, 0);
  const questionItem = useScrollFadeIn("up", 1, 0);
  const answerItemStart = useScrollFadeIn("up", 1, 0);
  const answerItemMid = useScrollFadeIn("up", 1, 0);

  return (
    <S.InfoContainer>
      <S.CommonTitle {...title}>
        <span style={{ color: "#69e4d3", fontSize: "39px" }}>8조 </span>
        어떤 프로젝트를 만들었을까?
      </S.CommonTitle>
      <S.BubbleContainer content="question" {...questionItem}>
        <S.profileImg src={user_blue} />
        <S.speechBubble direction="left">
          {"어떤 프로젝트인지 궁금해요 🤔"}
        </S.speechBubble>
      </S.BubbleContainer>
      <S.BubbleContainer content="answer">
        <S.bubbleBox {...answerItemStart}>
          <S.speechBubble direction="right">
            {
              "저희 8조는 다양한 경제, 금융 상식들을 유저에게 제공하려는 목적을 가지고 있어요.\n 많은 사이트에서 양질의 정보를 분석 후 유저의 지식적 향상에 도움을 줄 수 있는 프로젝트입니다."
            }
          </S.speechBubble>
        </S.bubbleBox>
        <S.bubbleBox {...answerItemMid}>
          <S.speechBubble direction="right">
            {
              "더불어 경제, 금융 분야뿐만 아니라 더 많은 분야의 퀴즈가 업데이트될 예정이니 많은 관심 부탁드립니다!😀"
            }
          </S.speechBubble>
        </S.bubbleBox>
      </S.BubbleContainer>
    </S.InfoContainer>
  );
};

function mainPage() {
  return (
    <S.BodyContainer>
      <S.MainContainer>
        <S.titleContainer>
          <S.subTitle>{`신한투자증권 프로디지털 아카데미 미니프로젝트`}</S.subTitle>
          <S.mainTitle>{"Quiz & Article"}</S.mainTitle>
        </S.titleContainer>
        <ProjectIntro />
        <ProjectTarget />
      </S.MainContainer>
    </S.BodyContainer>
  );
}

export default mainPage;
