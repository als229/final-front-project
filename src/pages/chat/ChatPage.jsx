import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const accessToken =
    searchParams.get("accessToken") || sessionStorage.getItem("accessToken");
  const userId = searchParams.get("userId") || sessionStorage.getItem("userId");
  const nickName =
    searchParams.get("nickName") || sessionStorage.getItem("nickName");

  const ENV_URL = window.ENV?.API_URL;
  const ENV_SOCKET_URL = window.ENV?.SOCKET_URL;

  // URL 파라미터로 전달된 토큰을 sessionStorage에 저장 (현재 세션에서 사용 가능하도록)
  useEffect(() => {
    if (searchParams.get("accessToken")) {
      sessionStorage.setItem("accessToken", searchParams.get("accessToken"));
    }
    if (searchParams.get("userId")) {
      sessionStorage.setItem("userId", searchParams.get("userId"));
    }
    if (searchParams.get("nickName")) {
      sessionStorage.setItem("nickName", searchParams.get("nickName"));
    }

    // 디버깅 코드 추가
    console.log("URL 토큰:", searchParams.get("accessToken"));
    console.log("세션 토큰:", sessionStorage.getItem("accessToken"));
    console.log("최종 사용 토큰:", accessToken);
    console.log("userId:", userId);
    console.log("nickName:", nickName);
  }, [searchParams]);

  const contentTitle = searchParams.get("title") || "채팅방";

  const [roomNo, setRoomNo] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(`${ENV_URL}/api/chats/content/${contentNo}`)
      .then((response) => {
        setRoomNo(response.data.roomNo);
        console.log("채팅방 조회 성공:", response.data);
      })
      .catch((err) => console.error("채팅방 조회 실패", err));
  }, [contentNo, ENV_URL]);

  useEffect(() => {
    if (!roomNo) return;

    axios
      .get(`${ENV_URL}/api/chats/${roomNo}/messages`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => console.error("메시지 조회 실패", err));
  }, [roomNo, accessToken, ENV_URL]);

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
    },
    Boolean(roomNo)
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

  // 채팅방 연결 상태 표시 (추가)
  const connectionStatus = {
    [ReadyState.CONNECTING]: "연결 중...",
    [ReadyState.OPEN]: "연결됨",
    [ReadyState.CLOSING]: "연결 종료 중...",
    [ReadyState.CLOSED]: "연결 끊김",
    [ReadyState.UNINSTANTIATED]: "연결 안됨",
  }[readyState];

  return (
    <Container>
      <Header>
        <i className="fas fa-comments"></i> {contentTitle}
        {readyState !== ReadyState.OPEN && <span> ({connectionStatus})</span>}
      </Header>
      <MessageArea>
        {messages.map((msg, i) => {
          const mine = msg.mine || msg.userId === userId; // 내 메시지 여부 확인

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
          placeholder={
            readyState === ReadyState.OPEN
              ? "메시지를 입력하세요"
              : "연결 중..."
          }
          disabled={readyState !== ReadyState.OPEN}
        />
        <SendButton
          onClick={handleSend}
          disabled={readyState !== ReadyState.OPEN || !input.trim()}
        >
          전송
        </SendButton>
      </InputBox>
    </Container>
  );
};

export default ChatPage;
