import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Modal from "../../components/common/modal/Modal";
import {
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  MemberInfoCard,
  MemberInfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  StatusIndicator,
  FormSection,
  FormTitle,
  FormGroup,
  InputLabel,
  StyledInput,
  StyledSelect,
  ButtonGroup,
  ActionButton,
  SaveButton,
  CancelButton,
  Divider,
} from "./Member.styles";

const Member = ({ member, isOpen, onClose, onUpdateSuccess }) => {
  const apiUrl = window.ENV?.API_URL;
  const { auth } = useContext(AuthContext);

  const [currentNickname, setCurrentNickname] = useState(
    member.nickName || member.nickname || ""
  );
  const [currentStatus, setCurrentStatus] = useState(member.status);
  const [isNicknameSaving, setIsNicknameSaving] = useState(false);
  const [isStatusSaving, setIsStatusSaving] = useState(false);

  const handleNicknameChange = () => {
    if (currentNickname === (member.nickName || member.nickname)) {
      alert("변경할 닉네임이 현재 닉네임과 같습니다.");
      return;
    }
    if (currentNickname.trim() === "") {
      alert("닉네임은 빈 문자열일 수 없습니다.");
      return;
    }

    setIsNicknameSaving(true);
    const dto = {
      userNo: member.userNo,
      nickName: currentNickname.trim(),
    };

    axios
      .put(`${apiUrl}/api/systm/member/nickName`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        if (res.status === 200 && res.data) {
          alert("닉네임이 성공적으로 변경되었습니다.");
          onUpdateSuccess();
        } else {
          alert(
            res.data
              ? `${res.data.code} ${res.data.message}`
              : "닉네임 변경에 실패했습니다."
          );
        }
      })
      .catch((err) => {
        console.error("닉네임 변경 중 오류 발생:", err);
        alert("닉네임 변경 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setIsNicknameSaving(false);
      });
  };

  const handleStatusChange = () => {
    if (currentStatus === member.status) {
      alert("변경할 상태가 현재 상태와 같습니다.");
      return;
    }

    setIsStatusSaving(true);
    const dto = {
      userNo: member.userNo,
      status: currentStatus,
    };

    axios
      .put(`${apiUrl}/api/systm/member/status`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((response) => {
        if (
          response.status === 200 &&
          response.data &&
          response.data.code === "M101"
        ) {
          alert("회원 상태가 성공적으로 변경되었습니다.");
          onUpdateSuccess();
        } else {
          alert(
            response.data
              ? `${response.data.code} ${response.data.message}`
              : "회원 상태 변경에 실패했습니다."
          );
        }
      })
      .catch((err) => {
        console.error("회원 상태 변경 중 오류 발생:", err);
        alert("회원 상태 변경 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setIsStatusSaving(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            <i className="fas fa-user-edit"></i> 회원 정보 관리
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <MemberInfoCard>
            <MemberInfoGrid>
              <InfoItem>
                <InfoLabel>회원 번호</InfoLabel>
                <InfoValue>{member.userNo}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>아이디</InfoLabel>
                <InfoValue>{member.userId}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>이름</InfoLabel>
                <InfoValue>{member.realName || "미설정"}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>닉네임</InfoLabel>
                <InfoValue>{member.nickName || member.nickname}</InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>가입일</InfoLabel>
                <InfoValue>
                  {member.createdTime
                    ? new Date(member.createdTime).toLocaleDateString()
                    : "정보 없음"}
                </InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoLabel>상태</InfoLabel>
                <InfoValue>
                  <StatusIndicator $active={member.status === "Y"}>
                    {member.status === "Y" ? "활성" : "비활성"}
                  </StatusIndicator>
                </InfoValue>
              </InfoItem>
            </MemberInfoGrid>
          </MemberInfoCard>

          <Divider />

          <FormSection>
            <FormTitle>회원 정보 수정</FormTitle>

            <FormGroup>
              <InputLabel htmlFor="nicknameInput">닉네임 변경</InputLabel>
              <StyledInput
                id="nicknameInput"
                type="text"
                value={currentNickname}
                onChange={(e) => setCurrentNickname(e.target.value)}
                placeholder="새 닉네임 입력"
              />
              <SaveButton
                onClick={handleNicknameChange}
                disabled={
                  isNicknameSaving ||
                  currentNickname === (member.nickName || member.nickname)
                }
              >
                {isNicknameSaving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> 저장 중...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i> 닉네임 저장
                  </>
                )}
              </SaveButton>
            </FormGroup>

            <FormGroup>
              <InputLabel htmlFor="statusSelect">계정 상태 변경</InputLabel>
              <StyledSelect
                id="statusSelect"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
              >
                <option value="Y">활성 계정</option>
                <option value="N">비활성 계정</option>
              </StyledSelect>
              <SaveButton
                onClick={handleStatusChange}
                disabled={isStatusSaving || currentStatus === member.status}
              >
                {isStatusSaving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> 저장 중...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i> 상태 저장
                  </>
                )}
              </SaveButton>
            </FormGroup>
          </FormSection>

          <ButtonGroup>
            <CancelButton onClick={onClose}>
              <i className="fas fa-times"></i> 닫기
            </CancelButton>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Member;
