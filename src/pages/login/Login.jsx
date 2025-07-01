import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  LoginForm,
  LoginBox,
  FindWrapper,
  Wrapper,
  Button,
  Input,
} from "./Login.styls";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  return (
    <>
      <Container>
        <LoginForm>
          <LoginBox>
            <h2>로그인</h2>
          </LoginBox>
          <label>아이디</label>
          <Input />
          <label>비밀번호</label>
          <Input />
          <FindWrapper>
            <button
              type="button"
              onClick={() => {
                nav("/findId");
              }}
            >
              아이디찾기
            </button>
            <button
              type="button"
              onClick={() => {
                nav("/findPw");
              }}
            >
              비밀번호찾기
            </button>
          </FindWrapper>
          <Wrapper>
            <Button>로그인</Button>
          </Wrapper>
          <Wrapper>
            <Button
              type="button"
              onClick={() => {
                nav("/signUp");
              }}
            >
              회원가입
            </Button>
          </Wrapper>
        </LoginForm>
      </Container>
    </>
  );
};
export default Login;
