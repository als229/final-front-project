import styled from "styled-components";

export const ReviewBox = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 1.5rem 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const Nick = styled.div`
  font-weight: bold;
`;

export const StarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Star = styled.img`
  width: 16px;
  height: 16px;
`;

export const DateText = styled.span`
  color: #999;
  font-size: 0.85rem;
  margin-left: 8px;
`;

export const Comment = styled.div`
  margin-top: 1rem;
  white-space: pre-wrap;
  line-height: 1.5;
`;

export const ImageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 1rem;
`;

export const ReviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Content = styled.p`
  margin: 1rem 0;
  font-size: 0.95rem;
  line-height: 1.4;
`;

export const Image = styled.img`
  width: 100px;
  height: auto;
  margin-right: 8px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  width: 100%;
`;

export const ActionButton = styled.button`
  width: 150px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;

  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
