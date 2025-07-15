import React from "react";
import {
  Container,
  Form,
  Header,
  FormGrid,
  Label,
  Input,
  ThumbnailBox,
  ThumbnailPreview,
  MultiPhotoBox,
  HiddenFileInput,
  UploadButton,
  PreviewRow,
  PreviewWrapper,
  PreviewImg,
  RemovePreviewButton,
  AddressButtonWrapper,
  AddressButton,
  Divider,
  SubmitBox,
  Button,
} from "./ContentAdd.styles";

const ContentAdd = ({
  category,
  onCategoryChange,
  title,
  onTitleChange,
  phone,
  onPhoneChange,
  website,
  onWebsiteChange,
  hours,
  onHoursChange,

  // 이미지 관련
  thumbnailImage = null,
  additionalImages = [],
  onThumbnailChange,
  onAdditionalImagesChange,
  onRemoveThumbnail,
  onRemoveAdditionalImage,

  // 주소
  sidoName,
  sigunguName,
  dongName,
  postCode,
  detailAddress,
  onDetailAddressChange,
  onAddressSearch,

  // 좌표 정보가 포함된 상세 데이터
  detailData = {},

  // 세부 정보 컴포넌트
  renderDetail,
  onSubmit,

  // 모드 설정
  isUpdateMode = false,
  originalImages = [],

  // 이미지 입력 UI 숨김 옵션 (ImageManager 사용 시)
  hideImageInputs = false,
}) => {
  // 썸네일 URL 생성
  const thumbUrl = thumbnailImage ? URL.createObjectURL(thumbnailImage) : null;

  // 기존 이미지 표시 제거 (이미지 관리에서 처리)
  // const originalThumb = originalImages.find((img) => img.isThumbnail);
  // const displayThumbUrl =
  //   thumbUrl || (originalThumb ? originalThumb.url : null);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Header>{isUpdateMode ? "콘텐츠 수정" : "콘텐츠 등록"}</Header>

        {/* 기존 이미지 표시 부분 삭제 */}

        <FormGrid>
          {/* 카테고리 선택 */}
          <Label>카테고리</Label>
          <select
            value={category}
            onChange={(e) => {
              console.log("ContentAdd:onChange value=", e.target.value);
              onCategoryChange && onCategoryChange(e.target.value);
            }}
          >
            <option value="">선택하세요</option>
            <option value="4">행사</option>
            <option value="3">숙소</option>
            <option value="1">관광지</option>
            <option value="2">맛집</option>
          </select>

          {/* 제목 */}
          <Label>제목</Label>
          <Input
            value={title}
            onChange={(e) => onTitleChange && onTitleChange(e.target.value)}
          />

          {/* 이미지 관련 UI - hideImageInputs가 true일 때는 표시하지 않음 */}
          {!hideImageInputs && (
            <>
              {/* 썸네일 */}
              <Label>썸네일 사진</Label>
              <ThumbnailBox>
                <ThumbnailPreview>
                  {thumbUrl ? (
                    <>
                      <img src={thumbUrl} alt="썸네일" />
                      {thumbnailImage && (
                        <RemovePreviewButton onClick={onRemoveThumbnail}>
                          ×
                        </RemovePreviewButton>
                      )}
                    </>
                  ) : (
                    "사진을 첨부해 주세요"
                  )}
                </ThumbnailPreview>
                <HiddenFileInput
                  id="main-image"
                  name="thumbnailFile"
                  accept="image/*"
                  onChange={onThumbnailChange}
                />

                <UploadButton htmlFor="main-image">
                  썸네일 {isUpdateMode ? "변경" : "등록"}
                </UploadButton>
              </ThumbnailBox>
            </>
          )}

          {/* 전화번호 */}
          <Label>전화번호</Label>
          <Input
            value={phone}
            onChange={(e) => onPhoneChange && onPhoneChange(e.target.value)}
          />

          {/* 홈페이지 */}
          <Label>홈페이지</Label>
          <Input
            value={website}
            onChange={(e) => onWebsiteChange && onWebsiteChange(e.target.value)}
          />

          {/* 운영 시간 */}
          <Label>운영 시간</Label>
          <Input
            value={hours}
            onChange={(e) => onHoursChange && onHoursChange(e.target.value)}
            placeholder="예: 09:00 - 18:00"
          />

          {/* 추가 사진 - hideImageInputs가 true일 때는 표시하지 않음 */}
          {!hideImageInputs && (
            <>
              <Label>추가 사진 {isUpdateMode && "(새로 등록할 경우)"}</Label>
              <MultiPhotoBox>
                <HiddenFileInput
                  id="additional-images"
                  multiple
                  name="additionalFiles"
                  accept="image/*"
                  onChange={onAdditionalImagesChange}
                />
                <UploadButton htmlFor="additional-images">
                  파일 등록
                </UploadButton>
                <PreviewRow>
                  {additionalImages.map((file, idx) => (
                    <PreviewWrapper key={idx}>
                      <RemovePreviewButton
                        onClick={() => onRemoveAdditionalImage(idx)}
                      >
                        ×
                      </RemovePreviewButton>
                      <PreviewImg
                        src={URL.createObjectURL(file)}
                        alt={`사진 ${idx + 1}`}
                      />
                    </PreviewWrapper>
                  ))}
                </PreviewRow>
              </MultiPhotoBox>
            </>
          )}

          {/* 주소 찾기 */}
          <AddressButtonWrapper>
            <AddressButton onClick={onAddressSearch}>주소 찾기</AddressButton>
          </AddressButtonWrapper>

          {/* 자동 입력된 주소 */}
          <Label>시도</Label>
          <Input value={sidoName} disabled />
          <Label>시군구</Label>
          <Input value={sigunguName} disabled />
          <Label>동</Label>
          <Input value={dongName} disabled />
          <Label>우편번호</Label>
          <Input value={postCode} disabled />

          {/* 세부주소 */}
          <Label>세부주소</Label>
          <Input
            value={detailAddress}
            onChange={(e) =>
              onDetailAddressChange && onDetailAddressChange(e.target.value)
            }
            placeholder="빌딩명·호수 입력"
          />

          {/* 좌표 정보 (주소 검색 후 자동으로 추가됨) */}
          {detailData?.mapY && detailData?.mapX && (
            <>
              <Label>위도/경도 좌표</Label>
              <Input
                value={`위도: ${detailData.mapY}, 경도: ${detailData.mapX}`}
                disabled
                title="주소 검색으로 자동 입력된 좌표입니다"
              />
            </>
          )}
        </FormGrid>

        <Divider />
        <h3>세부 정보</h3>
        {renderDetail}
        <SubmitBox>
          <Button type="submit">
            {isUpdateMode ? "수정하기" : "등록하기"}
          </Button>
        </SubmitBox>
      </Form>
    </Container>
  );
};

export default ContentAdd;
