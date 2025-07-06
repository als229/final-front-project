import { useState } from "react";

function SearchBar({ onSearch }) {
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [keyword, setKeyword] = useState("");

  const triggerSearch = () => {
    onSearch({ category, region, keyword });
  };

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">카테고리</option>
        <option value="1">관광지</option>
        <option value="2">맛집</option>
        <option value="3">숙소</option>
        <option value="4">축제</option>
      </select>
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="">지역 선택</option>
        <option value="서울">서울</option>
        <option value="부산">부산</option>
        <option value="제주">제주</option>
      </select>
      <input
        type="text"
        placeholder="검색어를 입력해 주세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={triggerSearch}>검색</button>
    </div>
  );
}

export default SearchBar;
