import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();

  return (
    <SignupContainer>
      <LogoImg alt="로고" />
      <Form>
        <Label>
          <Img src="public/Envelope.svg" alt="이메일" />
          <StyledInput type="text" placeholder="이메일"></StyledInput>
        </Label>
        <Label>
          <Img src="public/lock.svg" alt="비밀번호" />
          <StyledInput type="password" placeholder="비밀번호"></StyledInput>
        </Label>
        <StyledButton>로그인</StyledButton>
      </Form>
      <NavDiv onClick={() => navigate("/signup")}>회원가입</NavDiv>
    </SignupContainer>
  );
};
export default Login;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  margin-bottom: 100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  background: #f4f5f7;
`;

const Img = styled.img`
  margin-left: 30px;
  margin-right: 30px;
  width: 25px;
  height: 25px;
`;

const StyledInput = styled.input`
  width: 300px;
  height: 60px;
  background: #f4f5f7;
  border: none;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;

  &::placeholder {
    color: rgba(186, 186, 186, 0.8);
  }
`;

const StyledButton = styled.button`
  border-radius: 20px;
  border: none;
  background: #d8e8fb;
  width: 389px;
  height: 60px;
  color: #000;
  text-align: center;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const NavDiv = styled.div`
  color: #8b8b8b;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 40px;
`;
