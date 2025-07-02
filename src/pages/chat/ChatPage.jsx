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
  const nickName = sessionStorage.getItem("nickName");
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
        const enriched = res.data.map((msg) => ({
          ...msg,
          mine: msg.userId?.toString() === userId?.toString(),
        }));
        setMessages(enriched);
      })
      .catch((err) => console.error("메시지 조회 실패", err));
  }, [roomNo]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom(false);
    }
  }, [messages]);

  // 3) roomNo 가 있어야만 URL 생성, 없으면 null
  const socketUrl = roomNo
    ? `${ENV_SOCKET_URL}/ws/chat/${roomNo}?token=${accessToken}`
    : null;

  // 4) WebSocket 훅
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => console.log("웹소켓 연결 성공"),
      onMessage: (event) => {
        try {
          console.log("서버 수신:", JSON.parse(event.data));
        } catch (e) {}
      },
      onClose: () => {
        setMessages((prev) => [
          ...prev,
          { messageContent: "연결이 끊어졌습니다." },
        ]);
      },
      shouldReconnect: (e) => {
        return e.reason !== "새 창에서 재접속되어 이전 연결을 종료합니다.";
      },
    }
  );

  // 6) 전송 함수
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (!trimmed || readyState !== ReadyState.OPEN) {
      alert("현재 연결 상태가 아닙니다.");
      return;
    }

    const now = new Date();
    const formattedTime = now
      .toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .padStart(5, "0"); // HH:MM 형식

    // 1. 메시지 WebSocket으로 전송
    sendJsonMessage({
      roomNo: roomNo,
      messageContent: trimmed,
      userId: userId,
      nickname: nickName,
      createTime: formattedTime,
    });

    setInput("");

    // 3. 아래로 스크롤
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const isScrolledToBottom = () => {
    const c = messagesEndRef.current?.parentNode;
    return c && c.scrollHeight - c.scrollTop - c.clientHeight < 50;
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log("◀ lastJsonMessage:", lastJsonMessage);
      setMessages((prev) => [...prev, lastJsonMessage]);

      // 메시지 수신 후 자동 스크롤 (단, 내 메시지가 아니고 맨 아래면)
      const mine = lastJsonMessage.mine;
      if (!mine && isScrolledToBottom())
        setTimeout(() => scrollToBottom(true), 100);
    }
  }, [lastJsonMessage]);

  return (
    <Container>
      <Header>{roomNo}번 채팅방</Header>
      <MessageArea>
        {messages.map((msg, i) => {
          const mine = msg.mine;

          const nextMsg = messages[i + 1];

          // 같은 사람이 다음에 없거나 → 마지막 연속 메시지다
          const isLastOfGroup =
            !nextMsg ||
            nextMsg.userId !== msg.userId ||
            nextMsg.createTime !== msg.createTime;

          return (
            <MessageRow key={i} $mine={mine}>
              {/* {!mine && <ProfileImage src={msg.profileImage} alt="프로필" />} */}
              <MessageInfo $mine={mine}>
                {!mine && <Nickname>{msg.nickname}</Nickname>}
                <MessageBubble $mine={mine}>{msg.messageContent}</MessageBubble>
                {isLastOfGroup && (
                  <MessageTime $mine={mine}>{msg.createTime}</MessageTime>
                )}
              </MessageInfo>
            </MessageRow>
          );
        })}
        <div ref={messagesEndRef} />
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
