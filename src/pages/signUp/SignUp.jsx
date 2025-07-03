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
import {
  userIdRegex,
  passwordRegex,
  realNameRegex,
  nicknameRegex,
  emailRegex,
  codeRegex,
} from "../validation/Validation";

const SignUp = () => {
  const apiUrl = window.ENV?.API_URL;
  const navi = useNavigate();

  const [emailCode, setEmailCode] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    password: "",
    email: "",
    nickName: "",
    realName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "userId") {
      setIsIdChecked(false);
    }
  };
  const handleCheckId = (e) => {
    e.preventDefault();
    if (!userInfo.userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!userIdRegex.test(userInfo.userId)) {
      alert("아이디는 영문자로 시작하는 4~20자의 영문자 또는 숫자 조합입니다.");
      return;
    }

    axios
      .get(`${apiUrl}/api/users/check-id`, {
        params: {
          userId: userInfo.userId,
        },
      })
      .then((res) => {
        if (res.data.items === 0) {
          alert("사용 가능한 아이디입니다.");
          setIsIdChecked(true);
        } else {
          alert("이미 사용중인 아이디입니다.");
          setIsIdChecked(false);
        }
      })
      .catch((err) => {
        alert("아이디 중복 확인 중 오류가 발생했습니다");
        console.log(err);
      });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!userInfo.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(userInfo.email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    axios
      .post(`${apiUrl}/api/auth/email-send`, {
        email: userInfo.email,
      })
      .then((res) => {
        alert("인증번호가 발송되었습니다");
        setIsEmailSend(true);
      })
      .catch((err) => {
        const errorCode = err.response.data.code;
        const message = err.response.data.message;
        if (errorCode == "E400_DULPICATION_EMAIL") {
          alert(message);
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
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

    if (!userInfo.userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!userIdRegex.test(userInfo.userId)) {
      alert("아이디는 영문자로 시작하는 4~20자의 영문자 또는 숫자 조합입니다.");
      return;
    }

    if (!userInfo.password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(userInfo.password)) {
      alert("비밀번호는 영문+숫자 조합 6~30자, 공백 없이 입력해야 합니다.");
      return;
    }

    if (!userInfo.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(userInfo.email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (!userInfo.nickName.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!nicknameRegex.test(userInfo.nickName)) {
      alert("닉네임은 영문/숫자 2~30자 또는 한글 2~5자여야 합니다.");
      return;
    }

    if (!userInfo.realName.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!realNameRegex.test(userInfo.realName)) {
      alert("이름은 영문 2~30자 또는 한글 2~5자여야 합니다.");
      return;
    }
    if (!emailCode) {
      alert("인증코드를 입력해주세요.");
      return;
    }

    if (!codeRegex.test(emailCode)) {
      alert("인증코드는 숫자 6자리여야 합니다.");
      return;
    }
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
        const errorCode = err.response.data.code;
        const message = err.response.data.message;

        if (errorCode == "E400_DUPLICATION_NICKNAME") {
          alert(message);
        } else {
          alert("알 수 없는 오류가 발생했습니다");
        }
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
              disabled={!isIdChecked}
            />
            <button
              type="button"
              disabled={!isIdChecked}
              onClick={handleSendEmail}
            >
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
