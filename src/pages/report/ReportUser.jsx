import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
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

const ReportUser = ({ reviewNo, isOpen, onClose }) => {
  const apiUrl = window.ENV?.API_URL;
  const { auth } = useContext(AuthContext);

  const [reportContent, setReportContent] = useState('');
  const [findByCategoryNo, setFindByCategoryNo] = useState('');

  const [reportCategorys, setReportCategorys] = useState([]);

  useEffect(() => {
    if (isOpen && reportCategorys.length === 0) {
      fetchReportCategory();
    }
  }, [isOpen, reportCategorys.length]);

  const fetchReportCategory = () => {
    axios
      .get(`${apiUrl}/api/systm/reportCategorys`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
          if (res.status === 200 && res.data && Array.isArray(res.data.items)) {
              const categorys = res.data.items.map((cat) => ({
                  categoryNo: cat.categoryNo,
                  categoryName: cat.categoryName,
              }));
              setReportCategorys(categorys);
              // 카테고리 로드 후 첫 번째 항목을 기본값으로 설정
              if (categorys.length > 0 && !findByCategoryNo) {
                  setFindByCategoryNo(categorys[0].categoryNo);
              }
          } 
          else {
              alert(res.data ? `${res.data.code} ${res.data.message}` : '신고 카테고리 조회에 실패했습니다.');
              setReportCategorys([]);
          }
      })
      .catch((err) => {
          console.error('신고 카테고리 조회 중 오류 발생:', err);
          setReportCategorys([]);
      });
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setReportContent('');
    setFindByCategoryNo('');
    if (onClose) { onClose(); }
  };

  // 신고 제출 핸들러
  const handleSubmit = () => { 
    if (!reviewNo) {
        alert('신고하려는 리뷰 정보가 없습니다.');
        return;
    }
    if (!findByCategoryNo) {
        alert('신고 유형을 선택해주세요.');
        return;
    }
    if (!reportContent.trim()) {
        alert('신고 내용을 입력해주세요.');
        return;
    }

    const dto = {
        reviewNo: reviewNo,
        categoryNo: findByCategoryNo,
        penaltyNo: 1, // 사용자 신고의 기본 제재 유형
        reportContent: reportContent,
    };

    axios
      .post(`${apiUrl}/api/systm/reports`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
          if (res.data.code === 'R101') {
              alert('리뷰 신고가 접수되었습니다. 감사합니다.');
              handleCloseModal();
          } else {
              alert(res.data ? `${res.data.code} ${res.data.message}` : '리뷰 신고 접수에 실패했습니다. 다시 시도해주세요.');
          }
      })
      .catch((err) => {
          console.error('리뷰 신고 처리 중 오류 발생:', err);
          alert('리뷰 신고 처리 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  return (
    <Modal 
        isOpen={isOpen} 
        onClose={handleCloseModal}>
        <ReportContainer>
            <h2>리뷰 신고하기</h2>
            <ReportForm>
                <ReportLabel htmlFor="report-category">신고 유형:</ReportLabel>
                <Select
                    id="report-category"
                    value={findByCategoryNo}
                    onChange={(e) => setFindByCategoryNo(Number(e.target.value))}
                >
                    <option value="">--- 신고 유형 선택 ---</option>
                    {reportCategorys.map((cat) => (
                        <option
                            key={cat.categoryNo}
                            value={cat.categoryNo}
                        >{cat.categoryName}</option>
                    ))}
                </Select>
            </ReportForm>

            <p>신고 내용을 자세히 입력해주세요. (최대 200자)</p>
            <ReportTextArea
                placeholder="신고 내용을 입력해주세요..."
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                rows="5"
                maxLength="200"
            ></ReportTextArea>

            <SubmitButton onClick={handleSubmit}>신고 제출</SubmitButton>
        </ReportContainer>
    </Modal>
  );
};

export default ReportUser;
