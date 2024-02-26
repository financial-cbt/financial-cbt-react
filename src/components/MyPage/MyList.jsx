import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const MyList = ({ options, handleSelectOptionChange, list, numbersObject }) => {
  console.log("list", list);
  console.log("numbersObjects", numbersObject);
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
          <ListItem key={index}>
            <Correction>{item.accuracy ? "O" : "X"}</Correction>
            <Question>{item.question}</Question>
          </ListItem>
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
`;

const AnswerRow = styled.div`
  display: flex;
  gap: 50px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 130px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #e1f3fd;
  margin-right: 1.5vw;
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
`;

const ListContainer = styled.div`
  /* background-color: yellow; */
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 70vw;
  padding: 15px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

const Correction = styled.div`
  display: flex;
  margin: auto 50px auto 50px;
  align-items: center;
`;

const Question = styled.div`
  margin: auto 50px auto 50px;
`;

const SelectContainer = styled.div`
  width: 80%;
`;

const StyledSelect = styled(Select)`
  margin-top: 50px;
  margin-left: auto;
  margin-bottom: 50px;
  width: 100px;
`;
