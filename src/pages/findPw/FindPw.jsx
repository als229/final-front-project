import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { userIdRegex, emailRegex } from "../validation/Validation";
import {
  PageContainer,
  FormContainer,
  VisualSection,
  FormSection,
  LogoText,
  FormTitle,
  FormSubtitle,
  StyledForm,
  FormGroup,
  Label,
  InputField,
  SubmitButton,
  BackToLogin,
  LoadingSpinner,
} from "./FindPw.styls";

const FindPw = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const [findPwInfo, setFindPwInfo] = useState({
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
    if (!findPwInfo.userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!userIdRegex.test(findPwInfo.userId)) {
      alert("아이디는 영문자로 시작하는 4~20자의 영문자 또는 숫자 조합입니다.");
      return;
    }

    if (!findPwInfo.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(findPwInfo.email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    axios
      .post(`${apiUrl}/api/auth/find-pw`, findPwInfo)
      .then(() => {
        alert("비밀번호가 이메일로 전송되었습니다.");
        navi("/login");
      })
      .catch((err) => {
        const errorCode = err.response?.data?.code;
        const message = err.response?.data?.message;

        if (errorCode === "E404_INVALID_ACCOUNT") {
          alert(message);
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <PageContainer>
      <FormContainer>
        <VisualSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="content"
          >
            <h2>
              여행의 <br />
              열쇠를 찾아드려요
            </h2>
            <p>
              비밀번호를 분실하셨나요? 회원정보를 확인 후 재설정할 수 있습니다
            </p>
          </motion.div>
        </VisualSection>

        <FormSection>
          <LogoText>
            놀러 <span>Way</span>
          </LogoText>

          <FormTitle>비밀번호 찾기</FormTitle>
          <FormSubtitle>
            가입 시 등록한 정보로 임시 비밀번호를 받으실 수 있습니다
          </FormSubtitle>

          <StyledForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="userId">
                <i className="fas fa-user"></i> 아이디
              </Label>
              <InputField
                id="userId"
                type="text"
                name="userId"
                value={findPwInfo.userId}
                onChange={handleChange}
                placeholder="가입 시 입력한 아이디"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                <i className="fas fa-envelope"></i> 이메일
              </Label>
              <InputField
                id="email"
                type="email"
                name="email"
                value={findPwInfo.email}
                onChange={handleChange}
                placeholder="가입 시 입력한 이메일"
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isLoading}
              as={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="fas fa-circle-notch fa-spin" />
                  처리 중...
                </>
              ) : (
                <>
                  <i className="fas fa-key"></i>
                  임시 비밀번호 발송
                </>
              )}
            </SubmitButton>

            <BackToLogin type="button" onClick={() => navi("/login")}>
              <i className="fas fa-arrow-left"></i> 로그인 페이지로 돌아가기
            </BackToLogin>
          </StyledForm>
        </FormSection>
      </FormContainer>
    </PageContainer>
  );
};

export default FindPw;
