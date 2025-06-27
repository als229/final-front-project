import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ContentDetail = () => {
  const { state } = useLocation();
  const { id, title, image, location } = state;

  return (
    <>
      <h1>왜 안나옴??</h1>
      <h1>{id}번 컨텐츠임 </h1>
      <p>제목은 {title} 임</p>
      <button>채팅창 열기 버튼임</button>
    </>
  );
};

export default ContentDetail;
