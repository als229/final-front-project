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

    axios
      .post(`${apiUrl}/api/auth/find-pw`, FindPwInfo)
      .then((res) => {
        alert("비밀번호가 이메일로 전송되었습니다.");
        navi("/login");
      })
      .catch((err) => {
        console.log(err);
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
