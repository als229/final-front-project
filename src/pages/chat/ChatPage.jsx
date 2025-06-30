import { useState } from "react";
import { useParams } from "react-router-dom";
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

const dummyMessages = [
  {
    sender: "한화짱",
    profileImage: "https://i.pravatar.cc/150?img=11",
    content: "ㅎㅎㅎㅇㅇ",
    time: "오후 4:21",
  },
  {
    sender: "공부하는 광팬",
    profileImage: "https://i.pravatar.cc/150?img=14",
    content: "아니 근데 김기중은 왜 말소임?",
    time: "오후 4:21",
  },
  {
    sender: "요가하는 푸마",
    profileImage: "https://i.pravatar.cc/150?img=22",
    content: "이미 여기저기 퍼진 소문임",
    time: "오후 4:21",
  },
];

const ChatPage = () => {
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(dummyMessages);
  const myName = "한화짱";

  const handleSend = () => {
    if (!input.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newMessage = {
      sender: myName,
      profileImage: "https://i.pravatar.cc/150?img=11",
      content: input,
      time,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <Container>
      <Header>{roomId}번 채팅방</Header>
      <MessageArea>
        {messages.map((msg, i) => {
          const mine = msg.sender === myName;

          const isLastOfGroup =
            i === messages.length - 1 ||
            msg.sender !== messages[i + 1]?.sender ||
            msg.time !== messages[i + 1]?.time;

          return (
            <MessageRow key={i} $mine={mine}>
              {!mine && <ProfileImage src={msg.profileImage} alt="프로필" />}
              <MessageInfo $mine={mine}>
                {!mine && <Nickname>{msg.sender}</Nickname>}
                <MessageBubble $mine={mine}>{msg.content}</MessageBubble>
                {isLastOfGroup && (
                  <MessageTime $mine={mine}>{msg.time}</MessageTime>
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
