import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Modal from "../../components/common/modal/Modal";
import {
  ModalTitle,
  MemberInfo,
  FormField,
  ActionButton,
  ButtonGroup,
} from "./Member.styles";

const Member = ({ member, isOpen, onClose, onUpdateSuccess }) => {
  const apiUrl = window.ENV?.API_URL;
  const { auth } = useContext(AuthContext);

  const [currentNickname, setCurrentNickname] = useState(member.nickname);
  const [currentStatus, setCurrentStatus] = useState(member.status);

  const handleNicknameChange = () => {
    if (currentNickname === member.nickname) {
      alert("변경할 닉네임이 현재 닉네임과 같습니다.");
      return;
    }
    if (currentNickname.trim() === "") {
      alert("닉네임은 빈 문자열일 수 없습니다.");
      return;
    }
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
      });
  };

  const handleStatusChange = () => {
    if (currentStatus === member.status) {
      alert("변경할 상태가 현재 상태와 같습니다.");
      return;
    }
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
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>회원 정보 수정</ModalTitle>

      <MemberInfo>
        <p>
          <strong>회원 번호:</strong> {member.userNo}
        </p>
        <p>
          <strong>아이디:</strong> {member.userId}
        </p>
        <p>
          <strong>현재 닉네임:</strong> {member.nickname}
        </p>
        <p>
          <strong>현재 상태:</strong>{" "}
          {member.status === "Y" ? "활성" : "비활성"}
        </p>
      </MemberInfo>

      <FormField>
        <label htmlFor="nicknameInput">닉네임 변경:</label>
        <input
          id="nicknameInput"
          type="text"
          value={currentNickname}
          onChange={(e) => setCurrentNickname(e.target.value)}
        />
        <ActionButton onClick={handleNicknameChange}>닉네임 저장</ActionButton>
      </FormField>

      <FormField>
        <label htmlFor="statusSelect">상태 변경:</label>
        <select
          id="statusSelect"
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
        >
          <option value="Y">활성 (Y)</option>
          <option value="N">비활성 (N)</option>
        </select>
        <ActionButton onClick={handleStatusChange}>상태 저장</ActionButton>
      </FormField>

      <ButtonGroup>
        <ActionButton className="cancel" onClick={onClose}>
          닫기
        </ActionButton>
      </ButtonGroup>
    </Modal>
  );
};

export default Member;
