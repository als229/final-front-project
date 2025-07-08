import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentCard from "../../components/common/content/ContentCard";
import SearchBar from "../../components/common/content/SearchBar";
import { useNavigate, useSearchParams } from "react-router-dom"; // useSearchParams 추가
import "./ContentList.css";

const ITEMS_PER_PAGE = 9;

function ContentList() {
  const [contents, setContents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL 쿼리 파라미터에서 카테고리 읽기 위한 훅 추가
  const [searchParams] = useSearchParams();

  // 검색 필터 상태 추가
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSido, setSelectedSido] = useState(0);
  const [keyword, setKeyword] = useState("");

  const ENV_URL = window.ENV?.API_URL;
  const navigate = useNavigate();

  // URL에서 카테고리 정보 가져와서 검색
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl) {
      console.log("URL에서 카테고리 감지:", categoryFromUrl);

      // 카테고리 선택 상태 업데이트
      setSelectedCategory(Number(categoryFromUrl));

      // 해당 카테고리로 검색 실행
      fetchContents({
        category: Number(categoryFromUrl),
        sidoNo: selectedSido,
        searchKeyword: keyword,
      });
    }
  }, [searchParams]); // URL 파라미터 변경 감지

  // 공통 조회 함수
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
        console.log("검색 결과:", data);
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

  // 초기 렌더 & page 변경 시마다 호출
  useEffect(() => {
    // URL에서 카테고리를 읽었으면 selectedCategory 상태값 사용
    fetchContents({
      category: selectedCategory,
      sidoNo: selectedSido,
      searchKeyword: keyword,
    });
  }, [page]);

  // 검색 Bar에서 호출되는 핸들러
  const handleSearch = ({ category, sidoNo, searchKeyword }) => {
    setPage(1); // 검색 시 1페이지로 초기화

    // 상태 업데이트
    setSelectedCategory(category);
    setSelectedSido(sidoNo);
    setKeyword(searchKeyword);

    // URL 업데이트 (옵션)
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (sidoNo) params.set("sidoNo", sidoNo);
    if (searchKeyword) params.set("keyword", searchKeyword);

    navigate(`/contentList?${params.toString()}`, { replace: true });

    // 검색 실행
    fetchContents({ category, sidoNo, searchKeyword });
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="content-list-page">
        <SearchBar
          onSearch={handleSearch}
          initialCategory={selectedCategory} // 초기 선택 카테고리 전달
        />
        <div className="loading">콘텐츠 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-list-page">
        <SearchBar onSearch={handleSearch} initialCategory={selectedCategory} />
        <div className="error">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="content-list-page">
      <SearchBar
        onSearch={handleSearch}
        initialCategory={selectedCategory} // 초기 카테고리 값 전달
      />

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
