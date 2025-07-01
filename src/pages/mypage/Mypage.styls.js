import styled from "styled-components";

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
`;
export const SectionTitle = styled.h2`
  margin: 40px 0 16px;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 180px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

export const ProfileImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f5f5f5;
  border: 1px solid #ddd;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const LeftBox = styled.div`
  width: 60%;
  padding: 20px;
  border-right: 1px solid #ddd;
`;
export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const RightBox = styled.div`
  width: 35%;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const RightContent = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 40px;
`;

export const ModifyLeftWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
`;
export const ModifyRightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FavoriteWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 24px;
  margin-bottom: 24px;
`;
export const Box = styled.div`
  height: 160px;
  background-color: #f0f0f0;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Item = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  word-break: break-word;
  text-align: center;
`;
export const FavoriteName = styled.p`
  font-weight: bold;
  margin: 8px 0 4px;
`;
export const Comment = styled.p`
  font-size: 14px;
  color: #333;
  margin: 4px 0;
`;
export const Author = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;
export const Date = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background: white;
  width: 360px;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  position: relative;
`;

export const ModalTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  text-align: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const ConfirmButton = styled.button`
  flex: 1;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  flex: 1;
  background: #eee;
  color: #333;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
`;
export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: #bbb;
  }
`;
