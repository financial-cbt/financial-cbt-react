import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";
import OX from "../../components/Quiz/OX";
import QuizResult from "../../components/Quiz/QuizResult";

const Quiz = () => {
  const [sec, setSec] = useState(600);
  const [alertShown, setAlertShown] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(-1));
  const [isRight, setIsRight] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  // useEffect(() => {
  //   if (sec === 0 && !alertShown) {
  //     const interval = setInterval(() => {
  //       setShowAnswer(false);
  //       setAlertShown(true);
  //       alert("넘어가기");
  //       handleNextQuestion();
  //       clearInterval(interval);
  //     }, 0);
  //   }
  // }, [sec, alertShown]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSec((prevSec) => {
  //       if (prevSec === 0) {
  //         clearInterval(interval);
  //         return 0;
  //       }
  //       return prevSec - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const [check, setCheck] = useState(null);
  const [end, setEnd] = useState(false);

  const handlePopupToggle = () => {
    if (answers[currentQuestionIdx] === -1) {
      alert("정답을 선택해주세요.");
    } else {
      setPopupVisible(!popupVisible);
      setShowAnswer(true);
      const userAnswer = answers[currentQuestionIdx];
      const correctAnswer = dummy[currentQuestionIdx].answer;
      setCheck(userAnswer === correctAnswer);
      setTimeout(() => {
        setPopupVisible(false);
      }, 1500);
    }
  };
  const handleNextQuestion = () => {
    if (answers[currentQuestionIdx] === -1 && alertShown) {
      alert("정답을 선택해주세요.");
    } else if (currentQuestionIdx === 9) {
      const userAnswer = answers[currentQuestionIdx];
      const correctAnswer = dummy[currentQuestionIdx].answer;
      const isCorrect = userAnswer === correctAnswer;
      setIsRight((prevIsRight) => prevIsRight.concat(isCorrect));
      setAlertShown(true);
      setEnd(true);
    } else {
      setShowAnswer(false);
      setAlertShown(false);
      const userAnswer = answers[currentQuestionIdx];
      const correctAnswer = dummy[currentQuestionIdx].answer;
      const isCorrect = userAnswer === correctAnswer;

      setIsRight((prevIsRight) => prevIsRight.concat(isCorrect));
      setCurrentQuestionIdx((prevIdx) => prevIdx + 1);

      setSec(6);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIdx] = selectedAnswer;
      return updatedAnswers;
    });
  };

  const dummy = [
    {
      id: 0,
      question:
        "0발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
    {
      id: 1,
      question:
        "1발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
    {
      id: 2,
      question:
        "2발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
    {
      id: 3,
      question:
        "3발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
    {
      id: 4,
      question:
        "4발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
    {
      id: 5,
      question:
        "5발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
    {
      id: 6,
      question:
        "6발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
    {
      id: 7,
      question:
        "7발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
    {
      id: 8,
      question:
        "8발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
    {
      id: 9,
      question:
        "9발행기관이 파산할 경우 다른 채권자 부채를 모두 청산한 다음 마지막으로 상환받을 수 있는 채권은?",
      answers: ["1특수채", "2회사채", "3국채", "후순위채"],
      answer: 2,
    },
  ];

  const currentQuestion = dummy[currentQuestionIdx];

  console.log(answers);
  console.log(isRight);
  return (
    <Container>
      <ImgContainer>
        <Div></Div>
        <Img src="public/shinhan1.svg" alt="캐릭터1" />
      </ImgContainer>
      <QuizContainer>
        <Question>
          <div style={{ marginBottom: 10 }}>
            {currentQuestion.id + 1}번 문제입니다!
          </div>
          {currentQuestion.question}
        </Question>
        <AnswerContainer>
          {currentQuestion.answers.map((answer, index) => (
            <Answer
              key={index}
              onClick={() => handleAnswerClick(index + 1)} // 선택한 답변의 인덱스 전달
              selected={answers[currentQuestionIdx] === index + 1}
              disabled={showAnswer}
            >
              {answer}
            </Answer>
          ))}
          {end && <QuizResult isRight={isRight} dummy={dummy} />}
        </AnswerContainer>
        <Row>
          <TimerContainer>
            <Column>
              <Icon src="public/stopwatch.svg" alt="시계" />
              <Time>{sec}초</Time>
            </Column>
            <ProgressBar
              completed={(sec / 60) * 100}
              bgColor="#002DAB"
              width="359px"
              height="9px"
              isLabelVisible={false}
            />
            <NavContainer>
              <NavDiv onClick={handlePopupToggle}>정답보기</NavDiv>
              <NavDiv onClick={handleNextQuestion}>다음문제</NavDiv>
            </NavContainer>
          </TimerContainer>
        </Row>
        {popupVisible && <OX check={check} />}
      </QuizContainer>
    </Container>
  );
};

export default Quiz;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  zoom: 0.9;
`;

const ImgContainer = styled.div`
  height: 600px;
`;
const Div = styled.div`
  height: 25%;
`;

const Img = styled.img`
  width: 500px;
  height: 75%;
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  position: relative;
  width: 721px;
  min-height: 223px;
  background: #e1f3fd;
  color: black;
  border-radius: 20px;
  padding: 12px 12.8px;
  margin-right: 20px;
  padding: 40px;

  &::after {
    border-top: 15px solid transparent;
    border-left: 0px solid transparent;
    border-right: 30px solid #e1f3fd;
    border-bottom: 15px solid transparent;
    content: "";
    position: absolute;
    top: 150px;
    left: -30px;
  }

  color: #000;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: -1.263px;
  word-break: keep-all;
`;

const AnswerContainer = styled.div`
  display: grid;
  width: 721px;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열 */
  grid-template-rows: repeat(2, auto); /* 두 개의 행 */
  gap: 30px;
  margin-top: 63px;
`;

const Answer = styled.button`
  border: none;
  display: flex;
  align-items: center;
  padding-left: 50px;
  height: 95px;
  background-color: ${({ selected }) => (selected ? "#002DAB" : "#e1f3fd")};
  border-radius: 20px;
  text-align: left;
  color: ${({ selected }) => (selected ? "white" : "#000")};
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: -1.263px;

  &:hover {
    background-color: #002dab;
    color: white;
  }

  /* &:focus {
    background-color: #002dab;
    color: white;
  }

  &:active {
    background-color: #002dab;
    color: white;
  } */
`;

const Row = styled.div`
  display: flex;
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 22px;
`;

const Icon = styled.img`
  width: 35.932px;
  height: 42.716px;
`;

const Time = styled.div`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.758px;
  margin-top: 3px;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 150px;
  gap: 15px;
`;

const NavDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: #ebebeb;
  width: 70px;
  height: 30px;
  box-sizing: border-box;
  color: #000;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  /* line-height: normal; */
`;
