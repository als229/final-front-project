import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  SectionTitle,
  Input,
  UpdateForm,
  Wrapper,
  Button,
  Description,
  Label,
  ButtonWrapper,
} from "./UpdatePassword.styls";

const UpdatePassword = () => {
  return (
    <>
      <Container>
        <div>
          <SectionTitle>비밀번호 재설정</SectionTitle>
        </div>

        <Description>비밀번호를 변경해주세요.</Description>
        <Description>
          다른 아이디나 사이트에서 사용한 적 없는 안전한 비밀번호로 변경해
          주세요.
        </Description>
        <Wrapper>
          <UpdateForm>
            <Label>현재 비밀번호</Label>
            <Input />
            <Label>새 비밀번호</Label>
            <Input />
            <Label>새 비밀번호 확인</Label>
            <Input />
            <ButtonWrapper>
              <Button>변경하기</Button>
              <Button>취소</Button>
            </ButtonWrapper>
          </UpdateForm>
        </Wrapper>
      </Container>
    </>
  );
};
export default UpdatePassword;
