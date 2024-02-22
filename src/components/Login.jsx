import React, { useState } from "react";
import { login } from "~/lib/apis/user";
import { setCookie } from "~/lib/apis/cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "~/lib/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, clientLogin } = useAuth();

  const postLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      setCookie("token", response.data.token, {
        path: "/",
        // secure: true,
      });
      const user = response.data;
      if (user.token) {
        clientLogin(user);
        navigate("/");
        window.scrollTo(0, 0);
      }
      console.log(response.data);

      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    postLogin(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <SignupContainer>
      <LogoImg alt="로고" />
      <Form onSubmit={onLogin}>
        <Label>
          <Img src="public/Envelope.svg" alt="이메일" />
          <StyledInput
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></StyledInput>
        </Label>
        <Label>
          <Img src="public/lock.svg" alt="비밀번호" />
          <StyledInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          ></StyledInput>
        </Label>
        <StyledButton type="submit">로그인</StyledButton>
      </Form>
      <NavDiv>회원가입</NavDiv>
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
