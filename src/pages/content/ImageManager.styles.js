import styled from "styled-components";

export const ImageManagerContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ImageTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 15px;
  margin-top: 15px;
`;

export const ImageItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  aspect-ratio: 4/3;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: rgba(255, 0, 0, 0.9);
  }
`;

export const ThumbnailBadge = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 123, 255, 0.8);
  color: white;
  text-align: center;
  padding: 5px;
  font-size: 12px;
`;

export const ThumbnailButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const AddImageButton = styled.label`
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const NoImagesMessage = styled.p`
  color: #666;
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  margin-top: 10px;
`;
