import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PageContainer,
  Title,
  HorizontalRule,
  Section, 
  SectionTitle,
  InputGroup, 
  Input, 
  Select, 
  Button, 
  ListTitle, 
  ItemList,
  ListItem, 
  ItemName, 
  EditInput, 
  SaveButton, 
  CancelButton,
  EditButton, 
  DeleteButton, 
  NoDataMessage
} from './Address.styles'; 

const Address = () => {
  const apiUrl = window.ENV?.API_URL;
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);

  const [sidos, setSidos] = useState([]);
  const [newSidoName, setNewSidoName] = useState('');
  const [editingSido, setEditingSido] = useState(null);
  const [editedSidoName, setEditedSidoName] = useState('');

  const [sigungus, setSigungus] = useState([]);
  const [findBySidoNo, setFindBySidoNo] = useState('');
  const [newSigunguName, setNewSigunguName] = useState('');
  const [editingSigungu, setEditingSigungu] = useState(null);
  const [editedSigunguName, setEditedSigunguName] = useState('');

  const [dongs, setDongs] = useState([]);
  const [findBySigunguNo, setFindBySigunguNo] = useState(''); 
  const [newDongName, setNewDongName] = useState('');
  const [editingDong, setEditingDong] = useState(null); 
  const [editedDongName, setEditedDongName] = useState('');

  useEffect(() => {
    if(auth.accessToken) {
      fetchSido();
      fetchSigungu();
      fetchDong();
    }
  }, [auth.accessToken]);

  /* 시도 조회 */
  const fetchSido = () => {
    axios
      .get(`${apiUrl}/api/systm/sido`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        if(res.status === 200 && res.data && Array.isArray(res.data.items)) {
          setSidos(res.data.items.map((sido) => ({
            sidoNo: sido.sidoNo,
            sidoName: sido.sidoName,
          })));
        } 
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '시/도 조회에 실패했습니다.');
          setSidos([]);
        }
      })
      .catch((err) => {
        console.error('시/도 조회 중 오류 발생:', err);
        setSidos([]);
      });
  };

  /* 시도 추가 */
  const handleSubmitSido = () => {
    if(!newSidoName || newSidoName.trim() === '') {
      alert('시/도 이름을 입력해주세요.');
      return;
    }
    if(sidos.some(sido => sido.sidoName === newSidoName.trim())) {
      alert('이미 존재하는 시/도 이름입니다.');
      return;
    }
    const dto = {
      sidoName: newSidoName.trim(),
    };

    axios
      .post(`${apiUrl}/api/systm/sido`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200) {
          alert('시/도 등록에 성공했습니다.');
          setNewSidoName('');
          fetchSido(); 
        } 
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '시/도 등록에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.error('시/도 등록 중 오류 발생:', err);
        alert('시/도 등록 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  /* 시도 수정 시작 */
  const handleEditSido = (sido) => {
    setEditingSido(sido.sidoNo);
    setEditedSidoName(sido.sidoName);
  };

  /* 시도 수정 저장 */
  const handleSaveEditedSido = (sidoNo) => {
    if(!editedSidoName || editedSidoName.trim() === '') {
      alert('수정할 시/도 이름을 입력해주세요.');
      return;
    }
    if(sidos.some(sido => sido.sidoName === editedSidoName.trim() && sido.sidoNo !== sidoNo)) {
      alert('이미 존재하는 시/도 이름입니다.');
      return;
    }
    const dto = {
      sidoName: editedSidoName.trim(),
    };

    axios
      .put(`${apiUrl}/api/systm/sido/${sidoNo}`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200) {
          alert('시/도 수정에 성공했습니다.');
          setEditingSido(null);
          setEditedSidoName('');
          fetchSido();
        } 
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '시/도 수정에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.error('시/도 수정 중 오류 발생:', err);
        alert('시/도 수정 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  /* 시도 수정 취소 */
  const handleCancelEditSido = () => {
    setEditingSido(null);
    setEditedSidoName('');
  };

  /* 시도 삭제 */
  const handleDeleteSido = (sidoNo) => {
    if( !window.confirm('정말로 이 시/도를 삭제하시겠습니까? 관련 시/군/구 및 읍/면/동도 삭제될 수 있습니다.')) { return; }
    
    axios
      .delete(`${apiUrl}/api/systm/sido/${sidoNo}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200) {
        alert('시/도 삭제에 성공했습니다.');
        fetchSido(); 
        fetchSigungu();
        fetchDong();
      } 
      else {
        alert(res.data ? `${res.data.code} ${res.data.message}` : '시/도 삭제에 실패했습니다. 다시 시도해주세요.');
      }
      })
      .catch((err) => {
        console.error('시/도 삭제 중 오류 발생:', err);
        alert('시/도 삭제 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };


  /* 시군구 조회 */
  const fetchSigungu = () => {
    axios
    .get(`${apiUrl}/api/systm/sigungu`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    })
    .then((res) => {
      if(res.status === 200 && res.data && Array.isArray(res.data.items)) {
        setSigungus(res.data.items.map((sigungu) => ({
          sigunguNo: sigungu.sigunguNo,
          sidoNo: sigungu.sidoNo,
          sigunguName: sigungu.sigunguName,
        })));
      } 
      else {
        alert(res.data ? `${res.data.code} ${res.data.message}` : '시/군/구 조회에 실패했습니다.');
        setSigungus([]);
      }
    })
    .catch((err) => {
      console.error('시/군/구 조회 중 오류 발생:', err);
      setSigungus([]);
    });
  };

  /* 시군구 추가 */
  const handleSubmitSigungu = () => {
    if( !findBySidoNo) {
      alert('시/도를 선택해주세요.');
      return;
    }
    if( !newSigunguName || newSigunguName.trim() === '') {
      alert('시/군/구 이름을 입력해주세요.');
      return;
    }
    if(sigungus.some(sigungu => sigungu.sidoNo === findBySidoNo && sigungu.sigunguName === newSigunguName.trim())) {
      alert('해당 시/도에 이미 존재하는 시/군/구 이름입니다.');
      return;
    }
    const dto = {
      sidoNo: findBySidoNo,
      sigunguName: newSigunguName.trim(),
    };

    axios
      .post(`${apiUrl}/api/systm/sigungu`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if (res.status === 200) {
          alert('시/군/구 등록에 성공했습니다.');
          setNewSigunguName('');
          fetchSigungu();
        } else {
          alert(res.data ? `${res.data.code} ${res.data.code}` : '시/군/구 등록에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.error('시/군/구 등록 중 오류 발생:', err);
        alert('시/군/구 등록 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  /* 시군구 수정 시작 */
  const handleEditSigungu = (sigungu) => {
    setEditingSigungu(sigungu.sigunguNo);
    setEditedSigunguName(sigungu.sigunguName);
  };

  /* 시군구 수정 저장 */
  const handleSaveEditedSigungu = (sigunguNo) => {
    if( !editedSigunguName || editedSigunguName.trim() === '') {
      alert('수정할 시/군/구 이름을 입력해주세요.');
      return;
    }
    const currentSigungu = sigungus.find(s => s.sigunguNo === sigunguNo);
    if(sigungus.some(sigungu => sigungu.sidoNo === currentSigungu.sidoNo && sigungu.sigunguName === editedSigunguName.trim() && sigungu.sigunguNo !== sigunguNo)) {
      alert('해당 시/도에 이미 존재하는 시/군/구 이름입니다.');
      return;
    }
    const dto = {
      sigunguName: editedSigunguName.trim(),
    };

    axios
      .put(`${apiUrl}/api/systm/sigungu/${sigunguNo}`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200) {
          alert('시/군/구 수정에 성공했습니다.');
          setEditingSigungu(null);
          setEditedSigunguName('');
          fetchSigungu(); 
        } 
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '시/군/구 수정에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.error('시/군/구 수정 중 오류 발생:', err);
        alert('시/군/구 수정 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  /* 시군구 수정 취소 */
  const handleCancelEditSigungu = () => {
    setEditingSigungu(null);
    setEditedSigunguName('');
  };

  /* 시군구 삭제 */
  const handleDeleteSigungu = (sigunguNo) => {
    if( !window.confirm('정말로 이 시/군/구를 삭제하시겠습니까? 관련 읍/면/동도 삭제될 수 있습니다.')) { return; }

    axios
      .delete(`${apiUrl}/api/systm/sigungu/${sigunguNo}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200) {
          alert('시/군/구 삭제에 성공했습니다.');
          fetchSigungu(); 
          fetchDong(); 
        } 
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '시/군/구 삭제에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.error('시/군/구 삭제 중 오류 발생:', err);
        alert('시/군/구 삭제 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };


  /* 읍/면/동 조회 */
  const fetchDong = () => {
    axios
    .get(`${apiUrl}/api/systm/dong`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    })
    .then((res) => {
      if(res.status === 200 && res.data && Array.isArray(res.data.items)) {
        setDongs(res.data.items.map((dong) => ({
          dongNo: dong.dongNo,
          sigunguNo: dong.sigunguNo,
          dongName: dong.dongName,
        })));
      } 
      else {
        alert(res.data ? `${res.data.code} ${res.data.message}` : '읍/면/동 조회에 실패했습니다.');
        setDongs([]);
      }
    })
    .catch((err) => {
      console.error('읍/면/동 조회 중 오류 발생:', err);
      setDongs([]);
    });
  };

  /* 읍/면/동 추가 */
  const handleSubmitDong = () => {
    if( !findBySigunguNo) {
      alert('시/군/구를 선택해주세요.');
      return;
    }
    if( !newDongName || newDongName.trim() === '') {
      alert('읍/면/동 이름을 입력해주세요.');
      return;
    }
    if(dongs.some(dong => dong.sigunguNo === findBySigunguNo && dong.dongName === newDongName.trim())) {
      alert('해당 시/군/구에 이미 존재하는 읍/면/동 이름입니다.');
      return;
    }
    const dto = {
      sigunguNo: findBySigunguNo,
      dongName: newDongName.trim(),
    };

    axios
      .post(`${apiUrl}/api/systm/dong`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200) {
          alert('읍/면/동 등록에 성공했습니다.');
          setNewDongName('');
          fetchDong(); 
        } 
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '읍/면/동 등록에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.error('읍/면/동 등록 중 오류 발생:', err);
        alert('읍/면/동 등록 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  /* 읍/면/동 수정 시작 */
  const handleEditDong = (dong) => {
    setEditingDong(dong.dongNo);
    setEditedDongName(dong.dongName);
  };

  /* 읍/면/동 수정 저장 */
  const handleSaveEditedDong = (dongNo) => {
    if( !editedDongName || editedDongName.trim() === '') {
      alert('수정할 읍/면/동 이름을 입력해주세요.');
      return;
    }
    const currentDong = dongs.find(d => d.dongNo === dongNo);
    if(dongs.some(dong => dong.sigunguNo === currentDong.sigunguNo && dong.dongName === editedDongName.trim() && dong.dongNo !== dongNo)) {
      alert('해당 시/군/구에 이미 존재하는 읍/면/동 이름입니다.');
      return;
    }
    const dto = {
      dongName: editedDongName.trim(),
    };

    axios
      .put(`${apiUrl}/api/systm/dong/${dongNo}`, dto, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200) {
          alert('읍/면/동 수정에 성공했습니다.');
          setEditingDong(null);
          setEditedDongName('');
          fetchDong(); 
        } 
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '읍/면/동 수정에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.error('읍/면/동 수정 중 오류 발생:', err);
        alert('읍/면/동 수정 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  /* 읍/면/동 수정 취소 */
  const handleCancelEditDong = () => {
    setEditingDong(null);
    setEditedDongName('');
  };

  /* 읍/면/동 삭제 */
  const handleDeleteDong = (dongNo) => {
    if( !window.confirm('정말로 이 읍/면/동을 삭제하시겠습니까?')) { return; }

    axios
      .delete(`${apiUrl}/api/systm/dong/${dongNo}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}`, },
      })
      .then((res) => {
        if(res.status === 200) {
          alert('읍/면/동 삭제에 성공했습니다.');
          fetchDong();
        } 
        else {
          alert(res.data ? `${res.data.code} ${res.data.message}` : '읍/면/동 삭제에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch((err) => {
        console.error('읍/면/동 삭제 중 오류 발생:', err);
        alert('읍/면/동 삭제 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      });
  };

  /* 필터링된 시군구 목록 */
  const filteredSigungus = findBySidoNo ? sigungus.filter(sigungu => sigungu.sidoNo === findBySidoNo) : sigungus;
  /* 필터링된 읍/면/동 목록 */
  const filteredDongs = findBySigunguNo ? dongs.filter(dong => dong.sigunguNo === findBySigunguNo) : dongs;

  return (
    <PageContainer>
      <Title>주소 관리</Title>
      <HorizontalRule />
      <Section>
        <SectionTitle>시/도 관리</SectionTitle>
        <InputGroup>
          <Input
            type="text"
            placeholder="새 시/도 이름"
            value={newSidoName}
            onChange={(e) => setNewSidoName(e.target.value)}
          />
          <Button onClick={handleSubmitSido}>시/도 추가</Button>
        </InputGroup>

        <ListTitle>시/도 목록</ListTitle>
        <ItemList>
          {sidos.length > 0 ? (
            sidos.map((sido) => (
              <ListItem key={sido.sidoNo}>
                {editingSido === sido.sidoNo ? (
                  <>
                    <EditInput
                      type="text"
                      value={editedSidoName}
                      onChange={(e) => setEditedSidoName(e.target.value)}
                    />
                    <SaveButton onClick={() => handleSaveEditedSido(sido.sidoNo)}>저장</SaveButton>
                    <CancelButton onClick={handleCancelEditSido}>취소</CancelButton>
                  </>
                ) : (
                  <>
                    <ItemName>{sido.sidoName} (No: {sido.sidoNo})</ItemName>
                    <EditButton onClick={() => handleEditSido(sido)}>수정</EditButton>
                    <DeleteButton onClick={() => handleDeleteSido(sido.sidoNo)}>삭제</DeleteButton>
                  </>
                )}
              </ListItem>
            ))
          ) : (
            <NoDataMessage>등록된 시/도가 없습니다.</NoDataMessage>
          )}
        </ItemList>
      </Section>

      <HorizontalRule />
      <Section>
        <SectionTitle>시/군/구 관리</SectionTitle>
        <InputGroup>
          <label htmlFor="select-sido-for-sigungu">시/도 선택:</label>
          <Select
            id="select-sido-for-sigungu"
            value={findBySidoNo}
            onChange={(e) => setFindBySidoNo(e.target.value)}
          >
            <option value="">시/도를 선택하세요</option>
            {sidos.map((sido) => (
              <option 
                key={sido.sidoNo} 
                value={sido.sidoNo}
              >{sido.sidoName}
              </option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup>
          <Input
            type="text"
            placeholder="새 시/군/구 이름"
            value={newSigunguName}
            onChange={(e) => setNewSigunguName(e.target.value)}
          />
          <Button onClick={handleSubmitSigungu}>시/군/구 추가</Button>
        </InputGroup>

        <ListTitle>시/군/구 목록 (선택된 시/도: {sidos.find(s => s.sidoNo === findBySidoNo)?.sidoName || '없음'})</ListTitle>
        <ItemList>
          {filteredSigungus.length > 0 ? (
            filteredSigungus.map((sigungu) => (
              <ListItem key={sigungu.sigunguNo}>
                {editingSigungu === sigungu.sigunguNo ? (
                  <>
                    <EditInput
                      type="text"
                      value={editedSigunguName}
                      onChange={(e) => setEditedSigunguName(e.target.value)}
                    />
                    <SaveButton onClick={() => handleSaveEditedSigungu(sigungu.sigunguNo)}>저장</SaveButton>
                    <CancelButton onClick={handleCancelEditSigungu}>취소</CancelButton>
                  </>
                ) : (
                  <>
                    <ItemName>{sigungu.sigunguName} (No: {sigungu.sigunguNo})</ItemName>
                    <EditButton onClick={() => handleEditSigungu(sigungu)}>수정</EditButton>
                    <DeleteButton onClick={() => handleDeleteSigungu(sigungu.sigunguNo)}>삭제</DeleteButton>
                  </>
                )}
              </ListItem>
            ))
          ) : (
            <NoDataMessage>선택된 시/도에 대한 시/군/구가 없습니다.</NoDataMessage>
          )}
        </ItemList>
      </Section>

      <HorizontalRule />

      {/* Dong Section */}
      <Section>
        <SectionTitle>읍/면/동 관리</SectionTitle>
        <InputGroup>
          <label htmlFor="select-sigungu-for-dong">시/군/구 선택:</label>
          <Select
            id="select-sigungu-for-dong"
            value={findBySigunguNo}
            onChange={(e) => setFindBySigunguNo(e.target.value)}
          >
            <option value="">시/군/구를 선택하세요</option>
            {filteredSigungus.map((sigungu) => (
              <option 
                key={sigungu.sigunguNo} 
                value={sigungu.sigunguNo}
                >{sigungu.sigunguName} ({sidos.find(s => s.sidoNo === sigungu.sidoNo)?.sidoName})
              </option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup>
          <Input
            type="text"
            placeholder="새 읍/면/동 이름"
            value={newDongName}
            onChange={(e) => setNewDongName(e.target.value)}
          />
          <Button onClick={handleSubmitDong}>읍/면/동 추가</Button>
        </InputGroup>

        <ListTitle>읍/면/동 목록 (선택된 시/군/구: {sigungus.find(s => s.sigunguNo === findBySigunguNo)?.sigunguName || '없음'})</ListTitle>
        <ItemList>
          {filteredDongs.length > 0 ? (
            filteredDongs.map((dong) => (
              <ListItem key={dong.dongNo}>
                {editingDong === dong.dongNo ? (
                  <>
                    <EditInput
                      type="text"
                      value={editedDongName}
                      onChange={(e) => setEditedDongName(e.target.value)}
                    />
                    <SaveButton onClick={() => handleSaveEditedDong(dong.dongNo)}>저장</SaveButton>
                    <CancelButton onClick={handleCancelEditDong}>취소</CancelButton>
                  </>
                ) : (
                  <>
                    <ItemName>{dong.dongName} (No: {dong.dongNo})</ItemName>
                    <EditButton onClick={() => handleEditDong(dong)}>수정</EditButton>
                    <DeleteButton onClick={() => handleDeleteDong(dong.dongNo)}>삭제</DeleteButton>
                  </>
                )}
              </ListItem>
            ))
          ) : (
            <NoDataMessage>선택된 시/군/구에 대한 읍/면/동이 없습니다.</NoDataMessage>
          )}
        </ItemList>
      </Section>
    </PageContainer>
  );
};

export default Address;
