import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Report from "./Report";
import {
  ReportListContainer,
  Title,
  Message,
  ReportCount,
  ReportTable,
  TableHeader,
  TableRow,
  TableData,
  TableButton,
} from "./ReportList.styles";

const ReportList = () => {
  const apiUrl = window.ENV?.API_URL;
  const { auth } = useContext(AuthContext);

  const [reportList, setReportList] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [findByReviewData, setFindByReviewData] = useState(null);

  const [reportStatusFilter, setReportStatusFilter] = useState(""); // 상태 필터 (Y:처리, D:처리 중 N:거절, '':전체)

  const fetchReportList = useCallback(() => {
    axios
      .get(`${apiUrl}/api/systm/reports`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        params: {
          status: reportStatusFilter, //기능 추가
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data && Array.isArray(res.data.items)) {
          setReportList(res.data.items);
        } else {
        }
      })
      .catch((err) => {
        console.error("신고 목록 조회 중 오류 발생:", err);
        alert("신고 목록을 불러오는 중 오류가 발생했습니다.");
        setReportList([]);
      });
  }, [auth.accessToken, apiUrl, reportStatusFilter]);

  // 컴포넌트 마운트 시, 또는 필터 조건 변경 시 호출
  useEffect(() => {
    if (auth.accessToken) {
      fetchReportList();
    } else {
      console.warn(
        "Access token이 아직 없습니다. 회원 목록 조회를 기다립니다."
      );
    }
  }, [auth.accessToken, reportStatusFilter, fetchReportList]);

  // 필터 입력 변경 핸들러
  const handleReportStatusFilterChange = (e) => {
    setReportStatusFilter(e.target.value);
  };
  const handleApplyReportFilter = () => {
    fetchReportList(); // 변경된 필터 상태로 다시 목록 조회
  };

  const handleOpenModal = (report) => {
    setFindByReviewData(report);
    setIsReportModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsReportModalOpen(false);
    setFindByReviewData(null);
    fetchReportList(); // 모달 닫은 후 목록 새로고침
  };

  return (
    <ReportListContainer>
      <Title>신고 목록</Title>
      <div>
        <select
          value={reportStatusFilter}
          onChange={handleReportStatusFilterChange}
        >
          <option value="">전체 상태</option>
          <option value="D">처리 대기</option>
          <option value="Y">처리 완료</option>
          <option value="N">반려</option>
        </select>
        <button onClick={handleApplyReportFilter}>조회</button>
      </div>

      {reportList.length === 0 && auth.accessToken ? (
        <Message>신고된 내용이 없습니다.</Message>
      ) : (
        <>
          <ReportCount>총 {reportList.length}건의 신고가 있습니다.</ReportCount>
          <ReportTable>
            <thead>
              <tr>
                <TableHeader>신고 번호</TableHeader>
                <TableHeader>신고자</TableHeader>
                <TableHeader>신고유형</TableHeader>
                <TableHeader>제재유형</TableHeader>
                <TableHeader>내용</TableHeader>
                <TableHeader>신고일</TableHeader>
                <TableHeader>처리상태</TableHeader>
                <TableHeader>처리</TableHeader>
              </tr>
            </thead>

            <tbody>
              {reportList.map((list) => (
                <TableRow key={list.reportNo}>
                  <TableData>{list.reportNo}</TableData>
                  <TableData>{list.nickName}</TableData>
                  <TableData>{list.categoryName}</TableData>
                  <TableData>{list.penaltyName}</TableData>
                  <TableData className="content-column">
                    {list.reportContent}
                  </TableData>
                  <TableData>{list.createdDate}</TableData>
                  <TableData>{list.status}</TableData>
                  <TableData>
                    <TableButton onClick={() => handleOpenModal(list)}>
                      열람
                    </TableButton>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </ReportTable>
        </>
      )}
      {isReportModalOpen && findByReviewData && (
        <Report
          reportNo={findByReviewData.reportNo}
          reviewNo={findByReviewData.reviewNo}
          initialReportContent={findByReviewData.reportContent}
          initialCategoryNo={findByReviewData.categoryNo}
          initialCategoryName={findByReviewData.categoryName}
          initialPenaltyNo={findByReviewData.penaltyNo}
          initialStatus={findByReviewData.status}
          isOpen={isReportModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </ReportListContainer>
  );
};

export default ReportList;
