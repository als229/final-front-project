import styled from "styled-components";

// 전체 페이지 컨테이너
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: "Pretendard", sans-serif;
`;

// 히어로 섹션
export const HeroSection = styled.section`
  position: relative;
  height: 260px;
  margin-bottom: 40px;
  border-radius: 15px;
  overflow: hidden;
  background-image: url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80");
  background-size: cover;
  background-position: center;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  color: white;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    font-weight: 300;
    opacity: 0.9;
  }
`;

// 프로필 섹션
export const ProfileSection = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  margin-right: 30px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const UserEmail = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;

  i {
    color: #4a90e2;
    margin-right: 5px;
  }
`;

export const UserRealName = styled.p`
  font-size: 1rem;
  color: #666;

  i {
    color: #4a90e2;
    margin-right: 5px;
  }
`;

export const ProfileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    margin-top: 20px;
  }
`;

export const ActionButton = styled.button`
  background: ${(props) => (props.warning ? "#ff6b6b" : "#4a90e2")};
  color: white;
  border: none;
  border-radius: ${(props) => (props.small ? "50%" : "8px")};
  padding: ${(props) => (props.small ? "8px" : "10px 15px")};
  font-size: ${(props) => (props.small ? "0.8rem" : "0.9rem")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.2s ease;

  ${(props) =>
    props.small &&
    `
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
  `}

  &:hover {
    background: ${(props) => (props.warning ? "#ff5252" : "#357ABD")};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  i {
    font-size: ${(props) => (props.small ? "0.8rem" : "1rem")};
  }
`;

// 계정 관리 섹션
export const AccountSection = styled.section``;

export const AccountCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: #333;

    i {
      color: #4a90e2;
      margin-right: 8px;
    }
  }
`;

export const AccountAction = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f8f8;
  border: none;
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: #e74c3c;

  i {
    font-size: 1.1rem;
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
  }

  &:hover {
    background: #fff1f1;
  }
`;

// 콘텐츠 섹션 (즐겨찾기, 여행톡)
export const ContentSection = styled.section`
  margin-bottom: 50px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

export const SectionIcon = styled.i`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-right: 10px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
`;

export const TravelCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const CardImagePlaceholder = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #aaa;

  i {
    font-size: 2.5rem;
  }
`;

export const CardContent = styled.div`
  padding: 15px 20px;
`;

export const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  height: 2.6em;
`;

export const CardComment = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  i {
    color: #4a90e2;
    margin-right: 5px;
  }
`;

export const CardDate = styled.p`
  font-size: 0.8rem;
  color: #999;

  i {
    margin-right: 5px;
  }
`;

export const LoadMoreButton = styled.button`
  background: transparent;
  border: 2px solid #4a90e2;
  color: #4a90e2;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  margin: 30px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #4a90e2;
    color: white;
  }
`;

export const EmptyStateMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #f9f9f9;
  border-radius: 12px;
  color: #888;

  i {
    font-size: 3rem;
    margin-bottom: 15px;
    color: #4a90e2;
  }

  p {
    font-size: 1rem;
    margin-bottom: 5px;

    &:first-of-type {
      font-weight: 500;
      color: #666;
    }
  }
`;

export const TravelIconSmall = styled.i`
  color: #4a90e2;
  font-size: 1rem;
`;

// 모달 관련 스타일
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 450px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;

    i {
      color: #4a90e2;
    }
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #888;
    transition: color 0.2s;

    &:hover {
      color: #333;
    }
  }
`;

export const ModalBody = styled.div`
  padding: 30px 20px;
`;

export const ModalFooter = styled.div`
  padding: 15px 20px;
  border-top: 1px solid #eee;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export const FileInputButton = styled.label`
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #555;
  transition: all 0.2s;

  &:hover {
    background: #eee;
  }

  i {
    color: #4a90e2;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 20px;
  display: block;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;

  &:hover {
    background: #357abd;
  }

  i {
    font-size: 0.9rem;
  }
`;

export const SecondaryButton = styled.button`
  background: #f5f5f5;
  color: #666;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;

  &:hover {
    background: #eee;
  }

  i {
    font-size: 0.9rem;
  }
`;
