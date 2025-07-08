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

  // ★ images 배열만 사용
  images,
  onImagesChange,
  onRemoveImage,

  // 주소
  sidoName,
  sigunguName,
  dongName,
  postCode,
  detailAddress,
  onDetailAddressChange,
  onAddressSearch,

  // 세부 정보 컴포넌트
  renderDetail,
  onSubmit,
}) => {
  // 첫 번째 파일을 썸네일로
  const thumbFile = images[0];
  const thumbUrl = thumbFile ? URL.createObjectURL(thumbFile) : null;

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Header>컨텐츠 등록</Header>
        <FormGrid>
          {/* 카테고리 선택 */}
          <Label>카테고리</Label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
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
            onChange={(e) => onTitleChange(e.target.value)}
          />

          {/* 썸네일 */}
          <Label>썸네일 사진</Label>
          <ThumbnailBox>
            <ThumbnailPreview>
              {thumbUrl ? (
                <img src={thumbUrl} alt="썸네일" />
              ) : (
                "사진을 첨부해 주세요"
              )}
            </ThumbnailPreview>
            <HiddenFileInput
              id="main-image"
              name="file"
              accept="image/*"
              onChange={onImagesChange}
            />

            <UploadButton htmlFor="main-image">썸네일 등록</UploadButton>
          </ThumbnailBox>

          {/* 전화번호 */}
          <Label>전화번호</Label>
          <Input
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />

          {/* 홈페이지 */}
          <Label>홈페이지</Label>
          <Input
            value={website}
            onChange={(e) => onWebsiteChange(e.target.value)}
          />

          {/* 운영 시간 */}
          <Label>운영 시간</Label>
          <Input
            value={hours}
            onChange={(e) => onHoursChange(e.target.value)}
            placeholder="예: 09:00 - 18:00"
          />

          {/* 추가 사진 */}
          <Label>추가 사진</Label>
          <MultiPhotoBox>
            <HiddenFileInput
              id="additional-images"
              multiple
              name="file"
              accept="image/*"
              onChange={onImagesChange}
            />
            <UploadButton htmlFor="additional-images">파일 등록</UploadButton>
            <PreviewRow>
              {images.slice(1).map((file, idx) => (
                <PreviewWrapper key={idx}>
                  <RemovePreviewButton onClick={() => onRemoveImage(idx + 1)}>
                    ×
                  </RemovePreviewButton>
                  <PreviewImg
                    src={URL.createObjectURL(file)}
                    alt={`사진 ${idx + 2}`}
                  />
                </PreviewWrapper>
              ))}
            </PreviewRow>
          </MultiPhotoBox>

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
            onChange={(e) => onDetailAddressChange(e.target.value)}
            placeholder="빌딩명·호수 입력"
          />
        </FormGrid>

        <Divider />
        <h3>세부 정보</h3>
        {renderDetail}

        <SubmitBox>
          <Button type="submit">등록하기</Button>
        </SubmitBox>
      </Form>
    </Container>
  );
};

export default ContentAdd;
