import { FloatingButton } from "../../pages/content/ContentDetail.styles";

const ChatFloatingButton = ({ contentId, title = "채팅방", children }) => {
  const openChatWindow = () => {
    // title을 URL 인코딩하여 쿼리 파라미터로 전달
    const encodedTitle = encodeURIComponent(title);
    const accessToken = sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");
    const nickName = sessionStorage.getItem("nickName");

    window.open(
      `https://nollerway.store/chat/${contentId}?title=${encodedTitle}&accessToken=${accessToken}&userId=${userId}&nickName=${nickName}`,
      "_blank",
      "width=600,height=900"
    );
  };

  return <FloatingButton onClick={openChatWindow}>{children}</FloatingButton>;
};

export default ChatFloatingButton;
