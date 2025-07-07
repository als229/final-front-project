import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Modal from '@/Common/Modal/Modal';
import { 
  ReportContainer, 
  ReportForm, 
  ReportLabel, 
  Select, 
  ReportTextArea, 
  SubmitButton,
} from './Report.styles';

const Report = ({ 
  reportNo,
  reviewNo,
  initialReportContent,
  initialCategoryNo,
  initialCategoryName,
  initialPenaltyNo,
  initialStatus,
  isOpen,
  onClose
}) => {
  const apiUrl = window.ENV?.API_URL;
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const [adminComment, setAdminComment] = useState('');
  const [originalReportContent, setOriginalReportContent] = useState(initialReportContent || '');

  const [findByPenaltyNo, setFindByPenaltyNo] = useState(initialPenaltyNo || '');
  const [processingStatus, setProcessingStatus] = useState(initialStatus || 'D');

  const [reportPenaltys, setReportPenaltys] = useState([]);

  /* 카테고리 불러오기 */
  useEffect(() => { 
    if(isOpen) {
      setOriginalReportContent(initialReportContent || '');
      setFindByPenaltyNo(initialPenaltyNo || '');
      setProcessingStatus(initialStatus || 'D');
      if(reportPenaltys.length === 0) { fetchReportPenalty(); }
    }
  }, [isOpen, initialReportContent, initialStatus, initialPenaltyNo, reportPenaltys.length]);

  /* 제재 유형 조회 */
  const fetchReportPenalty = () => {
    axios
      .get(`${apiUrl}/api/systm/penaltys`, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200 && res.data && Array.isArray(res.data.items) && res.data.items.length > 0) {
          const penaltys = res.data.items.map((pen) => ({
            penaltyNo: pen.penaltyNo,
            penaltyName: pen.penaltyName,
          }));
          setReportPenaltys(penaltys);
          if(penaltys.length > 0 && !initialPenaltyNo) { setFindByPenaltyNo(penaltys[0].penaltyNo); }
        }
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '신고 제재 유형 조회에 실패했습니다.');
          setReportPenaltys([]);
        }
      })
      .catch((err) => {
        console.error('신고 제재 유형 조회 중 오류 발생:', err);
        setReportPenaltys([]);
      });
  };

  /* 모달 닫기 핸들러 */
  const handleCloseModal = () => { 
    setAdminComment('');
    setFindByPenaltyNo('');
    setProcessingStatus('D');
    if(onClose) { onClose(); }
  };

  /* 신고 내용 제출 핸들러 */
  const handleSubmit = () => {
    if( !reportNo) {
      alert('처리할 신고 정보가 없습니다.');
      return;
    }
    if( !findByPenaltyNo) {
      alert('제재 유형을 선택해주세요.');
      return;
    }
    
    /* 보관 */
    const dto = {
      reportNo: reportNo,
      reviewNo: reviewNo,
      penaltyNo: findByPenaltyNo,
      status: processingStatus,
    };

    axios
      .post(`${apiUrl}/api/systm/reports`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.date.code === 'R101') {
          alert('성공적으로 처리되었습니다.');
          handleCloseModal();
        }
        else { alert(res.data ? `${res.data.code} ${res.data.message}` : '신고 처리에 실패했습니다. 다시 시도해주세요.'); }
      })
      .catch((err) => {
        console.error('신고 처리 중 오류 발생:', err);
        alert('신고 처리 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  // 리뷰 삭제 요청 핸들러
  const handleDeleteReview = () => {
    if( !reviewNo) {
      alert('삭제할 리뷰 정보가 없습니다.');
      return;
    }

    if(window.confirm(`정말로 리뷰 (번호: ${reviewNo})를 삭제하시겠습니까?`)) {
      axios
        .delete(`${apiUrl}/api/systm/report/${reviewNo}`, { 
          headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        if (res.data.code === 'R101') { 
          alert(`리뷰 (번호: ${reviewNo})가 성공적으로 삭제되었습니다.`);
          handleCloseModal(); 
        } 
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.error('리뷰 삭제 중 오류 발생:', err);
        alert('리뷰 삭제 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleCloseModal}
    >
      <ReportContainer>
        <h2>신고 처리 (관리자)</h2>

        {/* 모든 정보 필드 항상 표시 */}
        <ReportForm>
          <ReportLabel>신고 번호:</ReportLabel>
          <ReportTextArea
            value={reportNo}
            rows="1"
            readOnly
          />
        </ReportForm>

        <ReportForm>
          <ReportLabel>리뷰 번호:</ReportLabel>
          <ReportTextArea
            value={reviewNo}
            rows="1"
            readOnly
          />
        </ReportForm>

        <ReportForm>
          <ReportLabel>신고 유형:</ReportLabel>
          <ReportTextArea
            value={initialCategoryName || '불러오는 중...'}
            rows="1"
            readOnly
          ></ReportTextArea>
        </ReportForm>

        <ReportForm>
          <ReportLabel>사용자 신고 내용:</ReportLabel>
          <ReportTextArea
            value={originalReportContent}
            rows="3"
            readOnly
          ></ReportTextArea>
        </ReportForm>

        <ReportForm>
          <ReportLabel htmlFor="report-penalty">제재 유형:</ReportLabel>
          <Select
            id="report-penalty"
            value={findByPenaltyNo}
            onChange={(e) => setFindByPenaltyNo(Number(e.target.value))}
          >{reportPenaltys.map((pen) => (
              <option
                key={pen.penaltyNo}
                value={pen.penaltyNo}
              >{pen.penaltyName}</option>
            ))}
          </Select>
        </ReportForm>

        <ReportForm>
          <ReportLabel htmlFor="processing-status">처리 상태:</ReportLabel>
          <Select
            id="processing-status"
            value={processingStatus}
            onChange={(e) => setProcessingStatus(e.target.value)}
          >
            <option value="D">검토 중</option>
            <option value="Y">처리 완료</option>
            <option value="N">반려</option>
          </Select>
        </ReportForm>

        <SubmitButton onClick={handleSubmit}>신고 처리 완료</SubmitButton>
        {reviewNo && (
          <DeleteButton onClick={handleDeleteReview}>리뷰 삭제 요청</DeleteButton>
        )}
      </ReportContainer>
  </Modal>
  );
};

export default Report;
