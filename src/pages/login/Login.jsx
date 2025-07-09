import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { userIdRegex, passwordRegex } from "../validation/Validation";
import { motion } from "framer-motion";
import {
  PageContainer,
  ContentWrapper,
  LoginContainer,
  ImageSection,
  FormSection,
  LogoArea,
  Logo,
  FormTitle,
  SubTitle,
  StyledForm,
  InputGroup,
  Label,
  InputField,
  InputIcon,
  ForgotLinksContainer,
  ForgotLink,
  LoginButton,
  SignupContainer,
  SignupText,
  SignupButton,
} from "./Login.styls";

const Login = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const { login } = useContext(AuthContext);

  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginInfo.userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!userIdRegex.test(loginInfo.userId)) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!loginInfo.password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(loginInfo.password)) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

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
        alert("로그인에 성공하셨습니다.");
        navi("/");
      })
      .catch((err) => {
        const errorCode = err.response?.data?.code;
        const message = err.response?.data?.message;

        if (errorCode === "E401_INVALID_ID or PW") {
          alert(message);
        } else {
          alert("알 수 없는 오류가 발생했습니다");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <LoginContainer>
          <ImageSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>
                새로운 여행을 <br />
                떠나볼 시간
              </h2>
              <p>지금 로그인하고 잊지 못할 추억을 만들어보세요</p>
            </motion.div>
          </ImageSection>

          <FormSection>
            <LogoArea>
              <Logo>
                놀러 <span>Way</span>
              </Logo>
            </LogoArea>

            <FormTitle>로그인</FormTitle>
            <SubTitle>계정에 로그인하고 여행을 시작하세요</SubTitle>

            <StyledForm onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmlFor="userId">아이디</Label>
                <InputField
                  id="userId"
                  name="userId"
                  placeholder="아이디를 입력하세요"
                  value={loginInfo.userId}
                  onChange={handleChange}
                />
                <InputIcon className="fas fa-user" />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="password">비밀번호</Label>
                <InputField
                  id="password"
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  value={loginInfo.password}
                  onChange={handleChange}
                />
                <InputIcon className="fas fa-lock" />
              </InputGroup>

              <ForgotLinksContainer>
                <ForgotLink onClick={() => navi("/findId")}>
                  <i className="fas fa-question-circle"></i> 아이디 찾기
                </ForgotLink>
                <ForgotLink onClick={() => navi("/findPw")}>
                  <i className="fas fa-key"></i> 비밀번호 찾기
                </ForgotLink>
              </ForgotLinksContainer>

              <LoginButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> 처리 중...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i> 로그인
                  </>
                )}
              </LoginButton>
            </StyledForm>

            <SignupContainer>
              <SignupText>아직 회원이 아니신가요?</SignupText>
              <SignupButton onClick={() => navi("/signUp")}>
                <i className="fas fa-user-plus"></i> 회원가입
              </SignupButton>
            </SignupContainer>
          </FormSection>
        </LoginContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Login;
