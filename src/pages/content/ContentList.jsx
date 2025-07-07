import { useEffect, useState } from "react";
import ContentCard from "../../components/common/content/ContentCard";
import SearchBar from "../../components/common/content/SearchBar";
import "./ContentList.css";

// kkm test 용 코드
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 9;

function ContentList() {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = ({ category, region, keyword }) => {
    console.log("검색 조건:", category, region, keyword);
  };

  // kkm test 용 코드
  const navigate = useNavigate();

  useEffect(() => {
    // API 호출로 콘텐츠 목록 가져오기
    const fetchContents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:12345/content/simple-list"
        );

        if (!response.ok) {
          throw new Error("콘텐츠 목록을 불러오는데 실패했습니다.");
        }

        const data = await response.json();

        // API 응답 데이터를 기존 더미데이터 형태로 변환
        const formattedData = data.map((item) => ({
          id: item.contentId,
          title: item.title,
          location: "위치정보", // 좌표 데이터가 별도 테이블에 있다면 추가 API 호출 필요
          image:
            item.firstImage || "https://source.unsplash.com/random/300x200", // 기본 이미지 설정
          categoryCode: item.categoryCode,
        }));

        setContents(formattedData);
      } catch (err) {
        setError(err.message);
        console.error("콘텐츠 목록 조회 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="content-list-page">
        <SearchBar onSearch={handleSearch} />
        <div className="loading">콘텐츠 목록을 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="content-list-page">
        <SearchBar onSearch={handleSearch} />
        <div className="error">오류: {error}</div>
      </div>
    );
  }

  const totalPages = Math.ceil(contents.length / ITEMS_PER_PAGE);
  const currentItems = contents.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="content-list-page">
      <SearchBar onSearch={handleSearch} />
      <div className="card-row-wrapper">
        {currentItems.map((item) => (
          <div className="card-slot" key={item.id}>
            <ContentCard
              image={item.image}
              title={item.title}
              location={item.location}
              // kkm test 용 코드
              cardId={item.id}
              onClick={() =>
                navigate(`/contentDetail`, {
                  state: {
                    id: item.id,
                    title: item.title,
                    image: item.image,
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

      {totalPages > 0 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
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
