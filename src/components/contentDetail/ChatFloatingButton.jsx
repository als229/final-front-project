import { FloatingButton } from "src/styles/ContentDetail.styles";

const ChatFloatingButton = ({ contentId, children }) => {
  const openChatWindow = () => {
    window.open(
      `http://localhost:5173/chat/${contentId}`,
      "_blank",
      "width=600,height=900"
    );
  };

  return <FloatingButton onClick={openChatWindow}>{children}</FloatingButton>;
};

export default ChatFloatingButton;
