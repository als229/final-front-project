import { useState } from "react";
// import "./../../styles/ContentForm.css";

function ContentAdd() {
  const [mainImage, setMainImage] = useState(null);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="form-wrapper">
      <form className="content-form">
        <h2>컨텐츠 등록</h2>

        <div className="form-grid">
          <label>카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="region">지역</option>
            <option value="accommodation">숙소</option>
            <option value="food">맛집</option>
          </select>

          <label>제목</label>
          <input type="text" />

          <label>썸네일 사진</label>
          <div className="thumbnail-box">
            <div className="thumbnail-preview">
              {mainImage ? (
                <img src={mainImage} alt="미리보기" />
              ) : (
                <span>사진 미리보기</span>
              )}
            </div>
            <input type="file" onChange={handleImageChange} />
          </div>

          <label>전화번호</label>
          <input type="text" />

          <label>홈페이지</label>
          <input type="text" />

          <label>운영 시간</label>
          <input type="text" />

          <label>사진</label>
          <div className="multi-photo-box">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const previews = files.map((file) => URL.createObjectURL(file));
                setImages(previews);
              }}
            />
            <div className="multi-preview-box">
              {images.map((src, idx) => (
                <div className="multi-thumbnail" key={idx}>
                  <img src={src} alt={`사진 ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <label>주소</label>
          <input type="text" />

          <label>행사 설명</label>
          <textarea />

          <label>프로그램</label>
          <textarea />

          <label>스폰서</label>
          <input type="text" />

          <label>입장료</label>
          <input type="text" />

          <label>시작 일자</label>
          <input type="date" />

          <label>마감 일자</label>
          <input type="date" />
        </div>

        <div className="submit-box">
          <button type="submit">등록하기</button>
        </div>
      </form>
    </div>
  );
}

export default ContentAdd;
