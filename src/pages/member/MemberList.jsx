import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import Member from './Member';
import {
  MemberListContainer,
  Title,
  Message,
  MemberCount,
  MemberTable,
  TableHeader,
  TableRow,
  TableData,
  TableButton
} from './MemberList.styles';

const MemberList = () => {
  const apiUrl = window.ENV?.API_URL;
  const { auth } = useContext(AuthContext);

  const [memberList, setMemberList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null); 
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false); 

  const [statusFilter, setStatusFilter] = useState(''); // 상태 필터 (Y:활성, N:비활성, '':전체)

  const fetchMemberList = useCallback(() => {
    axios
      .get(`${apiUrl}/api/systm/member`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        params: {
          status: statusFilter 
        }
      })
      .then((res) => {
        if (res.status === 200 && res.data && Array.isArray(res.data.items)) {
          setMemberList(res.data.items);
        } 
        else { alert(res.data ? `${res.data.code} ${res.data.message}` : '회원 목록 조회에 실패했습니다.'); }
      })
      .catch((err) => {
        console.error('회원 목록 조회 중 오류 발생:', err);
        alert('회원 목록을 불러오는 중 오류가 발생했습니다.');
        setMemberList([]);
      });
  }, [auth.accessToken, apiUrl, statusFilter]);

  // 컴포넌트 마운트 시, 또는 필터 조건 변경 시 호출
  useEffect(() => {
    if(auth.accessToken) { fetchMemberList(); }
    else{ console.warn('Access token이 아직 없습니다. 회원 목록 조회를 기다립니다.'); }
  }, [auth.accessToken, statusFilter, fetchMemberList]);

  // 필터 입력 변경 핸들러
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };
  const handleApplyFilter = () => {
    fetchMemberList(); // 변경된 상태로 다시 목록 조회
  };

  // 회원 모달 열기/닫기
  const handleOpenMemberModal = (member) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };
  const handleCloseMemberModal = () => {
    setIsMemberModalOpen(false);
    setSelectedMember(null);
    fetchMemberList(); // 모달 닫은 후 목록 새로고침
  };

  return (
    <MemberListContainer> 
      <Title>회원 관리</Title>
      <div>
        <select 
          value={statusFilter} 
          onChange={handleStatusFilterChange}>
          <option value="">전체</option>
          <option value="Y">활성</option>
          <option value="N">비활성</option>
        </select>
        <button onClick={handleApplyFilter}>조회</button>
      </div>

      {memberList.length === 0 && auth.accessToken ? (
        <Message>등록된 회원이 없습니다.</Message>
      ) : (
        <>
          <MemberCount>총 {memberList.length}건의 회원이 있습니다.</MemberCount>
          <MemberTable>
            <thead>
              <tr>
                <TableHeader>회원 번호</TableHeader>
                <TableHeader>아이디</TableHeader>
                <TableHeader>닉네임</TableHeader>
                <TableHeader>이름</TableHeader>
                <TableHeader>가입일</TableHeader>
                <TableHeader>상태</TableHeader>
                <TableHeader>관리</TableHeader> 
              </tr>
            </thead>

            <tbody>
              {memberList.map((member) => (
                <TableRow key={member.userNo}>
                  <TableData>{member.userNo}</TableData>
                  <TableData>{member.userId}</TableData>
                  <TableData>{member.nickName}</TableData>
                  <TableData>{member.realName}</TableData>
                  <TableData>{member.createdTime}</TableData>
                  <TableData>{member.status}</TableData>
                  <TableData>
                    <TableButton onClick={() => handleOpenMemberModal(member)}>정보수정</TableButton>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </MemberTable>
        </>
      )}
      {isMemberModalOpen && selectedMember && (
        <Member
          member={selectedMember}
          isOpen={isMemberModalOpen} 
          onClose={handleCloseMemberModal}
          onUpdateSuccess={fetchMemberList}
        />
      )}
    </MemberListContainer>
  );
};

export default MemberList;
