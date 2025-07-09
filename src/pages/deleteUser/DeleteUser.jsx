import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import {
  PageContainer,
  PageHeader,
  HeaderImage,
  HeaderOverlay,
  HeaderContent,
  FormContainer,
  DeleteForm,
  FormTitle,
  FormDescription,
  StyledList,
  StyledListItem,
  FormGroup,
  Label,
  InputField,
  CheckboxWrapper,
  StyledCheckbox,
  CheckboxLabel,
  ButtonGroup,
  ConfirmButton,
  CancelButton,
  FarewellMessage,
} from "./DeleteUser.styls";

const DeleteUser = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const { auth, logout } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!checked) {
      alert("안내 사항을 확인하고 체크해주세요.");
      return;
    }

    setIsLoading(true);

    const deleteInfo = {
      password: password,
      refreshToken: localStorage.getItem("refreshToken"),
    };

    axios
      .delete(`${apiUrl}/api/users/delete`, {
        data: deleteInfo,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        alert("회원 탈퇴가 완료되었습니다");
        logout();
        navi("/login");
      })
      .catch((err) => {
        const errorCode = err.response?.data?.code;
        const message = err.response?.data?.message;

        if (errorCode === "E401_INVALID_PASSWORD") {
          alert(message);
        } else {
          alert("알 수 없는 오류가 발생했습니다");
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
            여행의 끝이 아닌
            <br />
            잠시 멈춤입니다
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            언제든 다시 놀러Way와 함께할 수 있습니다
          </motion.p>
        </HeaderContent>
      </PageHeader>

      <FormContainer>
        <DeleteForm
          as={motion.form}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <FormTitle>회원 탈퇴</FormTitle>
          <FormDescription>
            탈퇴하시기 전에 아래 정보를 꼭 확인해주세요
          </FormDescription>

          <StyledList>
            <StyledListItem>
              <i className="fas fa-exclamation-circle"></i>
              회원에서 탈퇴하시면 현재 사용중이신 계정을 더 이상 사용할 수 없게
              됩니다.
            </StyledListItem>

            <StyledListItem>
              <i className="fas fa-exclamation-circle"></i>한 번 삭제된 계정은
              이전 상태로 복구할 수 없습니다. 계정이 삭제되면 해당 계정의 정보
              및 사용 이력을 더 이상 조회할 수 없게 됩니다.
            </StyledListItem>

            <StyledListItem>
              <i className="fas fa-plane"></i>
              한번 탈퇴한 사용자라 하더라도 언제든 다시 놀러Way에 회원 가입을 할
              수 있습니다.
            </StyledListItem>
          </StyledList>

          <FormGroup>
            <Label htmlFor="password">
              <i className="fas fa-lock"></i> 현재 비밀번호
            </Label>
            <InputField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
          </FormGroup>

          <CheckboxWrapper>
            <StyledCheckbox
              type="checkbox"
              id="confirm-check"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <CheckboxLabel htmlFor="confirm-check">
              위 내용을 모두 확인했습니다
            </CheckboxLabel>
          </CheckboxWrapper>

          <FarewellMessage>
            <i className="fas fa-map-marker-alt"></i>
            놀러Way와 함께한 여행의 추억은 언제나 소중합니다
          </FarewellMessage>

          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={() => navi("/mypage")}
              as={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-arrow-left"></i> 마이페이지로 돌아가기
            </CancelButton>

            <ConfirmButton
              type="submit"
              disabled={!checked || isLoading}
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
                  <i className="fas fa-user-minus"></i> 회원 탈퇴하기
                </>
              )}
            </ConfirmButton>
          </ButtonGroup>
        </DeleteForm>
      </FormContainer>
    </PageContainer>
  );
};

export default DeleteUser;
