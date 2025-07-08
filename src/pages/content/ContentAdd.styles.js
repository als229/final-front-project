import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
`;
export const Form = styled.form`
  padding: 20px;
  background: #fff;
  border: 2px solid rgb(149, 149, 149);
  border-radius: 8px;
  font-family: sans-serif;
`;
export const Header = styled.h2`
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px 20px;
  align-items: center;
`;
export const Label = styled.label`
  font-weight: bold;
`;
export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  height: 100px;
`;
export const Divider = styled.div`
  grid-column: span 2;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
`;
export const SubmitBox = styled.div`
  grid-column: span 2;
  text-align: right;
  margin-top: 20px;
`;
export const Button = styled.button`
  background: #fff;
  padding: 10px 20px;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

// 파일 업로드
export const HiddenFileInput = styled.input.attrs({
  type: "file",
  name: "file", // 기본 name을 file로 고정
  multiple: true,
  accept: "image/*",
})`
  display: none;
`;

export const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

// 썸네일
export const ThumbnailBox = styled.div`
  grid-column: span 2;
`;
export const ThumbnailPreview = styled.div`
  width: 100%;
  height: 180px;
  background: #eee;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  overflow: hidden;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

// 추가 사진
export const MultiPhotoBox = styled.div`
  grid-column: span 2;
`;
export const PreviewRow = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;
export const PreviewWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
`;
export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;
export const RemovePreviewButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff4d4f;
  border: none;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

// 주소 부분
export const AddressButtonWrapper = styled.div`
  grid-column: span 2;
  text-align: right;
`;
export const AddressBox = styled.div`
  grid-column: span 2;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`;
export const AddressButton = styled.button.attrs({ type: "button" })`
  padding: 8px 12px;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
