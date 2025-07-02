import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Report from "./Report";

const ReportList = () => {
  const apiUrl = window.ENV?.API_URL;
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const [reportList, setReportList] = useState([]);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [findByReviewNo, setFindByReviewNo] = useState(null);

  const fetchReportList = useCallback(() => {
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
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          alert('인증 정보가 유효하지 않습니다. 다시 로그인해주세요.');
          navi('/login');
        }
        else {
          alert('신고 목록을 불러오는 중 오류가 발생했습니다.');
        }
        setReportList([]);
      });
  }, [auth, apiUrl, navi]); 

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
    fetchReportList();
  };
  
  return (
    <div>
      <h1>신고 목록</h1>
      { reportList.length === 0 ? (
        <p>신고된 내용이 없습니다.</p>
      ) : (
        <>
          <p>총 {reportList.length}건의 신고가 있습니다.</p>
          <ul>
            {reportList.map((list) => (
              <li key={list.reportNo}>
                <p>신고 번호: {list.reportNo}</p>
                <p>신고자: {list.nickName}</p>
                <p>신고유형: {list.categoryName}</p>
                <p>제재유형: {list.penaltyName}</p>
                <p>내용: {list.reportContent}</p>
                <p>신고일: {list.createdDate}</p>
                <p>처리상태: {list.status}</p>
                <button onClick={handleOpenModal(list.reportNo)}>열람</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {isReportModalOpen && findByReviewNo && (
        <Report
          reviewNo={findByReviewNo}
          isOpen={isReportModalOpen}
          onClose={handleCloseModal} 
        />     
      )} 
    </div>
  );
};

export default ReportList;
