import styled from "styled-components";

// 페이지 컨테이너
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
  font-family: "Pretendard", -apple-system, sans-serif;
`;

// 히어로 섹션
export const HeroSection = styled.div`
  position: relative;
  height: 240px;
  margin-bottom: 40px;
  border-radius: 15px;
  overflow: hidden;
  background-image: url("https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80");
  background-size: cover;
  background-position: center;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;

  h1 {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    padding: 0 30px;

    h1 {
      font-size: 2rem;
    }
  }
`;

// 프로필 섹션
export const ProfileSection = styled.section`
  margin-bottom: 40px;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f8f9fa;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const UserDetail = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  margin-bottom: 5px;
  font-size: 0.95rem;

  i {
    color: #3a86ff;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ProfileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const AccountActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${(props) => (props.small ? "5px" : "10px 15px")};
  border-radius: 8px;
  font-weight: 500;
  font-size: ${(props) => (props.small ? "0.8rem" : "0.95rem")};
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.danger ? "#ff6b6b" : "#3a86ff")};
  color: white;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }

  ${(props) =>
    props.small &&
    `
    position: relative;
    width: 28px;
    height: 28px;
    padding: 0;
  `}
`;

// 콘텐츠 섹션
export const ContentSection = styled.section`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;

  i {
    color: #3a86ff;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 60px;
  text-align: center;
  color: #adb5bd;

  i {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export const ContentCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const CardMedia = styled.div`
  height: 160px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  .no-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1f3f5;
    color: #adb5bd;

    i {
      font-size: 2rem;
    }
  }
`;

export const CardBody = styled.div`
  padding: 15px;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  height: 2.8em;
`;

export const CardText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  i {
    color: #3a86ff;
    margin-right: 5px;
  }
`;

export const CardDate = styled.p`
  font-size: 0.8rem;
  color: #adb5bd;

  i {
    margin-right: 5px;
  }
`;

export const LoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 30px auto 0;
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid #3a86ff;
  color: #3a86ff;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3a86ff;
    color: white;
  }
`;

// 모달
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 450px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f1f3f5;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;

    i {
      color: #3a86ff;
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #adb5bd;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #495057;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const ModalFooter = styled.div`
  padding: 15px 20px;
  border-top: 1px solid #f1f3f5;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.15);
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-weight: 500;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e9ecef;
  }

  i {
    color: #3a86ff;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  padding: 10px 16px;
  background-color: #3a86ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

export const SecondaryButton = styled.button`
  padding: 10px 16px;
  background-color: #f1f3f5;
  color: #495057;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e9ecef;
  }
`;

export const ImagePreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f8f9fa;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
`;
