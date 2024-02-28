import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "~/lib/hooks/useAuth";
import test from "../../imgs/test.png";
const RandomQuiz = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const truncateNickname = (nickname) => {
    if (nickname.length > 3) {
      return nickname.slice(0, 3) + "...";
    }
    return nickname;
  };

  return (
    <Container className="row">
      <QuizBox
        className="col-lg-2 col-md-6 col-12 mb-4"
        onClick={() => navigate("/quizground")}
      >
        <Header>2024 내 상식 능력치는?</Header>
        <TitleContainer>
          <div style={{ fontSize: "60px", fontWeight: "100" }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Title>경제 · 금융 상식 퀴즈</Title>
            <Category>A형</Category>
          </div>
          <div style={{ fontSize: "60px", fontWeight: "100" }}></div>
        </TitleContainer>
        <div style={{ marginTop: "20px" }}>
          <img src={test} alt="1" style={{ width: "100%" }} />
        </div>
        <Candidate>
          {user ? truncateNickname(user.nickname) : truncateNickname("OOO")}님
        </Candidate>
      </QuizBox>
      <QuizBox
        className="col-lg-2 col-md-6 col-12 mb-4"
        onClick={() => navigate("/quizground")}
      >
        <Header>2024 내 상식 능력치는?</Header>
        <TitleContainer>
          <div style={{ fontSize: "60px", fontWeight: "100" }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Title>경제 · 금융 상식 퀴즈</Title>
            <Category>B형</Category>
          </div>
          <div style={{ fontSize: "60px", fontWeight: "100" }}></div>
        </TitleContainer>
        <div style={{ marginTop: "20px" }}>
          <img src={test} alt="1" style={{ width: "100%" }} />
        </div>
        <Candidate>
          {user ? truncateNickname(user.nickname) : "OOO"}님
        </Candidate>
      </QuizBox>
    </Container>
  );
};

export default RandomQuiz;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: "5px";
`;
const Header = styled.div`
  text-align: center;
  margin-top: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto 100px auto;
  gap: 150px;
`;

const QuizBox = styled.div`
  position: relative;
  width: 300px;
  height: 435px;
  background-color: #f7f7f7;
  box-shadow: 5px 7px 15px 0px rgba(0, 0, 0, 0.4);
  &:hover {
    transform: scale(1.2);
  }
`;

const Category = styled.div`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 15px;
`;

const Candidate = styled.div`
  position: absolute;
  right: 10px;
  bottom: 20px;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
