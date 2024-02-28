import React from "react";
import styled from "styled-components";
import Select from "react-select";

const MyList = ({ options, handleSelectOptionChange, list, numbersObject }) => {
  return (
    <Container>
      <AnswerRow>
        <Wrapper>
          <Div>전체</Div>
          <AnswerDiv>{numbersObject.totalNum} 개</AnswerDiv>
        </Wrapper>
        <Wrapper>
          <Div>정답</Div>
          <AnswerDiv>{numbersObject.correctNum} 개</AnswerDiv>
        </Wrapper>
        <Wrapper>
          <Div>오답</Div>
          <AnswerDiv>{numbersObject.wrongNum} 개</AnswerDiv>
        </Wrapper>
      </AnswerRow>
      <SelectContainer>
        <StyledSelect
          options={options}
          onChange={handleSelectOptionChange}
          defaultValue={options[0]}
          styles={customStyles}
          isSearchable={false}
        ></StyledSelect>
      </SelectContainer>
      <ListContainer>
        {list.map((item, index) => (
          <ListDiv key={index}>
            <Correction>{item.accuracy ? "O" : "X"}</Correction>
            <ListItem>
              <Question>{item.question}</Question>
            </ListItem>
            <ListItem2>
              {item.userAnswer === item.correctAnswer ? (
                <>
                  <Question>정답 : {item.correctAnswer}</Question>
                </>
              ) : (
                <>
                  <Answer>나의 답안 : {item.userAnswer}</Answer>
                  <Answer>정답 : {item.correctAnswer}</Answer>
                </>
              )}
            </ListItem2>
          </ListDiv>
        ))}
      </ListContainer>
    </Container>
  );
};

export default MyList;

const customStyles = {
  control: (provided) => ({
    ...provided,
    outline: "none",
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: "0px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "black",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    outline: "none",
    fontWeight: state.isSelected ? "bold" : "normal",
    color: "black",
    backgroundColor: "white",
    fontSize: state.selectProps.myFontSize,
    "&:hover": {
      backgroundColor: "#d2d2d2",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: "white",
  }),
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 100px 0px 100px;

  @media (max-width: 500px) {
    margin: -80px auto -10px auto;
  }
`;

const AnswerRow = styled.div`
  display: flex;
  gap: 50px;

  @media (max-width: 500px) {
    gap: 10px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 130px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #e1f3fd;
  margin-right: 1.5vw;

  @media (max-width: 500px) {
    width: 100px;
    height: 100px;
  }
`;

const Div = styled.div`
  position: absolute;
  left: 15px;
  top: 17px;
  color: #111;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.263px;

  @media (max-width: 500px) {
    font-size: 25px;
  }
`;

const AnswerDiv = styled.div`
  position: absolute;
  right: 15px;
  bottom: 17px;
  color: #111;
  text-align: right;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -2.273px;

  @media (max-width: 500px) {
    font-size: 25px;
  }
`;

const ListContainer = styled.div``;

const ListItem = styled.div`
  display: flex;
  gap: 30px;
`;

const ListItem2 = styled.div`
  display: none;
`;

const ListDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 70vw;
  padding: 15px;
  border: 1px solid black;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    flex-direction: column;
    font-size: 15px;
    width: 90vw;
    height: 23vh;
    align-items: center;
    justify-content: center;
    padding: 0px;
  }

  &:hover {
    background-color: black;
    color: white;
  }

  &:hover > ${ListItem} {
    display: none;
  }

  &:hover > ${ListItem2} {
    display: flex;
    gap: 50px;
    margin-left: auto;

    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
`;

const Correction = styled.div`
  display: flex;
  margin: auto 50px auto 50px;
  align-items: center;

  @media (max-width: 500px) {
    margin: 0px 0px 10px 0px;
  }
`;

const Question = styled.div`
  margin: auto 50px auto 50px;
`;

const Answer = styled.div``;

const SelectContainer = styled.div`
  margin-left: auto;
`;

const StyledSelect = styled(Select)`
  margin-top: 50px;
  margin-left: auto;
  margin-bottom: 50px;
  width: 100px;
`;
