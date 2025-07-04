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

const Report = ({ reviewNo, isOpen, onClose }) => {
  const apiUrl = window.ENV?.API_URL;
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);
  const [isCurrentAdmin, setIsCurrentAdmin] = useState(false);

  const [reportContent, setReportContent] = useState('');

  const [reportCategorys, setReportCategorys] = useState([]);
  const [findByCategoryNo, setFindByCategoryNo] = useState('');

  const [reportPenaltys, setReportPenaltys] = useState([]);
  const [findByPenaltyNo, setFindByPenaltyNo] = useState('');

  /* 카테고리 불러오기 */
  useEffect(() => { 
    if(isOpen) {
      if(reportCategorys.length === 0) { fetchReportCategory(); }
      if( !isCurrentAdmin && reportPenaltys.length === 0) { fetchReportPenalty(); }
    }
  }, [isOpen, isCurrentAdmin, reportCategorys.length, reportPenaltys.length]);

  /* 신고 카테고리 조회 */
  const fetchReportCategory = () => {
    axios
      .get(`${apiUrl}/api/systm/reportCategorys`, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200 && res.data && Array.isArray(res.data.items)) {
          const categorys = res.data.items.map((cat) => ({
            categoryNo: cat.categoryNo,
            categoryName: cat.categoryName,
          }));
          setReportCategorys(categorys);
          if(categorys.length > 0 && !findByCategoryNo) { setFindByCategoryNo(categorys[0].categoryNo); }
        }
        else { alert(res.data ? `${res.data.code} ${res.data.message}` : '신고 카테고리 조회에 실패했습니다.'); }
      })
      .catch((err) => {
        console.error('신고 카테고리 조회 중 오류 발생:', err);
        setReportCategorys([]);
        setFindByCategoryNo('');
      });
  };

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
          if(penaltys.length > 0 && !findByPenaltyNo) { setFindByPenaltyNo(penaltys[0].penaltyNo); }
        }
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '신고 제재 유형 조회에 실패했습니다.');
          setReportPenaltys([]);
          setFindByPenaltyNo('');
        }
      })
      .catch((err) => {
        console.error('신고 제재 유형 조회 중 오류 발생:', err);
        setReportPenaltys([]);
        setFindByPenaltyNo('');
      });
  };

  /* 모달 닫기 핸들러 */
  const handleCloseModal = () => { 
    setReportContent('');
    setFindByCategoryNo('');
    setFindByPenaltyNo('');
    if(onClose) { onClose(); }
  };

  /* 신고 내용 제출 핸들러 */
  const handleSubmit = () => {
    if( !reviewNo) {
      alert('신고하려는 리뷰 정보가 없습니다.');
      return;
    }
    if( !findByCategoryNo) {
      alert('신고 카테고리를 선택해주세요.');
      return;
    }
    /* 관리자일 경우 제재 유형 필수 */
    let finalPenaltyNo;
    if(isCurrentAdmin) {
      if( !findByPenaltyNo) {
        alert('신고 제재 유형을 선택해주세요.');
        return;
      }
      finalPenaltyNo = findByPenaltyNo;
    }
    /* 일반 사용자는 제재 유형 1 설정 */
    else { finalPenaltyNo = 1; } 
    if( !reportContent.trim()) {
      alert('신고 내용을 입력해주세요.');
      return;
    }
    /* 보관 */
    const dto = {
      reviewNo: reviewNo,
      categoryNo: findByCategoryNo,
      penaltyNo: finalPenaltyNo,
      reportContent: reportContent,
    };

    axios
      .post(`${apiUrl}/api/systm/reports`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.date.code === 'R101') {
          alert('신고가 접수되었습니다. 감사합니다.');
          handleCloseModal();
        }
        else { alert(res.data ? `${res.data.code} ${res.data.message}` : '신고 접수에 실패했습니다. 다시 시도해주세요.'); }
      })
      .catch((err) => {
        console.error('신고 처리 중 오류 발생:', err);
        alert('신고 처리 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleCloseModal}>
      
      <ReportContainer>
        <h2>신고하시겠습니까?</h2>
        <ReportForm>
          <ReportLabel htmlFor="report-category">신고 유형:</ReportLabel>
          <Select
            id="report-category"
            value={findByCategoryNo}
            onChange={(e) => setFindByCategoryNo(Number(e.target.value))}
          >
            <option value="">---신고 유형 선택---</option>
            {reportCategorys.map((cat) => (
              <option 
                key={cat.categoryNo} 
                value={cat.categoryNo}
              >{cat.categoryName}
              </option>
            ))}
          </Select>
        </ReportForm>

        {isCurrentAdmin && (
          <ReportForm>
            <ReportLabel htmlFor="report-penalty">제재 유형:</ReportLabel>
            <Select
              id="report-penalty"
              value={findByPenaltyNo}
              onChange={(e) => setFindByPenaltyNo(Number(e.target.value))}
            >
              {reportPenaltys.map((pen) => (
                <option 
                  key={pen.penaltyNo} 
                  value={pen.penaltyNo}
                >{pen.penaltyName}
                </option>
              ))}
            </Select>
          </ReportForm>
        )}

        <p>신고 내용을 입력해주세요. (최대 200자)</p>
        <ReportTextArea
          placeholder="신고 내용을 입력해주세요..."
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          rows="5"
        ></ReportTextArea>

        <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
      </ReportContainer>
    </Modal>
  );
};

export default Report;
