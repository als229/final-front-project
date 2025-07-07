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
import { passwordRegex } from "../validation/Validation";

const UpdatePassword = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const { logout, auth } = useContext(AuthContext);

  const [changePw, setChangePw] = useState({
    password: "",
    newPassword: "",
  });

  const [newPasswordVerify, setNewPasswordVerify] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePw((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!changePw.password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(changePw.password)) {
      alert("비밀번호는 영문+숫자 조합 6~30자, 공백 없이 입력해야 합니다.");
      return;
    }
    if (!changePw.newPassword.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(changePw.newPassword)) {
      alert("비밀번호는 영문+숫자 조합 6~30자, 공백 없이 입력해야 합니다.");
      return;
    }

    if (changePw.newPassword !== newPasswordVerify) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    axios
      .put(`${apiUrl}/api/users/update-pw`, changePw, {
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
        const errorCode = err.response.data.code;
        const message = err.response.data.message;

        if (errorCode == "E401_INVALID_PASSWORD") {
          alert(message);
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
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
              value={newPasswordVerify}
              onChange={(e) => setNewPasswordVerify(e.target.value)}
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
