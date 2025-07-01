import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useWebSocket, { ReadyState } from "react-use-websocket";

import {
  Container,
  Header,
  MessageArea,
  MessageRow,
  ProfileImage,
  MessageInfo,
  Nickname,
  MessageBubble,
  MessageTime,
  InputBox,
  Input,
  SendButton,
} from "./ChatPage.styles";

const ChatPage = () => {
  const { contentNo } = useParams();
  const accessToken = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");
  const ENV_URL = window.ENV?.API_URL;
  const ENV_SOCKET_URL = window.ENV?.SOCKET_URL;
  const navigate = useNavigate();

  const [roomNo, setRoomNo] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(`${ENV_URL}/api/chats/content/${contentNo}`)
      .then((response) => {
        setRoomNo(response.data.roomNo);
      })
      .catch((err) => console.error("채팅방 조회 실패", err));
  }, [contentNo]);

  useEffect(() => {
    if (!roomNo) return;

    axios
      .get(`${ENV_URL}/api/chats/${roomNo}/messages`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setMessages(res.data); // [{ sender, content, time, … }, …]
      })
      .catch((err) => console.error("메시지 조회 실패", err));
  }, [roomNo]);

  // 3) roomNo 가 있어야만 URL 생성, 없으면 null
  const socketUrl = roomNo
    ? `${ENV_SOCKET_URL}/ws/chat/${roomNo}?token=${accessToken}`
    : null;

  // 4) WebSocket 훅
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => console.log("웹소켓 연결 성공"),
      shouldReconnect: () => true,
    }
  );

  // 5) 새로 들어온 메시지(lastJsonMessage)를 state에 쌓기
  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessages((prev) => [...prev, lastJsonMessage]);
    }
  }, [lastJsonMessage]);

  // 6) 전송 함수
  const handleSend = () => {
    if (!input.trim()) return;
    sendJsonMessage({
      roomNo: roomNo,
      messageContent: input.trim(),
    });
    setInput("");
  };

  return (
    <Container>
      <Header>{roomNo}번 채팅방</Header>
      <MessageArea>
        {messages.map((msg, i) => {
          const mine = msg.userId === userId;

          const isLastOfGroup =
            i === messages.length - 1 ||
            msg.userNo !== messages[i + 1]?.userNo ||
            msg.time !== messages[i + 1]?.time;

          return (
            <MessageRow key={i} $mine={mine}>
              {/* {!mine && <ProfileImage src={msg.profileImage} alt="프로필" />} */}
              <MessageInfo $mine={mine}>
                {!mine && <Nickname>{msg.nickname}</Nickname>}
                <MessageBubble $mine={mine}>{msg.messageContent}</MessageBubble>
                {isLastOfGroup && (
                  <MessageTime $mine={mine}>{msg.createDate}</MessageTime>
                )}
              </MessageInfo>
            </MessageRow>
          );
        })}
      </MessageArea>
      <InputBox>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="메시지를 입력하세요"
        />
        <SendButton onClick={handleSend}>전송</SendButton>
      </InputBox>
    </Container>
  );
};

export default ChatPage;
