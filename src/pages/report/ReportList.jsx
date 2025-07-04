import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
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
  TableButton
} from './ReportList.styles';

const ReportList = () => {
  const apiUrl = window.ENV?.API_URL;
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  
  const [reportList, setReportList] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [findByReviewNo, setFindByReviewNo] = useState(null);

  const fetchReportList = useCallback(() => {
    if( !auth.accessToken) {
      console.warn('Access token이 없습니다.');
      return;
    }
    axios
      .get(`${apiUrl}/api/systm/reports`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        if (res.status === 200 && res.data && Array.isArray(res.data.items)) {
          setReportList(res.data.items);
        }
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '신고 목록 조회에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.error('신고 목록 조회 중 오류 발생:', err);
        alert('신고 목록을 불러오는 중 오류가 발생했습니다.');
        setReportList([]);
      });
  }, [auth.accessToken, apiUrl, navi]); 

  // 컴포넌트 마운트 시 또는 fetchReportList가 변경될 때 호출
  useEffect(() => {
    fetchReportList();
  }, [fetchReportList]);

  const handleOpenModal = (reviewNo) => { 
    setFindByReviewNo(reviewNo);
    setIsReportModalOpen(true); 
  };
  const handleCloseModal = () => { 
    setIsReportModalOpen(false); 
    setFindByReviewNo(null);
    fetchReportList();  /* 새로고침 */
  };
  
  return (
    <ReportListContainer>
      <Title>신고 목록</Title>
      { reportList.length === 0 && auth.accessToken ? (
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
                <TableHeader></TableHeader>
              </tr>
            </thead>

            <tbody>
              {reportList.map((list) => (
                <TableRow key={list.reportNo}>
                  <TableData>{list.reportNo}</TableData>
                  <TableData>{list.nickName}</TableData>
                  <TableData>{list.categoryName}</TableData>
                  <TableData>{list.penaltyName}</TableData>
                  <TableData className="content-column">{list.reportContent}</TableData>
                  <TableData>{list.createdDate}</TableData>
                  <TableData>{list.status}</TableData>
                  <TableData>
                    <TableButton onClick={() => handleOpenModal(list.reportNo)}>열람</TableButton>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </ReportTable>
        </>
      )}
      {isReportModalOpen && findByReviewNo && (
        <Report
          reviewNo={findByReviewNo}
          isOpen={isReportModalOpen}
          onClose={handleCloseModal} 
        />     
      )} 
    </ReportListContainer>
  );
};

export default ReportList;
