import { useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

const ActionRow = ({
  contentId,
  liked,
  setLiked,
  bookmarked,
  setBookmarked,
}) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleFavoriteToggle = (category) => {
    if (!accessToken) {
      setToastMessage("로그인이 필요한 서비스입니다");
      showToastMessage();
      return;
    }

    const payload = {
      contentId: contentId,
      category: category,
    };

    axios
      .post(`${ENV_URL}/api/favorites`, payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        if (category === 1) {
          setLiked((prev) => !prev);
          setToastMessage(
            liked ? "좋아요가 취소되었습니다" : "좋아요를 누르셨습니다"
          );
        }
        if (category === 2) {
          setBookmarked((prev) => !prev);
          setToastMessage(
            bookmarked
              ? "즐겨찾기가 해제되었습니다"
              : "즐겨찾기에 추가되었습니다"
          );
        }
        showToastMessage();
      })
      .catch((err) => {
        console.error("좋아요/즐겨찾기 요청 실패:", err);
        setToastMessage("요청 처리 중 오류가 발생했습니다");
        showToastMessage();
      });
  };

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <ActionContainer>
      <ActionTitle>여행 계획에 추가하기</ActionTitle>

      <ButtonsWrapper>
        <LikeButton
          $isLiked={liked}
          onClick={() => handleFavoriteToggle(1)}
          aria-label={liked ? "좋아요 취소" : "좋아요"}
        >
          <HeartIcon $isLiked={liked}>
            <i className={`fas fa-heart ${liked ? "filled" : ""}`}></i>
          </HeartIcon>
          <ButtonText>좋아요</ButtonText>
        </LikeButton>

        <BookmarkButton
          $isBookmarked={bookmarked}
          onClick={() => handleFavoriteToggle(2)}
          aria-label={bookmarked ? "즐겨찾기 취소" : "즐겨찾기"}
        >
          <BookmarkIcon $isBookmarked={bookmarked}>
            <i
              className={`${
                bookmarked ? "fas fa-bookmark" : "far fa-bookmark"
              }`}
            ></i>
          </BookmarkIcon>
          <ButtonText>즐겨찾기</ButtonText>
        </BookmarkButton>
      </ButtonsWrapper>

      {showToast && <Toast>{toastMessage}</Toast>}
    </ActionContainer>
  );
};

// 애니메이션 정의
const popIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
`;

const toastFade = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
`;

// 스타일 컴포넌트
const ActionContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin: 30px 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  position: relative;
`;

const ActionTitle = styled.h3`
  font-size: 1.1rem;
  color: #1e293b;
  margin: 0 0 16px 0;
  font-weight: 600;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center; /* 두 버튼을 중앙에 배치 */

  @media (max-width: 640px) {
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex: 1;
  max-width: 180px; /* 버튼 최대 너비 제한 */
  min-width: 90px;

  &:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    padding: 12px;
    min-width: 70px;
  }
`;

const LikeButton = styled(ActionButton)`
  color: ${(props) => (props.$isLiked ? "#e11d48" : "#64748b")};
  border: 1px solid ${(props) => (props.$isLiked ? "#fecdd3" : "#e2e8f0")};

  &:hover {
    background-color: ${(props) => (props.$isLiked ? "#fff1f2" : "#f8fafc")};
    border-color: ${(props) => (props.$isLiked ? "#fda4af" : "#cbd5e1")};
  }
`;

const BookmarkButton = styled(ActionButton)`
  color: ${(props) => (props.$isBookmarked ? "#eab308" : "#64748b")};
  border: 1px solid ${(props) => (props.$isBookmarked ? "#fef08a" : "#e2e8f0")};

  &:hover {
    background-color: ${(props) =>
      props.$isBookmarked ? "#fefce8" : "#f8fafc"};
    border-color: ${(props) => (props.$isBookmarked ? "#facc15" : "#cbd5e1")};
  }
`;

const HeartIcon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 8px;
  animation: ${(props) => (props.$isLiked ? pulse : "none")} 0.6s;

  i.filled {
    animation: ${popIn} 0.4s;
  }

  @media (max-width: 640px) {
    font-size: 1.5rem;
    margin-bottom: 6px;
  }
`;

const BookmarkIcon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 8px;
  animation: ${(props) => (props.$isBookmarked ? popIn : "none")} 0.4s;

  @media (max-width: 640px) {
    font-size: 1.5rem;
    margin-bottom: 6px;
  }
`;

const ButtonText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 0.95rem;
  z-index: 1000;
  animation: ${toastFade} 3s forwards;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export default ActionRow;
