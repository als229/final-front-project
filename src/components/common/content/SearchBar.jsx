import { useState } from "react";
import "./SearcBar.css"; // CSS 파일 import 추가

function SearchBar({ onSearch }) {
  const [category, setCategory] = useState("");
  const [sidoNo, setSidoNo] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch({
      category: Number(category) || 0,
      sidoNo: Number(sidoNo) || 0,
      searchKeyword: keyword,
    });
  };

  // Enter 키 눌렀을 때 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <div className="search-icon">
          <i className="fas fa-compass"></i>
        </div>

        <div className="search-group">
          <div className="select-wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-select"
            >
              <option value="">어떤 여행을 찾으시나요?</option>
              <option value="12">관광지</option>
              <option value="32">숙소</option>
              <option value="39">맛집</option>
              <option value="15">축제</option>
            </select>
            <i className="fas fa-chevron-down select-arrow"></i>
          </div>

          <div className="select-wrapper">
            <select
              value={sidoNo}
              onChange={(e) => setSidoNo(e.target.value)}
              className="search-select"
            >
              <option value="">어디로 떠나볼까요?</option>
              <option value="1">서울</option>
              <option value="2">부산</option>
              <option value="3">제주</option>
              <option value="4">경기</option>
              <option value="5">인천</option>
              <option value="6">강원</option>
              <option value="7">충북</option>
              <option value="8">충남</option>
              <option value="9">경북</option>
              <option value="10">경남</option>
              <option value="11">전북</option>
              <option value="12">전남</option>
            </select>
            <i className="fas fa-chevron-down select-arrow"></i>
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="검색어를 입력해보세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
          </div>
        </div>

        <button className="search-button" onClick={handleSearch}>
          <i className="fas fa-search"></i>
          <span>검색</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
