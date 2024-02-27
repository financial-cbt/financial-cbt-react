import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signup } from "~/lib/apis/user";

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  const postSignup = async (email, password, nickname) => {
    try {
      const response = await signup(email, password, nickname);
      if (
        response.response &&
        response.response.data.message ===
          "email, password, nickName을 정확히 입력해주세요."
      ) {
        alert("이미 가입된 이메일입니다.");
        return;
      }
      alert("회원가입이 완료되었습니다.");
      navigate("/");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    }
  };

  const onSignup = (e) => {
    e.preventDefault();
    if (emailCheck(email)) {
      alert("유효한 이메일 형식으로 입력해주세요.");
    } else if (password === passwordCheck) {
      postSignup(email, password, nickname);
      setEmail("");
      setPassword("");
      setPasswordCheck("");
      setNickname("");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      setPassword("");
      setPasswordCheck("");
    }
  };

  function emailCheck(email_address) {
    const email_regex = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
    return !email_regex.test(email_address);
  }

  return (
    <SignupContainer>
      <Form onSubmit={onSignup}>
        <Label>
          <Img src="public/Signature.svg" alt="닉네임" />
          <StyledInput
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></StyledInput>
        </Label>
        <Label>
          <Img src="public/Envelope.svg" alt="이메일" />
          <StyledInput
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></StyledInput>
        </Label>
        <Label>
          <Img src="public/lock.svg" alt="비밀번호" />
          <StyledInput
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
          ></StyledInput>
        </Label>
        <Label>
          <Img src="public/lock.svg" alt="비밀번호 확인" />
          <StyledInput
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            type="password"
            autoComplete="off"
          ></StyledInput>
        </Label>
        <StyledButton type="submit">회원가입</StyledButton>
      </Form>
    </SignupContainer>
  );
};
export default Signup;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 42px);
  gap: 32px;
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
