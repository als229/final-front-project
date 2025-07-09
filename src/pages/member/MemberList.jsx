import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Member from "./Member";
import {
  // 현대적인 관리자 스타일 컴포넌트
  AdminContainer,
  AdminHeader,
  AdminTitle,
  AdminTools,
  SearchForm,
  SearchInput,
  SearchButton,
  FilterContainer,
  FilterLabel,
  FilterSelect,
  AdminStatsRow,
  StatBox,
  StatTitle,
  StatNumber,
  TableContainer,
  AdminTable,
  TableHeader,
  TableRow,
  TableCell,
  StatusBadge,
  ActionButton,
  PaginationContainer,
  PaginationButton,
  PageNumber,
  LoadingState,
  ErrorState,
  EmptyState,
} from "./MemberList.styles";

const MemberList = () => {
  const apiUrl = window.ENV?.API_URL;
  const { auth } = useContext(AuthContext);

  const [memberList, setMemberList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchMemberList = useCallback(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${apiUrl}/api/systm/member`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        params: {
          status: statusFilter,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data && Array.isArray(res.data.items)) {
          setMemberList(res.data.items);
        } else {
          setError(
            res.data
              ? `${res.data.code} ${res.data.message}`
              : "회원 목록 조회에 실패했습니다."
          );
        }
      })
      .catch((err) => {
        console.error("회원 목록 조회 중 오류 발생:", err);
        setError("회원 목록을 불러오는 중 오류가 발생했습니다.");
        setMemberList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [auth.accessToken, apiUrl, statusFilter]);

  useEffect(() => {
    if (auth.accessToken) {
      fetchMemberList();
    } else {
      console.warn(
        "Access token이 아직 없습니다. 회원 목록 조회를 기다립니다."
      );
    }
  }, [auth.accessToken, statusFilter, fetchMemberList]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleOpenMemberModal = (member) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

  const handleCloseMemberModal = () => {
    setIsMemberModalOpen(false);
    setSelectedMember(null);
    fetchMemberList(); // 모달 닫은 후 목록 새로고침
  };

  // 검색어로 회원 필터링
  const filteredMembers = memberList.filter(
    (member) =>
      member.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nickName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.realName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이징 처리
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  // 날짜 포맷팅 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>
          <i className="fas fa-users-cog"></i> 회원 관리
        </AdminTitle>
        <AdminTools>
          <SearchForm onSubmit={handleSearchSubmit}>
            <SearchInput
              type="text"
              placeholder="이름, ID 또는 닉네임으로 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchButton type="submit">
              <i className="fas fa-search"></i>
            </SearchButton>
          </SearchForm>
          <FilterContainer>
            <FilterLabel>상태:</FilterLabel>
            <FilterSelect
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="">모든 회원</option>
              <option value="Y">활성 계정</option>
              <option value="N">비활성 계정</option>
            </FilterSelect>
          </FilterContainer>
        </AdminTools>
      </AdminHeader>

      <AdminStatsRow>
        <StatBox>
          <StatTitle>전체 회원</StatTitle>
          <StatNumber>{memberList.length}</StatNumber>
        </StatBox>
        <StatBox $active>
          <StatTitle>활성 계정</StatTitle>
          <StatNumber>
            {memberList.filter((m) => m.status === "Y").length}
          </StatNumber>
        </StatBox>
        <StatBox $inactive>
          <StatTitle>비활성 계정</StatTitle>
          <StatNumber>
            {memberList.filter((m) => m.status === "N").length}
          </StatNumber>
        </StatBox>
      </AdminStatsRow>

      {loading ? (
        <LoadingState>
          <i className="fas fa-spinner fa-spin"></i> 회원 정보를 불러오는
          중입니다...
        </LoadingState>
      ) : error ? (
        <ErrorState>
          <i className="fas fa-exclamation-circle"></i> {error}
        </ErrorState>
      ) : filteredMembers.length === 0 ? (
        <EmptyState>
          <i className="fas fa-user-slash"></i>
          <p>등록된 회원이 없거나 검색 결과가 없습니다.</p>
        </EmptyState>
      ) : (
        <TableContainer>
          <AdminTable>
            <thead>
              <tr>
                <TableHeader>No.</TableHeader>
                <TableHeader>아이디</TableHeader>
                <TableHeader>닉네임</TableHeader>
                <TableHeader>이름</TableHeader>
                <TableHeader>가입일</TableHeader>
                <TableHeader>상태</TableHeader>
                <TableHeader>관리</TableHeader>
              </tr>
            </thead>

            <tbody>
              {currentMembers.map((member, index) => (
                <TableRow key={member.userNo}>
                  <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>{member.userId}</TableCell>
                  <TableCell>{member.nickName}</TableCell>
                  <TableCell>{member.realName}</TableCell>
                  <TableCell>{formatDate(member.createdTime)}</TableCell>
                  <TableCell>
                    <StatusBadge $active={member.status === "Y"}>
                      {member.status === "Y" ? "활성" : "비활성"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionButton onClick={() => handleOpenMemberModal(member)}>
                      <i className="fas fa-user-edit"></i> 관리
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </AdminTable>

          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
              </PaginationButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PageNumber
                    key={page}
                    $active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PageNumber>
                )
              )}

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

      {isMemberModalOpen && selectedMember && (
        <Member
          member={selectedMember}
          isOpen={isMemberModalOpen}
          onClose={handleCloseMemberModal}
          onUpdateSuccess={fetchMemberList}
        />
      )}
    </AdminContainer>
  );
};

export default MemberList;
