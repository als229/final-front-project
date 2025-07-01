import axios from "axios";
import { useContext, useState, useEffect } from "react";
import {
  Container,
  LoginForm,
  LoginBox,
  FindWrapper,
  Wrapper,
  Button,
  Input,
} from "./Login.styls";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;

  const { login } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/api/auth/tokens`, loginInfo)
      .then((res) => {
        const data = res.data.items;

        login(
          data.userId,
          data.nickName,
          data.realName,
          data.email,
          data.accessToken,
          data.refreshToken
        );
        console.log(res.data.items);
        alert("로그인에 성공하셨습니다.");
        navi("/");
      })
      .catch((err) => {
        alert("로그인 실패");
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <LoginForm onSubmit={handleSubmit}>
          <LoginBox>
            <h2>로그인</h2>
          </LoginBox>
          <label>아이디</label>
          <Input
            name="userId"
            value={loginInfo.userId}
            onChange={handleChange}
          />
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
          />
          <FindWrapper>
            <button
              type="button"
              onClick={() => {
                navi("/findId");
              }}
            >
              아이디찾기
            </button>
            <button
              type="button"
              onClick={() => {
                navi("/findPw");
              }}
            >
              비밀번호찾기
            </button>
          </FindWrapper>
          <Wrapper>
            <Button type="submit">로그인</Button>
          </Wrapper>
          <Wrapper>
            <Button
              type="button"
              onClick={() => {
                navi("/signUp");
              }}
            >
              회원가입
            </Button>
          </Wrapper>
        </LoginForm>
      </Container>
    </>
  );
};
export default Login;
