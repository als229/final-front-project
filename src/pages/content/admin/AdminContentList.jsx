import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  AdminContainer,
  AdminHeader,
  AdminTitle,
  AdminTools,
  SearchForm,
  SearchInput,
  SearchButton,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  TableContainer,
  ContentTable,
  TableHeader,
  TableRow,
  TableCell,
  StatusBadge,
  LoadingState,
  ErrorState,
  EmptyState,
  PaginationContainer,
  PaginationButton,
  PageNumber,
  ContentImage,
  ActionButtonGroup,
  ActionButton,
  StatsRow,
  StatBox,
  StatNumber,
  StatTitle,
  ContentTitle,
  ActionBar,
  RefreshButton,
} from "./AdminContentList.styles";

const AdminContentList = () => {
  const apiUrl = window.ENV?.API_URL;
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // 상태 관리
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0,
  });

  // 카테고리 매핑
  const categoryMapping = {
    1: "관광지",
    2: "맛집",
    3: "숙소",
    4: "축제",
    // 필요에 따라 더 추가
  };

  // 컨텐츠 목록 불러오기
  const fetchContents = () => {
    setLoading(true);
    setError(null);

    const params = {
      page: currentPage,
      searchKeyword: searchKeyword || undefined,
      category: categoryFilter || undefined,
      status: statusFilter || undefined,
    };

    console.log("API 요청 파라미터:", params);

    axios
      .get(`${apiUrl}/api/main-contents`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        params,
      })
      .then((response) => {
        console.log("API 응답:", response.data);

        if (response.status === 200) {
          // 응답 구조에 맞게 데이터 설정
          const items = response.data.items || [];
          setContents(items);

          // 통계 정보 업데이트
          setStats({
            total: response.data.pageInfo?.count || items.length,
            active: items.filter((item) => item.status === "Y").length,
            inactive: items.filter((item) => item.status === "N").length,
          });

          // 페이지 정보 설정
          if (response.data.pageInfo) {
            setTotalPages(response.data.pageInfo.maxPage || 1);
          }
        } else {
          setError("콘텐츠 목록을 불러오는데 실패했습니다.");
        }
      })
      .catch((err) => {
        console.error("콘텐츠 목록 조회 중 오류 발생:", err);
        setError("콘텐츠 데이터를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    if (auth.accessToken) {
      fetchContents();
    }
  }, [auth.accessToken, currentPage, categoryFilter, statusFilter]);

  // 검색 양식 제출 처리
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    fetchContents();
  };

  // 상태 뱃지 색상 결정
  const getStatusDisplay = (status) => {
    switch (status) {
      case "Y":
        return { text: "게시", variant: "active" };
      case "N":
        return { text: "비활성", variant: "inactive" };
      default:
        return { text: "미정", variant: "default" };
    }
  };

  // 콘텐츠 상세 페이지로 이동
  const handleViewContent = (contentId) => {
    navigate(`/admin/content/${contentId}`);
  };

  // 콘텐츠 편집 페이지로 이동
  const handleEditContent = (contentId) => {
    navigate(`/admin/content-update/${contentId}`); // 새로운 경로 사용
  };

  // 콘텐츠 상태 변경
  const handleChangeStatus = (contentId, status) => {
    if (
      !window.confirm(
        `정말 이 콘텐츠의 상태를 ${
          status === "Y" ? "게시" : status === "N" ? "비활성" : "대기"
        }로 변경하시겠습니까?`
      )
    ) {
      return;
    }

    axios
      .put(
        `${apiUrl}/api/admin/content/status`,
        { contentId, status },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("콘텐츠 상태가 변경되었습니다.");
          fetchContents(); // 목록 새로고침
        } else {
          alert("콘텐츠 상태 변경에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.error("콘텐츠 상태 변경 중 오류 발생:", err);
        alert("상태 변경 중 오류가 발생했습니다.");
      });
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>
          <i className="fas fa-map-marked-alt"></i> 콘텐츠 관리
        </AdminTitle>
        <AdminTools>
          <FilterGroup>
            <FilterLabel>카테고리:</FilterLabel>
            <FilterSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">전체</option>
              {Object.entries(categoryMapping).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>상태:</FilterLabel>
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">전체</option>
              <option value="Y">게시</option>
              <option value="N">비활성</option>
            </FilterSelect>
          </FilterGroup>

          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="콘텐츠 제목 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <SearchButton type="submit">
              <i className="fas fa-search"></i>
            </SearchButton>
          </SearchForm>
        </AdminTools>
      </AdminHeader>

      <ActionBar>
        <RefreshButton onClick={fetchContents}>
          <i className="fas fa-sync-alt"></i> 새로고침
        </RefreshButton>
      </ActionBar>

      {loading ? (
        <LoadingState>
          <i className="fas fa-spinner fa-spin"></i> 콘텐츠를 불러오는
          중입니다...
        </LoadingState>
      ) : error ? (
        <ErrorState>
          <i className="fas fa-exclamation-circle"></i> {error}
        </ErrorState>
      ) : contents.length === 0 ? (
        <EmptyState>
          <i className="fas fa-map-marked"></i>
          <p>등록된 콘텐츠가 없거나 검색 결과가 없습니다.</p>
        </EmptyState>
      ) : (
        <TableContainer>
          <ContentTable>
            <thead>
              <tr>
                <TableHeader width="60px">No.</TableHeader>
                <TableHeader width="100px">이미지</TableHeader>
                <TableHeader>제목</TableHeader>
                <TableHeader width="120px">카테고리</TableHeader>
                <TableHeader width="120px">연락처</TableHeader>
                <TableHeader width="100px">상태</TableHeader>
                <TableHeader width="150px">관리</TableHeader>
              </tr>
            </thead>
            <tbody>
              {contents.map((content, index) => (
                <TableRow key={content.contentId || index}>
                  <TableCell>{(currentPage - 1) * 9 + index + 1}</TableCell>
                  <TableCell>
                    {content.firstImage ? (
                      <ContentImage
                        src={content.firstImage}
                        alt={content.title}
                        onClick={() => handleViewContent(content.contentId)}
                      />
                    ) : (
                      <ContentImage
                        src="/images/no-image.png"
                        alt="이미지 없음"
                        $placeholder
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <ContentTitle
                      onClick={() => handleViewContent(content.contentId)}
                    >
                      {content.title}
                    </ContentTitle>
                  </TableCell>
                  <TableCell>
                    {categoryMapping[content.categoryCode] || "미분류"}
                  </TableCell>
                  <TableCell>{content.tel || "없음"}</TableCell>
                  <TableCell>
                    <StatusBadge
                      $variant={getStatusDisplay(content.status || "N").variant}
                    >
                      {getStatusDisplay(content.status || "N").text}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionButtonGroup>
                      <ActionButton
                        $view
                        onClick={() => handleViewContent(content.contentId)}
                        title="상세보기"
                      >
                        <i className="fas fa-eye"></i>
                      </ActionButton>
                      <ActionButton
                        $edit
                        onClick={() => handleEditContent(content.contentId)}
                        title="수정하기"
                      >
                        <i className="fas fa-edit"></i>
                      </ActionButton>

                      {content.status !== "Y" && (
                        <ActionButton
                          $approve
                          onClick={() =>
                            handleChangeStatus(content.contentId, "Y")
                          }
                          title="게시하기"
                        >
                          <i className="fas fa-check"></i>
                        </ActionButton>
                      )}

                      {content.status !== "N" && (
                        <ActionButton
                          $disable
                          onClick={() =>
                            handleChangeStatus(content.contentId, "N")
                          }
                          title="비활성화"
                        >
                          <i className="fas fa-ban"></i>
                        </ActionButton>
                      )}
                    </ActionButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </ContentTable>

          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
              </PaginationButton>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // 현재 페이지 기준으로 표시할 페이지 계산
                let startPage = Math.max(currentPage - 2, 1);
                if (currentPage > totalPages - 2) {
                  startPage = Math.max(totalPages - 4, 1);
                }
                const pageNum = startPage + i;
                if (pageNum > totalPages) return null;

                return (
                  <PageNumber
                    key={pageNum}
                    $active={pageNum === currentPage}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </PageNumber>
                );
              })}

              <PaginationButton
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-chevron-right"></i>
              </PaginationButton>
            </PaginationContainer>
          )}
        </TableContainer>
      )}
    </AdminContainer>
  );
};

export default AdminContentList;
