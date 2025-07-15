import styled from "styled-components";

// 지도 컨테이너 래퍼 (전체 지도 영역)
export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px; // 높이 증가
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  margin: 20px 0;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 350px;
  }
`;

// 실제 지도가 표시될 컨테이너
export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
`;

// 메시지 컨테이너 (로딩, 에러 등)
export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.$isError ? "#fff8f8" : "#f5f7f9")};
  color: ${(props) => (props.$isError ? "#e53935" : "#555")};
  font-size: 16px;
  text-align: center;
  padding: 20px;

  i {
    margin-right: 8px;
  }
`;

// 오류 메시지 오버레이
export const ErrorOverlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 59, 48, 0.85);
  color: white;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  max-width: 90%;
  text-align: center;
  backdrop-filter: blur(4px);
`;

// 위치 정보 박스
export const MapInfoBox = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-width: 60%;

  @media (max-width: 480px) {
    max-width: 80%;
  }
`;

// 위치 제목
export const LocationTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

// 좌표 정보 텍스트
export const CoordinateInfo = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
`;

// 줌 컨트롤 컨테이너
export const ZoomControls = styled.div`
  position: absolute;
  right: 16px;
  bottom: 128px;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

// 줌 버튼
export const ZoomButton = styled.button`
  width: 36px;
  height: 36px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 4px;

  &:hover {
    background: #f8f8f8;
  }

  &:active {
    background: #eee;
    transform: scale(0.97);
  }

  &:focus {
    outline: none;
  }
`;
