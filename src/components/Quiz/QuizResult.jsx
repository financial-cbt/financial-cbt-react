import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postMyQuiz } from "~/lib/apis/quiz";
import useAuth from "~/lib/hooks/useAuth";

const QuizResult = ({ isRight, quizList, allQuiz, answers }) => {
  const [visibleQuestionList, setVisibleQuestionList] = useState("all");
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("quizList", quizList);

  useEffect(() => {
    document.body.style.cssText = `
              position: fixed; 
              top: -${window.scrollY}px;
              overflow-y: scroll;
              width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const quizResult = (quiz, userAnswer) => {
    return quiz.map((question, index) => {
      const userChoice = question.option[userAnswer[index] - 1];
      const correctAnswer = question.option[parseInt(question.answer) - 1];

      return {
        id: index,
        userAnswer: userChoice || "미입력",
        answer: correctAnswer,
      };
    });
  };

  const resultList = quizResult(quizList, answers);
  console.log("resultList", resultList);

  const rightLength = isRight.filter((element) => true === element).length;
  const wrongLength = isRight.filter((element) => false === element).length;

  const rightIdx = [];
  const wrongIdx = [];

  isRight.forEach((element, index) => {
    if (element === true) {
      rightIdx.push(index);
    } else {
      wrongIdx.push(index);
    }
  });

  console.log("userId", user._id);
  console.log("allQuiz", allQuiz);
  console.log("accuracy", isRight);
  console.log("userAnswer", answers);

  const postMyAnswers = async (userId, allQuiz, accuracy, userAnswer) => {
    try {
      const res = await postMyQuiz(userId, allQuiz, accuracy, userAnswer);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = (path) => {
    postMyAnswers(user._id, allQuiz, isRight, answers);
    navigate(path);
  };

  const combineResultsWithQuiz = (resultList, quizList) => {
    return resultList.map((resultItem, index) => ({
      ...resultItem,
      question: quizList[index].question,
      _id: quizList[index]._id,
    }));
  };

  const combinedList = combineResultsWithQuiz(resultList, quizList);
  console.log(combinedList);

  return (
    <>
      <PopupBg></PopupBg>
      <PopupContainer>
        <PopupContent>
          <AnswerRow>
            <AllWrapper onClick={() => setVisibleQuestionList("all")}>
              <Div>전체</Div>
              <AnswerDiv>{isRight.length}개</AnswerDiv>
            </AllWrapper>
            <RightWrapper onClick={() => setVisibleQuestionList("right")}>
              <Div>정답</Div>
              <AnswerDiv>{rightLength}개</AnswerDiv>
            </RightWrapper>
            <WrongWrapper onClick={() => setVisibleQuestionList("wrong")}>
              <Div>오답</Div>
              <AnswerDiv>{wrongLength}개</AnswerDiv>
            </WrongWrapper>
          </AnswerRow>
          <QuestionList>
            {combinedList?.map((item, index) => {
              if (
                visibleQuestionList === "all" ||
                (visibleQuestionList === "right" && rightIdx.includes(index)) ||
                (visibleQuestionList === "wrong" && wrongIdx.includes(index))
              ) {
                return (
                  <QuestionDiv key={item._id}>
                    <QNum>{index + 1}번</QNum>
                    <QuestionItem>
                      <QContent>{item.question}</QContent>
                    </QuestionItem>
                    <QuestionItem2>
                      {item.userAnswer === item.answer ? (
                        <>
                          <QContent>정답 : {item.answer}</QContent>
                        </>
                      ) : (
                        <>
                          <Visible>나의 답안 : {item.userAnswer}</Visible>
                          <QContent>정답 : {item.answer}</QContent>
                        </>
                      )}
                    </QuestionItem2>
                  </QuestionDiv>
                );
              } else {
                return null;
              }
            })}
          </QuestionList>
          <ButtonWrapper>
            <NavButton
              onClick={() => {
                onClick("/");
              }}
            >
              홈으로 이동
            </NavButton>
            <NavButton
              onClick={() => {
                onClick("/mypage");
              }}
            >
              성적표 확인
            </NavButton>
          </ButtonWrapper>
        </PopupContent>
      </PopupContainer>
    </>
  );
};

export default QuizResult;

const PopupBg = styled.div`
  width: 200vw;
  height: 200vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  height: 90vh;
  width: 90vw;
  overflow-y: scroll;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnswerRow = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 50px;
`;

const Div = styled.div`
  display: block;
`;

const AnswerDiv = styled.div`
  display: none;
`;

const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  font-size: 40px;

  &:hover {
    background-color: black;
    color: white;
  }

  &:hover > ${Div} {
    display: none;
  }

  &:hover > ${AnswerDiv} {
    font-size: 40px;
    display: block;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #002dab;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  font-size: 40px;
  color: #002dab;

  &:hover {
    border: 2px solid #002dab;
    background-color: #002dab;
    color: white;
  }

  &:hover > ${Div} {
    display: none;
  }

  &:hover > ${AnswerDiv} {
    font-size: 40px;
    display: block;
  }
`;

const WrongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #df0303;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  font-size: 40px;
  color: #df0303;

  &:hover {
    border: 2px solid #df0303;
    background-color: #df0303;
    color: white;
  }

  &:hover > ${Div} {
    display: none;
  }

  &:hover > ${AnswerDiv} {
    font-size: 40px;
    display: block;
  }
`;

const QuestionList = styled.div``;

const QuestionItem = styled.div`
  display: flex;
  gap: 30px;
`;

const QuestionItem2 = styled.div`
  display: none;
`;

const QuestionDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
  border: 1px solid black;
  padding: 20px;
  gap: 20px;
  width: 75vw;
  font-size: 20px;

  &:hover {
    background-color: black;
    color: white;
  }

  &:hover > ${QuestionItem} {
    display: none;
  }

  &:hover > ${QuestionItem2} {
    display: flex;
    gap: 50px;
    margin-left: auto;
  }
`;

const Visible = styled.div``;

const QNum = styled.div``;

const QContent = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 40px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: #ebebeb;
  width: 100px;
  height: 30px;
  box-sizing: border-box;
  color: #000;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  border: none;

  &:hover {
    background: #909090;
  }
`;
