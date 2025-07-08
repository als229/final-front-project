import styled, { keyframes } from "styled-components";

// 배경 그라데이션 애니메이션
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 85vh;
  margin: 30px auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  position: relative;
  border: 1px solid rgba(226, 232, 240, 0.8);
`;

export const Header = styled.div`
  padding: 18px 24px;
  background: linear-gradient(120deg, #3b82f6, #0ea5e9, #38bdf8);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &::before {
    content: "\\f041"; /* 지도 마커 아이콘 */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 1.3rem;
  }
`;

export const LocationInfo = styled.div`
  padding: 12px 24px;
  background: rgba(243, 244, 246, 0.8);
  color: #334155;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #e2e8f0;

  &::before {
    content: "\\f3c5"; /* 위치 아이콘 */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: #3b82f6;
  }
`;

export const MessageArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #f8fafc;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

export const MessageRow = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$mine ? "row-reverse" : "row")};
  align-items: flex-end;
  margin-bottom: 2px;

  /* 같은 사람의 연속 메시지에 더 작은 간격 적용 */
  & + & {
    margin-top: ${(props) => (props.$sameUser ? "2px" : "12px")};
  }
`;

export const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e0f2fe;
  margin: 0 8px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 2px solid white;
  color: #3b82f6;
  font-size: 16px;

  &::after {
    content: "\\f2bd"; /* 사용자 아이콘 */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
  }
`;

export const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$mine ? "flex-end" : "flex-start")};
  max-width: 65%;
`;

export const Nickname = styled.div`
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 4px;
  margin-left: 12px;
  font-weight: 600;
`;

export const MessageBubble = styled.div`
  background-color: ${(props) => (props.$mine ? "#3b82f6" : "white")};
  color: ${(props) => (props.$mine ? "white" : "#334155")};
  padding: 10px 16px;
  border-radius: ${(props) =>
    props.$mine ? "18px 18px 4px 18px" : "18px 18px 18px 4px"};
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  position: relative;
  word-break: break-word;

  /* 말풍선 효과 */
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    ${(props) => (props.$mine ? "right: -8px;" : "left: -8px;")};
    width: 16px;
    height: 16px;
    background-color: ${(props) => (props.$mine ? "#3b82f6" : "white")};
    clip-path: ${(props) =>
      props.$mine
        ? "polygon(0 0, 0% 100%, 100% 100%)"
        : "polygon(100% 0, 0 100%, 100% 100%)"};
    display: ${(props) => (props.$isLastOfGroup ? "block" : "none")};
  }
`;

export const MessageTime = styled.div`
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 4px;
  margin-right: ${(props) => (props.$mine ? "4px" : "0")};
  margin-left: ${(props) => (props.$mine ? "0" : "4px")};
`;

export const SystemMessage = styled.div`
  align-self: center;
  background-color: rgba(203, 213, 225, 0.4);
  color: #64748b;
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 12px;
  margin: 10px 0;
  max-width: 80%;
  text-align: center;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  gap: 12px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.03);
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;
  background-color: #f8fafc;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    background-color: white;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 23px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #0ea5e9);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: "\\f1d8"; /* 종이비행기 아이콘 */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 1.1rem;
  }
`;

// 여행 관련 기능을 위한 추가 컴포넌트
export const TravelInfo = styled.div`
  margin-top: auto; /* 하단에 배치 */
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(243, 244, 246, 0.8);
  color: #475569;
  font-size: 0.8rem;
  border-top: 1px solid #e2e8f0;
`;

export const InfoButton = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  background-color: white;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  color: #334155;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    border-color: #94a3b8;
  }

  &::before {
    content: ${(props) => (props.icon ? `"\\${props.icon}"` : '""')};
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    margin-right: 6px;
    color: #3b82f6;
  }
`;
