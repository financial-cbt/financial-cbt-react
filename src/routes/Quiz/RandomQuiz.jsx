import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "~/lib/hooks/useAuth";

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
        <Category>A형</Category>
        <Title>
          경제 · 금융 <br />~ 상식 퀴즈 ~
        </Title>
        <Candidate>
          {user ? truncateNickname(user.nickname) : truncateNickname("OOO")}님
        </Candidate>
      </QuizBox>
      <QuizBox
        className="col-lg-2 col-md-6 col-12 mb-4"
        onClick={() => navigate("/quizground")}
      >
        <Category>B형</Category>
        <Title>
          경제 · 금융 <br />~ 상식 퀴즈 ~
        </Title>
        <Candidate>
          {user ? truncateNickname(user.nickname) : "OOO"}님
        </Candidate>
      </QuizBox>
    </Container>
  );
};

export default RandomQuiz;

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
  text-align: left;
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 30px auto auto 30px;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 30px;
`;

const Candidate = styled.div`
  position: absolute;
  right: 0;
  color: #000;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 150px;
  /* text-align: left; */
  width: 150px;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
`;
