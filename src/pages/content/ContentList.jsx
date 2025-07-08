import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentCard from "../../components/common/content/ContentCard";
import SearchBar from "../../components/common/content/SearchBar";
import { useNavigate } from "react-router-dom";
import "./ContentList.css";

const ITEMS_PER_PAGE = 9;

function ContentList() {
  const [contents, setContents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ENV_URL = window.ENV?.API_URL;
  const navigate = useNavigate();

  // 공통 조회 함수
  // 인자 없이 호출해도 안전하도록 = {} 으로 기본값을 설정
  const fetchContents = ({
    category = 0,
    sidoNo = 0,
    searchKeyword = "",
  } = {}) => {
    setLoading(true);
    axios
      .get(`${ENV_URL}/api/main-contents`, {
        params: {
          page, // 현재 페이지
          category, // 검색 카테고리
          sidoNo, // 검색 지역번호
          searchKeyword, // 검색 키워드
        },
      })
      .then(({ data }) => {
        console.log(data);
        setContents(data.items);
        setTotalCount(data.pageInfo.count);
        setError(null);
      })
      .catch((err) => {
        console.error("콘텐츠 목록 조회 오류:", err);
        setError("콘텐츠 목록을 불러오는데 실패했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 1) 초기 렌더 & page 변경 시마다 호출
  useEffect(() => {
    fetchContents(); // 인자 없이 호출 -> 디폴트 검색
  }, [page]);

  // 2) 검색 Bar 에서 호출되는 핸들러
  const handleSearch = ({ category, sidoNo, searchKeyword }) => {
    setPage(1); // 검색 시 1페이지로 초기화
    fetchContents({ category, sidoNo, searchKeyword });
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="content-list-page">
        <SearchBar onSearch={handleSearch} />
        <div className="loading">콘텐츠 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-list-page">
        <SearchBar onSearch={handleSearch} />
        <div className="error">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="content-list-page">
      <SearchBar onSearch={handleSearch} />

      <div className="card-row-wrapper">
        {contents.map((item) => (
          <div className="card-slot" key={item.contentId}>
            <ContentCard
              image={item.firstImage}
              title={item.title}
              location={`${item.sidoName} ${item.sigunguName}`}
              categoryName={item.categoryName}
              onClick={() =>
                navigate(`/contentDetail`, {
                  state: {
                    id: item.contentId,
                    title: item.title,
                    image: item.firstImage,
                    location: item.location,
                  },
                })
              }
            />
          </div>
        ))}
      </div>

      {contents.length === 0 && (
        <div className="no-content">등록된 콘텐츠가 없습니다.</div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContentList;
