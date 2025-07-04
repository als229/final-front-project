import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fffdf8;
  font-family: "Pretendard", sans-serif;
`;

export const Header = styled.div`
  padding: 16px;
  background-color: orange;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

export const MessageArea = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MessageRow = styled.div`
  display: flex;
  flex-direction: ${({ $mine }) => ($mine ? "row-reverse" : "row")};
  align-items: flex-start;
  gap: 8px;
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $mine }) => ($mine ? "flex-end" : "flex-start")};
`;

export const Nickname = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #555;
  margin-bottom: 4px;
`;

export const MessageBubble = styled.div`
  background-color: ${({ $mine }) => ($mine ? "#b3e5fc" : "#ffffff")};
  padding: 10px 14px;
  border-radius: 16px;
  border-bottom-right-radius: ${({ $mine }) => ($mine ? "0" : "16px")};
  border-bottom-left-radius: ${({ $mine }) => ($mine ? "16px" : "0")};
  word-break: break-word;
  font-size: 14px;
  color: #333;
  max-width: 240px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const MessageTime = styled.div`
  font-size: 10px;
  color: #999;
  margin-top: 2px;
  margin-left: ${({ $mine }) => ($mine ? "0" : "4px")};
  margin-right: ${({ $mine }) => ($mine ? "4px" : "0")};
  align-self: ${({ $mine }) => ($mine ? "flex-end" : "flex-start")};
`;

export const InputBox = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #ddd;
  background-color: #fff;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

export const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 16px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
`;
