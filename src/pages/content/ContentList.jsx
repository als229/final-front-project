import { useEffect, useState } from "react";
import ContentCard from "@/common/content/ContentCard";
import SearchBar from "@/common/content/SearchBar";
import "src/styles/ContentList.css";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ITEMS_PER_PAGE = 9;

function ContentList() {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalContents, setOriginalContents] = useState([]);
  const CATEGORY_MAP = {
    관광지: 3,
    맛집: 2,
    숙소: 1,
    축제: 4,
  };

  const location = useLocation();
  const categoryName = location.state?.categoryName;

  const handleSearch = ({ category, region, keyword }) => {
    let filtered = [...originalContents];

    if (category) {
      filtered = filtered.filter(
        (item) => item.categoryCode === Number(category)
      );
    }

    if (region) {
      filtered = filtered.filter((item) => item.location.includes(region));
    }

    if (keyword) {
      filtered = filtered.filter((item) => item.title.includes(keyword));
    }

    setContents(filtered);
    setPage(1);
  };

  <SearchBar onSearch={handleSearch} />;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:12345/api/content/simple-list"
        );

        if (!response.ok)
          throw new Error("콘텐츠 목록을 불러오는데 실패했습니다.");

        const data = await response.json();

        const formattedData = data.map((item) => ({
          id: item.contentId,
          title: item.title,
          location: "위치정보",
          image:
            item.firstImage || "https://source.unsplash.com/random/300x200",
          categoryCode: item.categoryCode,
        }));

        setOriginalContents(formattedData);
        setContents(formattedData); // 첫 화면에 전체 보여주기
      } catch (err) {
        setError(err.message);
        console.error("콘텐츠 목록 조회 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  useEffect(() => {
    if (categoryName && originalContents.length > 0) {
      const categoryCode = CATEGORY_MAP[categoryName];
      if (categoryCode) {
        handleSearch({ category: categoryCode });
      }
    }
  }, [categoryName, originalContents]);

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
