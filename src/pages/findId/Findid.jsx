import axios from "axios";
import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import {
  Container,
  FindIdForm,
  FindIdBox,
  Wrapper,
  Button,
  Input,
} from "./FindId.styls";
import { realNameRegex, emailRegex } from "../validation/Validation";

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
    if (!findIdInfo.realName.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!realNameRegex.test(findIdInfo.realName)) {
      alert("아이디는 영문자로 시작하는 4~20자의 영문자 또는 숫자 조합입니다.");
      return;
    }
    if (!findIdInfo.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(findIdInfo.email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    axios
      .post(`${apiUrl}/api/auth/find-id`, findIdInfo)
      .then((res) => {
        alert("아이디가 이메일로 전송되었습니다");
        navi("/login");
      })
      .catch((err) => {
        const erroCode = err.response.data.code;
        const message = err.response.data.message;

        console.log(err);
        console.log(err.resposne);
        console.log(err.response.data);
        console.log(err.response.data.code);

        if (erroCode == "E404_INVALID_ACCOUNT") {
          alert(message);
        } else {
          alert("알수 없는 오류가 발생했습니다.");
        }
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
