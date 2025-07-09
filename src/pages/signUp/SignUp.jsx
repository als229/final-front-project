import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  userIdRegex,
  passwordRegex,
  realNameRegex,
  nicknameRegex,
  emailRegex,
  codeRegex,
} from "../validation/Validation";

import {
  PageContainer,
  SignupLayout,
  VisualSection,
  FormSection,
  LogoBox,
  LogoText,
  StepsContainer,
  StepItem,
  StepLine,
  FormTitle,
  FormSubtitle,
  SignupForm,
  FormGroup,
  Label,
  InputField,
  InputWithButton,
  InputFieldStyled,
  ActionButton,
  HelpText,
  SubmitButtonWrapper,
  SubmitButton,
  LoginLink,
} from "./SignUp.styls";

const SignUp = () => {
  const apiUrl = window.ENV?.API_URL;
  const navi = useNavigate();

  const [emailCode, setEmailCode] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 현재 활성화된 단계
  const [userInfo, setUserInfo] = useState({
    userId: "",
    password: "",
    email: "",
    nickName: "",
    realName: "",
  });

  // 회원가입 단계 진행 관리
  useEffect(() => {
    if (isIdChecked) {
      setActiveStep(2);
    }
    if (isEmailVerified) {
      setActiveStep(3);
    }
  }, [isIdChecked, isEmailVerified]);

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
        const errorCode = err.response?.data?.code;
        const message = err.response?.data?.message;
        if (errorCode === "E400_DULPICATION_EMAIL") {
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
        const errorCode = err.response?.data?.code;
        const message = err.response?.data?.message;

        if (errorCode === "E400_DUPLICATION_NICKNAME") {
          alert(message);
        } else {
          alert("알 수 없는 오류가 발생했습니다");
        }
      });
  };

  return (
    <PageContainer>
      <SignupLayout>
        <VisualSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="content"
          >
            <h2>
              새로운 여행의
              <br />
              시작점
            </h2>
            <p>회원가입하고 특별한 여행 경험을 만나보세요</p>
          </motion.div>
        </VisualSection>

        <FormSection>
          <LogoBox>
            <LogoText>
              놀러 <span>Way</span>
            </LogoText>
          </LogoBox>

          <StepsContainer>
            <StepItem $active={activeStep >= 1} $completed={activeStep > 1}>
              <div className="step-number">1</div>
              <div className="step-text">계정 생성</div>
            </StepItem>

            <StepLine $active={activeStep > 1} />

            <StepItem $active={activeStep >= 2} $completed={activeStep > 2}>
              <div className="step-number">2</div>
              <div className="step-text">이메일 인증</div>
            </StepItem>

            <StepLine $active={activeStep > 2} />

            <StepItem $active={activeStep >= 3}>
              <div className="step-number">3</div>
              <div className="step-text">정보 입력</div>
            </StepItem>
          </StepsContainer>

          <FormTitle>회원가입</FormTitle>
          <FormSubtitle>여행 동반자가 되어주세요</FormSubtitle>

          <SignupForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="userId">
                <i className="fas fa-user"></i> 아이디
              </Label>
              <InputWithButton>
                <InputFieldStyled
                  id="userId"
                  name="userId"
                  value={userInfo.userId}
                  onChange={handleChange}
                  placeholder="영문/숫자 조합 4-20자"
                  $valid={isIdChecked}
                />
                <ActionButton type="button" onClick={handleCheckId}>
                  중복확인
                </ActionButton>
              </InputWithButton>
              <HelpText>영문자로 시작하는 4~20자 영문자/숫자 조합</HelpText>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                <i className="fas fa-envelope"></i> 이메일
              </Label>
              <InputWithButton>
                <InputFieldStyled
                  id="email"
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  placeholder="이메일 주소 입력"
                  disabled={!isIdChecked}
                  $valid={isEmailVerified}
                />
                <ActionButton
                  type="button"
                  disabled={!isIdChecked}
                  onClick={handleSendEmail}
                >
                  인증번호 발송
                </ActionButton>
              </InputWithButton>
            </FormGroup>

            {isEmailSend && (
              <FormGroup>
                <Label htmlFor="emailCode">
                  <i className="fas fa-key"></i> 인증번호
                </Label>
                <InputWithButton>
                  <InputFieldStyled
                    id="emailCode"
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    placeholder="6자리 인증번호 입력"
                    $valid={isEmailVerified}
                  />
                  <ActionButton type="button" onClick={handleEmailVerify}>
                    인증하기
                  </ActionButton>
                </InputWithButton>
                <HelpText>이메일로 발송된 6자리 인증번호를 입력하세요</HelpText>
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="realName">
                <i className="fas fa-id-card"></i> 이름
              </Label>
              <InputField
                id="realName"
                name="realName"
                value={userInfo.realName}
                onChange={handleChange}
                placeholder="실명을 입력하세요"
                disabled={!isEmailVerified}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nickName">
                <i className="fas fa-smile"></i> 닉네임
              </Label>
              <InputField
                id="nickName"
                name="nickName"
                value={userInfo.nickName}
                onChange={handleChange}
                placeholder="사용할 닉네임 입력"
                disabled={!isEmailVerified}
              />
              <HelpText>영문/숫자 2~30자 또는 한글 2~5자</HelpText>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">
                <i className="fas fa-lock"></i> 비밀번호
              </Label>
              <InputField
                id="password"
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                placeholder="비밀번호 입력"
                disabled={!isEmailVerified}
              />
              <HelpText>영문+숫자 조합 6~30자 (공백 없이)</HelpText>
            </FormGroup>

            <SubmitButtonWrapper>
              <SubmitButton
                type="submit"
                disabled={!isEmailVerified}
                as={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-user-plus"></i> 여행 시작하기
              </SubmitButton>
            </SubmitButtonWrapper>

            <LoginLink>
              이미 회원이신가요?{" "}
              <a onClick={() => navi("/login")}>로그인하기</a>
            </LoginLink>
          </SignupForm>
        </FormSection>
      </SignupLayout>
    </PageContainer>
  );
};

export default SignUp;
