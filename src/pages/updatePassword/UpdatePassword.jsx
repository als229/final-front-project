import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { passwordRegex } from "../validation/Validation";
import {
  PageContainer,
  PageHeader,
  HeaderImage,
  HeaderOverlay,
  HeaderContent,
  ContentContainer,
  FormCard,
  FormTitle,
  FormDescription,
  SecurityIcon,
  UpdateForm,
  FormGroup,
  Label,
  InputField,
  InputIcon,
  PasswordStrength,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  PasswordTips,
} from "./UpdatePassword.styls";

const UpdatePassword = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const { logout, auth } = useContext(AuthContext);

  const [changePw, setChangePw] = useState({
    password: "",
    newPassword: "",
  });

  const [newPasswordVerify, setNewPasswordVerify] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 비밀번호 강도 체크
    if (!changePw.newPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (changePw.newPassword.length >= 8) strength += 1;
    if (/[A-Z]/.test(changePw.newPassword)) strength += 1;
    if (/[0-9]/.test(changePw.newPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(changePw.newPassword)) strength += 1;

    setPasswordStrength(strength);
  }, [changePw.newPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePw((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!changePw.password.trim()) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    if (!changePw.newPassword.trim()) {
      alert("새 비밀번호를 입력해주세요.");
      return;
    }

    if (!passwordRegex.test(changePw.newPassword)) {
      alert("비밀번호는 영문+숫자 조합 6~30자, 공백 없이 입력해야 합니다.");
      return;
    }

    if (changePw.newPassword !== newPasswordVerify) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);

    axios
      .put(`${apiUrl}/api/users/update-pw`, changePw, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        logout();
        navi("/login");
      })
      .catch((err) => {
        const errorCode = err.response?.data?.code;
        const message = err.response?.data?.message;

        if (errorCode === "E401_INVALID_PASSWORD") {
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
      <PageHeader>
        <HeaderImage />
        <HeaderOverlay />
        <HeaderContent>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            여행의 안전을 위한
            <br />
            비밀번호 변경
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            새로운 여정을 위한 안전한 첫걸음
          </motion.p>
        </HeaderContent>
      </PageHeader>

      <ContentContainer>
        <FormCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SecurityIcon className="fas fa-shield-alt" />
          <FormTitle>비밀번호 재설정</FormTitle>
          <FormDescription>
            안전한 여행을 위해 주기적으로 비밀번호를 변경해주세요. 다른
            사이트에서 사용하지 않은 고유한 비밀번호를 설정하는 것이 좋습니다.
          </FormDescription>

          <UpdateForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="current-password">
                <i className="fas fa-lock"></i> 현재 비밀번호
              </Label>
              <InputField
                id="current-password"
                type="password"
                name="password"
                value={changePw.password}
                onChange={handleChange}
                placeholder="현재 사용 중인 비밀번호"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="new-password">
                <i className="fas fa-lock-open"></i> 새 비밀번호
              </Label>
              <InputField
                id="new-password"
                type="password"
                name="newPassword"
                value={changePw.newPassword}
                onChange={handleChange}
                placeholder="새로운 비밀번호 입력"
              />
              <PasswordStrength strength={passwordStrength}>
                <div className="bar"></div>
                <span>
                  {passwordStrength === 0
                    ? "비밀번호를 입력하세요"
                    : passwordStrength === 1
                    ? "취약"
                    : passwordStrength === 2
                    ? "보통"
                    : passwordStrength === 3
                    ? "강함"
                    : "매우 강함"}
                </span>
              </PasswordStrength>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirm-password">
                <i className="fas fa-check-circle"></i> 새 비밀번호 확인
              </Label>
              <InputField
                id="confirm-password"
                type="password"
                value={newPasswordVerify}
                onChange={(e) => setNewPasswordVerify(e.target.value)}
                placeholder="새 비밀번호 재입력"
                $valid={
                  newPasswordVerify &&
                  changePw.newPassword === newPasswordVerify
                }
              />
            </FormGroup>

            <PasswordTips>
              <h4>
                <i className="fas fa-lightbulb"></i> 안전한 비밀번호 팁
              </h4>
              <ul>
                <li>대소문자, 숫자, 특수문자를 조합해 사용하세요</li>
                <li>개인정보(생일, 전화번호 등)를 포함하지 마세요</li>
                <li>최소 8자 이상 사용하는 것이 좋습니다</li>
              </ul>
            </PasswordTips>

            <ButtonGroup>
              <SubmitButton
                type="submit"
                disabled={isLoading}
                as={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i> 처리 중...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle"></i> 비밀번호 변경하기
                  </>
                )}
              </SubmitButton>

              <CancelButton
                type="button"
                onClick={() => navi("/mypage")}
                as={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-times-circle"></i> 취소하기
              </CancelButton>
            </ButtonGroup>
          </UpdateForm>
        </FormCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default UpdatePassword;
