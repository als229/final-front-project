import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FindPwForm,
  Input,
  FindPwBox,
  Wrapper,
  Button,
} from "./FindPw.styls";
const FindPw = () => {
  return (
    <>
      <Container>
        <FindPwForm>
          <FindPwBox>
            <h2>비밀번호찾기</h2>
          </FindPwBox>

          <label>아이디</label>
          <Input />
          <label>이메일</label>
          <Input />
          <Wrapper>
            <Button>이메일로 발송</Button>
          </Wrapper>
        </FindPwForm>
      </Container>
    </>
  );
};
export default FindPw;
