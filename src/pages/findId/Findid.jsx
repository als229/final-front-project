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
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;

  const [findIdInfo, setFindIdinfo] = useState({
    email: "",
    realName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFindIdinfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/api/auth/find-id`, findIdInfo)
      .then((res) => {
        alert("아이디가 이메일로 전송되었습니다");
        navi("/login");
      })
      .catch((err) => {
        console.log("이메일 발송 실패");
      });
  };

  return (
    <>
      <Container>
        <FindIdForm onSubmit={handleSubmit}>
          <FindIdBox>
            <h2>아이디찾기</h2>
          </FindIdBox>
          <label>이름</label>
          <Input
            type="text"
            name="realName"
            value={findIdInfo.realName}
            onChange={handleChange}
          />
          <label>이메일</label>
          <Input
            type="email"
            name="email"
            value={findIdInfo.email}
            onChange={handleChange}
          />
          <Wrapper>
            <Button type="submit">이메일로 발송</Button>
          </Wrapper>
        </FindIdForm>
      </Container>
    </>
  );
};
export default FindId;
