import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  SignUpForm,
  SignUpBox,
  RowBox,
  Input,
  SignUpWrapper,
  Button,
  InputVerify,
} from "./SignUp.styls";

const SignUp = () => {
  const apiUrl = window.ENV?.API_URL;
  const navi = useNavigate();

  const [emailCode, setEmailCode] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [userInfo, setUserInfo] = useState({
    userId: "",
    password: "",
    email: "",
    nickName: "",
    realName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckId = (e) => {
    e.preventDefault();
    axios
      .get(`${apiUrl}/api/users/check-id`, {
        params: {
          userId: userInfo.userId,
        },
      })
      .then((res) => {
        if (res.data.items === 0) {
          alert("사용 가능한 아이디입니다.");
        } else {
          console.log(res);
          alert("이미 사용중인 아이디입니다.");
        }
      })
      .catch((err) => {
        alert("아이디 중복 확인 중 오류가 발생했습니다");
        console.log(err);
      });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/api/auth/email-send`, {
        email: userInfo.email,
      })
      .then((res) => {
        alert("인증번호가 발송되었습니다");
        setIsEmailSend(true);
      })
      .catch((err) => {
        alert("이메일 전송 실패");
        setIsEmailSend(false);
      });
  };

  const handleEmailVerify = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/api/auth/email-verify`, {
        email: userInfo.email,
        code: emailCode,
      })
      .then((res) => {
        alert("인증번호가 일치합니다");
        setIsEmailVerified(true);
      })
      .catch((err) => {
        alert("인증번호가 일치하지 않습니다");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/api/users`, {
        userId: userInfo.userId,
        email: userInfo.email,
        realName: userInfo.realName,
        nickName: userInfo.nickName,
        password: userInfo.password,
      })
      .then((res) => {
        alert("회원가입에 성공하셨습니다");
        navi("/login");
      })
      .catch((err) => {
        console.log("회원가입실패 :", err);
      });
  };

  return (
    <>
      <Container>
        <SignUpForm onSubmit={handleSubmit}>
          <SignUpBox>
            <h2>회원가입</h2>
          </SignUpBox>
          <label>아이디</label>
          <RowBox>
            <InputVerify
              name="userId"
              value={userInfo.userId}
              onChange={handleChange}
            />
            <button type="button" onClick={handleCheckId}>
              중복확인
            </button>
          </RowBox>
          <label>이메일</label>
          <RowBox>
            <InputVerify
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
            />
            <button type="button" onClick={handleSendEmail}>
              전송하기
            </button>
          </RowBox>
          {isEmailSend && (
            <>
              <label>인증번호</label>
              <RowBox>
                <InputVerify
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                />
                <button type="button" onClick={handleEmailVerify}>
                  인증하기
                </button>
              </RowBox>
            </>
          )}
          <label>이름</label>
          <Input
            name="realName"
            value={userInfo.realName}
            onChange={handleChange}
          />
          <label>닉네임</label>
          <Input
            name="nickName"
            value={userInfo.nickName}
            onChange={handleChange}
          />
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />

          <SignUpWrapper>
            <Button type="submit" disabled={!isEmailVerified}>
              회원가입
            </Button>
          </SignUpWrapper>
        </SignUpForm>
      </Container>
    </>
  );
};
export default SignUp;
