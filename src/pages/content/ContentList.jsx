import { useEffect, useState } from "react";
import ContentCard from "./../Content/ContentCard";
import SearchBar from "./../Content/SearchBar";
import "./../../styles/ContentList.css";

const ITEMS_PER_PAGE = 9;

function ContentList() {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const handleSearch = ({ category, region, keyword }) => {
    console.log("검색 조건:", category, region, keyword);
  };

  useEffect(() => {
    // 더미데이터 24개 생성
    const dummyData = Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      title: `샘플 콘텐츠 ${i + 1}`,
      location: ["서울", "부산", "대구", "제주", "강릉", "전주"][i % 6],
      image: `https://source.unsplash.com/random/300x200?sig=${i}`,
    }));
    setContents(dummyData);
  }, []);

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
            />
          </div>
        ))}
      </div>

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
    </div>
  );
}

export default ContentList;
