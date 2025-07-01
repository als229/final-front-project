import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FindIdForm,
  FindIdBox,
  Wrapper,
  Button,
  Input,
} from "./FindId.styls";

const FindId = () => {
  return (
    <>
      <Container>
        <FindIdForm>
          <FindIdBox>
            <h2>아이디찾기</h2>
          </FindIdBox>
          <label>이메일</label>
          <Input />
          <label>비밀번호</label>
          <Input />
          <Wrapper>
            <Button>이메일로 발송</Button>
          </Wrapper>
        </FindIdForm>
      </Container>
    </>
  );
};
export default FindId;
