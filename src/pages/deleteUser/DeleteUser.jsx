import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  DeleteForm,
  Input,
  CheckboxWrapper,
  ButtonGroup,
  ConfirmButton,
  CancelButton,
  ConfirmText,
  StyledList,
  StyledListItem,
} from "./DeleteUser.styls";

const DeleteUser = () => {
  return (
    <>
      <Container>
        <DeleteForm>
          <div>
            <h2>회원탈퇴</h2>
          </div>
          <h4>탈퇴하시기 전에 아래 정보를 꼭 확인해주세요.</h4>
          <StyledList>
            <StyledListItem>
              회원에서 탈퇴하시면 현재 사용중이신 계정을 더이상 사용할 수 없게
              됩니다.
            </StyledListItem>

            <StyledListItem>
              한 번 삭제된 계정은 이전 상태로 복구할수 없습니다. 또한 게정이
              삭제되면 해당 계정의 정보 및 사용이력을 더 이상 조회할 수 없게
              됩니다.
            </StyledListItem>
            <StyledListItem>
              한번 탈퇴한 사용자라 하더라도 언제든 다시 놀러Way에 회원 가입을 할
              수 있습니다.
            </StyledListItem>
          </StyledList>

          <label>현재 비밀번호</label>
          <Input />

          <CheckboxWrapper>
            <input type="checkbox" />
            <ConfirmText>위 내용을 모두 확인했습니다.</ConfirmText>
          </CheckboxWrapper>
          <ButtonGroup>
            <ConfirmButton>탈퇴</ConfirmButton>
            <CancelButton>취소</CancelButton>
          </ButtonGroup>
        </DeleteForm>
      </Container>
    </>
  );
};
export default DeleteUser;
