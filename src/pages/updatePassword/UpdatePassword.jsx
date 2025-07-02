import axios from "axios";
import { useState, useEffect, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UpdatePassword = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const { logout, auth } = useContext(AuthContext);

  const [changePw, setChangePw] = useState({
    password: "",
    newPassword: "",
    newPasswordVerify: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePw((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${apiUrl}/api/auth/find-pw`, changePw, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        alert("비밀번호가 변경되었습니다.");
        logout();
        navi("/login");
      })
      .catch((err) => {
        console.log("비밀번호 변경실패:", err);
      });
  };

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
          <UpdateForm onSubmit={handleSubmit}>
            <Label>현재 비밀번호</Label>
            <Input
              type="password"
              name="password"
              value={changePw.password}
              onChange={handleChange}
            />
            <Label>새 비밀번호</Label>
            <Input
              type="password"
              name="newPassword"
              value={changePw.newPassword}
              onChange={handleChange}
            />
            <Label>새 비밀번호 확인</Label>
            <Input
              type="password"
              name="newPasswordVerify"
              value={changePw.newPasswordVerify}
              onChange={handleChange}
            />
            <ButtonWrapper>
              <Button>변경하기</Button>
              <Button
                type="button"
                onClick={() => {
                  navi("/mypage");
                }}
              >
                취소
              </Button>
            </ButtonWrapper>
          </UpdateForm>
        </Wrapper>
      </Container>
    </>
  );
};
export default UpdatePassword;
