import React from "react";
import {
  ImageManagerContainer,
  ImageTitle,
  ImageGrid,
  ImageItem,
  ImagePreview,
  RemoveButton,
  ThumbnailBadge,
  ThumbnailButton,
  AddImageButton,
  HiddenInput,
  NoImagesMessage,
} from "./ImageManager.styles";

const ImageManager = ({
  images,
  onAddImages,
  onRemoveImage,
  onRemoveOriginalImage, // 추가!
  onSetThumbnail,
}) => {
  return (
    <ImageManagerContainer>
      <ImageTitle>이미지 관리</ImageTitle>
      <AddImageButton htmlFor="add-content-images">
        이미지 추가 (최대 5개)
      </AddImageButton>
      <HiddenInput
        type="file"
        id="add-content-images"
        multiple
        accept="image/*"
        onChange={onAddImages}
      />

      {images.length === 0 ? (
        <NoImagesMessage>
          등록된 이미지가 없습니다. 이미지를 추가해주세요.
        </NoImagesMessage>
      ) : (
        <ImageGrid>
          {images.map((image) => (
            <ImageItem key={image.id}>
              <ImagePreview src={image.url} alt="콘텐츠 이미지" />
              <RemoveButton
                onClick={() => {
                  if (image.file) {
                    onRemoveImage && onRemoveImage(image.id);
                  } else if (typeof onRemoveOriginalImage === "function") {
                    onRemoveOriginalImage(image.id);
                  }
                }}
              >
                ✕
              </RemoveButton>
              {image.isThumbnail ? (
                <ThumbnailBadge>대표 이미지</ThumbnailBadge>
              ) : (
                <ThumbnailButton onClick={() => onSetThumbnail(image.id)}>
                  대표 이미지로 설정
                </ThumbnailButton>
              )}
            </ImageItem>
          ))}
        </ImageGrid>
      )}
    </ImageManagerContainer>
  );
};

export default ImageManager;
