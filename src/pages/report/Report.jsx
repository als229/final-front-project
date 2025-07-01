import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@/Common/Modal/Modal';

const Report = ({ reviewNo }) => {
  const apiUrl = window.ENV?.API_URL;
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');

  const [reportCategorys, setReportCategorys] = useState([]);
  const [findByCategoryNo, setFindByCategoryNo] = useState('');

  const [reportPenaltys, setReportPenaltys] = useState([]);
  const [findByPenaltyNo, setFindByPenaltyNo] = useState('');

  /* 카테고리 불러오기 */
  useEffect(() => { 
    if(reportModalOpen) {
      if(reportCategorys.length === 0) { fetchReportCategory(); }
      if(reportPenaltys.length === 0) { fetchReportPenalty(); }
    }
  }, [reportModalOpen, reportCategorys.length, reportPenaltys.length]);

  /* 신고 카테고리 조회 */
  const fetchReportCategory = () => {
    axios
      .get(apiUrl + '/api/systm/categorys')
      .then((res) => {
        if(res.status === 200 && res.data && Array.isArray(res.data)) {
          const categorys = res.data.map((cat) => ({
            categoryNo: cat.categoryNo,
            categoryName: cat.categoryName,
          }));

          setReportCategorys(categorys);
          if(categorys.length > 0) { setFindByCategoryNo(categorys[0].categoryNo); }
        }else { 
          alert('신고 카테고리 조회에 실패했습니다.'); 
        }
      })
      .catch((err) => {
        console.error('신고 카테고리 조회 중 오류 발생:', err);
        alert('신고 카테고리 정보를 불러올 수 없습니다.');
      });
  };

  /* 제재 유형 조회 */
  const fetchReportPenalty = () => {
    axios
      .get(apiUrl + '/api/systm/penaltys')
      .then((res) => {
        if(res.status === 200 && res.data && Array.isArray(res.data)) {
          const penaltys = res.data.map((pen) => ({
            penaltyNo: pen.penaltyNo,
            penaltyName: pen.penaltyName,
          }));
          
          setReportPenaltys(penaltys);
          if(penaltys.length > 0) { setSelectedPenaltyNo(penaltys[0].penaltyNo); }
        }else {
          alert('신고 제재 유형 조회에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.error('신고 제재 유형 조회 중 오류 발생:', err);
        alert('신고 제재 유형 정보를 불러올 수 없습니다.');
      });
  };

  /* Modal 열기 및 닫기 핸들러 */
  const handleOpenModal = () => { setReportModalOpen(true); };
  const handleCloseModal = () => { 
    setReportModalOpen(false); 
    setReportContent('');
    setFindByCategoryNo('');
    setFindByPenaltyNo('');
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
    if( !findByPenaltyNo) {
      alert('신고 제재 유형을 선택해주세요.');
      return;
    }
    if( !reportContent.trim()) {
      alert('신고 내용을 입력해주세요.');
      return;
    }
    /* 보관 */
    const saveDate = {
      reviewNo: reviewNo,
      categoryNo: findByCategoryNo,
      penaltyNo: findByPenaltyNo,
      reportContent: reportContent,
    };

    axios
      .post(apiUrl + '/api/systm/reports', saveDate)
      .then((res) => {
        if(res.data?.code === 'R100') {
          alert('신고가 접수되었습니다. 감사합니다.');
          handleCloseModal();
        }else {
          alert('신고 접수에 실패했습니다. 다시 시도해주세요.');
          console.error('신고 접수 실패:', res.data);
        }
      })
      .catch((err) => {
        console.error('신고 처리 중 오류 발생:', err)
        alert('신고 처리 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  return (
    <>
      <h1>리뷰 신고</h1>
      
      <button onClick={handleOpenModal}>신고하기</button>
      <Modal 
        isOpen={reportModalOpen} 
        onClose={handleCloseModal}>
        
        <div className="report-modal-content">
          <h2>신고 접수</h2>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="report-category" 
              style={{ 
                display: 'block', 
                marginBottom: '5px' 
              }}
            >신고 유형:</label>
            <select
              id="report-category"
              value={findByCategoryNo}
              onChange={(e) => setFindByCategoryNo(Number(e.target.value))}
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid #ccc' 
              }}
            >
              <option value="">-- 카테고리 선택 --</option>
              {reportCategorys.map((cat) => (
                <option 
                  key={cat.categoryNo} 
                  value={cat.categoryNo}
                >
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="report-penalty" 
              style={{ 
                display: 'block', 
                marginBottom: '5px' 
              }}
            >제재 유형:</label>
            <select
              id="report-penalty"
              value={findByPenaltyNo}
              onChange={(e) => setFindByPenaltyNo(Number(e.target.value))}
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid #ccc' 
              }}
            >
              <option value="">-- 카테고리 선택 --</option>
              {reportPenaltys.map((pen) => (
                <option 
                  key={pen.penaltyNo} 
                  value={pen.penaltyNo}
                >
                  {pen.penaltyName}
                </option>
              ))}
            </select>
          </div>

          <p>어떤 내용을 신고하시겠습니까?</p>
          <textarea
            placeholder="신고 내용을 입력해주세요..."
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            rows="5"
            style={{ 
              width: '100%', 
              marginBottom: '10px' 
            }}
          ></textarea>

          <button onClick={handleSubmit}>제출하기</button>
        </div>
      </Modal>
    </>
  );
};

export default Report;
