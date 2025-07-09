import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { realNameRegex, emailRegex } from "../validation/Validation";
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
} from "./FindId.styls";

const FindId = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const [isLoading, setIsLoading] = useState(false);

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
      alert("이름을 입력해주세요.");
      return;
    }

    if (!realNameRegex.test(findIdInfo.realName)) {
      alert("올바른 이름 형식을 입력해주세요.");
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

    setIsLoading(true);

    axios
      .post(`${apiUrl}/api/auth/find-id`, findIdInfo)
      .then(() => {
        alert("아이디가 이메일로 전송되었습니다");
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
              여행의 기억을
              <br />
              되찾아 드립니다
            </h2>
            <p>아이디를 잊으셨나요? 걱정 마세요, 함께 찾아드릴게요</p>
          </motion.div>
        </VisualSection>

        <FormSection>
          <LogoText>
            놀러 <span>Way</span>
          </LogoText>

          <FormTitle>아이디 찾기</FormTitle>
          <FormSubtitle>
            가입 시 입력한 정보로 아이디를 찾을 수 있습니다
          </FormSubtitle>

          <StyledForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="realName">
                <i className="fas fa-user"></i> 이름
              </Label>
              <InputField
                id="realName"
                type="text"
                name="realName"
                value={findIdInfo.realName}
                onChange={handleChange}
                placeholder="가입 시 입력한 이름"
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
                value={findIdInfo.email}
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
                  <i className="fas fa-paper-plane"></i>
                  이메일로 아이디 발송
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

export default FindId;
