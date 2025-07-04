import styled from "styled-components";

export const MapWrapper = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 100vh; 
  width: 100%; 
`;

export const MapContainer = styled.div`
  width: 500px;
  height: 500px;
  position: relative; // 에러 메시지 오버레이를 위한 상대 위치
`;

/* 로딩, 에러, 정보 없음 메시지 스타일 */
export const MessageContainer = styled.div`
  text-align: center;
  padding: 20px;
  color: ${props => props.$isError ? 'red' : 'inherit'}; // props를 사용하여 조건부 스타일링
`;

/* 지도 위에 표시될 에러 오버레이 스타일 */
export const ErrorOverlay = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 10;
  font-size: 0.9em;
`;
