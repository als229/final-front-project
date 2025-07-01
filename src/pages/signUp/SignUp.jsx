import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  SignUpForm,
  SignUpBox,
  RowBox,
  Input,
  SignUpWrapper,
  Button,
  InputVerify,
} from "./SignUp.styls";

const SignUp = () => {
  return (
    <>
      <Container>
        <SignUpForm>
          <SignUpBox>
            <h2>회원가입</h2>
          </SignUpBox>
          <label>아이디</label>
          <RowBox>
            <InputVerify />
            <button>중복확인</button>
          </RowBox>
          <label>이메일</label>
          <RowBox>
            <InputVerify />
            <button>인증하기</button>
          </RowBox>
          <label>비밀번호</label>
          <Input />
          <label>이름</label>
          <Input />
          <label>닉네임</label>
          <Input />

          <SignUpWrapper>
            <Button>회원가입</Button>
          </SignUpWrapper>
        </SignUpForm>
      </Container>
    </>
  );
};
export default SignUp;
