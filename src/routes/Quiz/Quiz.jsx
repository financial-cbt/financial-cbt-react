import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import OX from "../../components/Quiz/OX";
import QuizResult from "../../components/Quiz/QuizResult";
import { fetchQuizList } from "~/lib/apis/quiz";
import { Desktop, Mobile } from "../../MediaQuery/useMediaQuery";
import ProgressBar from "../../components/Quiz/ProgressBar";

const Quiz = () => {
  const [sec, setSec] = useState(60);
  const [alertShown, setAlertShown] = useState(false); // 넘어가기 alert
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(-1));
  const [isRight, setIsRight] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false); // 정답 확인 후 변경 못하게
  const [quizList, setQuizList] = useState([]);

  const fetchQuizData = async () => {
    try {
      const quizData = await fetchQuizList();

      setQuizList(quizData);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const allQuiz = quizList.map((item) => item.num);

  useEffect(() => {
    if (sec === 0 && !alertShown) {
      const interval = setInterval(() => {
        setShowAnswer(false);
        setAlertShown(true);
        alert("넘어가기");
        handleNextQuestion();
        clearInterval(interval);
      }, 0);
    }
  }, [sec, alertShown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSec((prevSec) => {
        if (prevSec === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevSec - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [check, setCheck] = useState(null);
  const [end, setEnd] = useState(false);

  const handlePopupToggle = useCallback(() => {
    if (answers[currentQuestionIdx] == -1) {
      alert("정답을 선택해주세요.");
    } else {
      setPopupVisible(!popupVisible);
      setShowAnswer(true);
      const userAnswer = answers[currentQuestionIdx];
      const correctAnswer = quizList[currentQuestionIdx].answer;
      setCheck(userAnswer == correctAnswer);
      setTimeout(() => {
        setPopupVisible(false);
      }, 1500);
    }
  }, [answers, currentQuestionIdx, popupVisible, quizList]);

  const handleNextQuestion = useCallback(() => {
    if (answers[currentQuestionIdx] == -1 && alertShown) {
      alert("정답을 선택해주세요.");
    } else if (currentQuestionIdx === 9) {
      const userAnswer = answers[currentQuestionIdx];
      const correctAnswer = quizList[currentQuestionIdx].answer;
      const isCorrect = userAnswer == correctAnswer;
      setIsRight((prevIsRight) => prevIsRight.concat(isCorrect));
      setAlertShown(true);
      setEnd(true);
      setSec(0);
    } else {
      setShowAnswer(false);
      setAlertShown(false);
      const userAnswer = answers[currentQuestionIdx];
      const correctAnswer = quizList[currentQuestionIdx].answer;
      const isCorrect = userAnswer == correctAnswer;
      setIsRight((prevIsRight) => prevIsRight.concat(isCorrect));
      setCurrentQuestionIdx((prevIdx) => prevIdx + 1);
      setSec(60);
    }
  }, [alertShown, answers, currentQuestionIdx, quizList]);

  const handleAnswerClick = useCallback(
    (selectedAnswer) => {
      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIdx] = selectedAnswer;
        return updatedAnswers;
      });
    },
    [currentQuestionIdx]
  );

  const currentQuestion = quizList[currentQuestionIdx];

  const preventClose = useCallback((e) => {
    e.preventDefault();
    e.returnValue = "";
  }, []);

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  const preventGoBack = useCallback(() => {
    history.pushState(null, "", location.href);
  }, [preventClose]);

  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, [preventGoBack]);

  return (
    <>
      <Desktop>
        <Container>
          {currentQuestion ? (
            <>
              <ImgContainer>
                <Div></Div>
                <Img src="shinhan1.svg" alt="캐릭터1" />
              </ImgContainer>
              <QuizContainer>
                <Question>
                  <div style={{ marginBottom: 10 }}>
                    {currentQuestionIdx + 1}번 문제입니다!
                  </div>
                  {currentQuestion.question}
                </Question>
                <AnswerContainer>
                  {currentQuestion.option.map((answer, index) => (
                    <Answer
                      key={index}
                      onClick={() => handleAnswerClick(index + 1)}
                      selected={answers[currentQuestionIdx] == index + 1}
                      disabled={showAnswer}
                    >
                      {answer}
                    </Answer>
                  ))}
                  {end && (
                    <QuizResult
                      isRight={isRight}
                      quizList={quizList}
                      allQuiz={allQuiz}
                      answers={answers}
                    />
                  )}
                </AnswerContainer>
                <Row>
                  <TimerContainer>
                    <Column>
                      <Icon src="stopwatch.svg" alt="시계" />
                      <Time>{sec}초</Time>
                    </Column>
                    <ProgressBar percentage={(sec / 60) * 100} />
                    <NavContainer>
                      <NavDiv onClick={handlePopupToggle}>정답보기</NavDiv>
                      <NavDiv onClick={handleNextQuestion}>다음문제</NavDiv>
                    </NavContainer>
                  </TimerContainer>
                </Row>
                {popupVisible && <OX check={check} />}
              </QuizContainer>
            </>
          ) : (
            <>loading...</>
          )}
        </Container>
      </Desktop>
      <Mobile>
        <Container>
          {currentQuestion ? (
            <>
              <QuizContainer>
                <Question>
                  <div style={{ marginBottom: 10 }}>
                    {currentQuestionIdx + 1}번 문제입니다!
                  </div>
                  {currentQuestion.question}
                </Question>
                <AnswerContainer>
                  {currentQuestion.option.map((answer, index) => (
                    <Answer
                      key={index}
                      onClick={() => handleAnswerClick(index + 1)}
                      selected={answers[currentQuestionIdx] == index + 1}
                      disabled={showAnswer}
                    >
                      {answer}
                    </Answer>
                  ))}
                  {end && (
                    <QuizResult
                      isRight={isRight}
                      quizList={quizList}
                      allQuiz={allQuiz}
                      answers={answers}
                    />
                  )}
                </AnswerContainer>
                <Row>
                  <TimerContainer>
                    <Column>
                      <Icon src="stopwatch.svg" alt="시계" />
                      <Time>{sec}초</Time>
                    </Column>
                    <ProgressBar percentage={(sec / 60) * 100} />
                    <NavContainer>
                      <NavDiv onClick={handlePopupToggle}>정답보기</NavDiv>
                      <NavDiv onClick={handleNextQuestion}>다음문제</NavDiv>
                    </NavContainer>
                  </TimerContainer>
                </Row>
                {popupVisible && <OX check={check} />}
              </QuizContainer>
            </>
          ) : (
            <>loading...</>
          )}
        </Container>
      </Mobile>
    </>
  );
};

export default Quiz;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  zoom: 0.9;

  @media (max-width: 500px) {
    transform: scale(0.5);
  }
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

  @media (max-width: 500px) {
    font-size: 40px;
    line-height: 80px;
    &::after {
      display: none;
    }
  }
`;

const AnswerContainer = styled.div`
  display: grid;
  width: 721px;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열 */
  grid-template-rows: repeat(2, auto); /* 두 개의 행 */
  gap: 30px;
  margin-top: 63px;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
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

  @media (max-width: 500px) {
    height: 105px;
    pointer-events: ${({ disabled }) => (disabled ? "none" : null)};
  }
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

  @media (max-width: 500px) {
    font-size: 25px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 150px;
  gap: 15px;

  @media (max-width: 500px) {
    margin-left: 50px;
    gap: 50px;
  }
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

  @media (max-width: 500px) {
    font-size: 25px;
    width: 100px;
    height: 100px;
  }
`;
