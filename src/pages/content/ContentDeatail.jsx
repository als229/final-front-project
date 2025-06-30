import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ContentDetail = () => {
  const { state } = useLocation();
  const { id, title, image, location } = state;

  const openChatWindow = () => {
    window.open(
      `http://localhost:5173/chat/${id}`,
      "_blank",
      "width=600,height=900"
    );
  };

  return (
    <>
      <h1>왜 안나옴??</h1>
      <h1>{id}번 컨텐츠임 </h1>
      <p>제목은 {title} 임</p>
      <button onClick={openChatWindow}>채팅창 열기 버튼임</button>
    </>
  );
};

export default ContentDetail;
