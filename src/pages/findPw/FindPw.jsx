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
import { userIdRegex, emailRegex } from "../validation/Validation";

const FindPw = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;

  const [FindPwInfo, setFindPwInfo] = useState({
    userId: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFindPwInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!FindPwInfo.userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!userIdRegex.test(FindPwInfo.userId)) {
      alert("아이디는 영문자로 시작하는 4~20자의 영문자 또는 숫자 조합입니다.");
      return;
    }

    if (!FindPwInfo.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(FindPwInfo.email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    axios
      .post(`${apiUrl}/api/auth/find-pw`, FindPwInfo)
      .then((res) => {
        alert("비밀번호가 이메일로 전송되었습니다.");
        navi("/login");
      })
      .catch((err) => {
        const errorCode = err.response.data.code;
        const message = err.response.data.message;

        if (errorCode == "E404_INVALID_ACCOUNT") {
          alert(message);
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      });
  };

  return (
    <>
      <Container>
        <FindPwForm onSubmit={handleSubmit}>
          <FindPwBox>
            <h2>비밀번호찾기</h2>
          </FindPwBox>

          <label>아이디</label>
          <Input
            type="text"
            name="userId"
            value={FindPwInfo.userId}
            onChange={handleChange}
          />
          <label>이메일</label>
          <Input
            type="email"
            name="email"
            value={FindPwInfo.email}
            onChange={handleChange}
          />
          <Wrapper>
            <Button type="submit">이메일로 발송</Button>
          </Wrapper>
        </FindPwForm>
      </Container>
    </>
  );
};
export default FindPw;
