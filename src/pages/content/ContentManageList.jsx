import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  ActionButton,
} from "./Content.styls";

function ContentManageList() {
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();
  const CATEGORY_MAP = {
    1: "숙소",
    2: "맛집",
    3: "관광지",
    4: "축제",
  };

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          "http://localhost:12345/api/content/simple-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContents(res.data);
      } catch (error) {
        console.error("콘텐츠 불러오기 실패", error);
      }
    };

    fetchContents();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:12345/api/content/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContents(contents.filter((item) => item.id !== id));
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 중 오류가 발생했습니다");
    }
  };

  const handleEdit = (item) => {
    navigate(`/admin/content/update/${item.contentId}`);
  };

  return (
    <Wrapper>
      <h2>콘텐츠 관리</h2>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>제목</Th>
              <Th>카테고리</Th>
              <Th>수정</Th>
              <Th>삭제</Th>
            </Tr>
          </Thead>
          <tbody>
            {contents.map((item, idx) => (
              <Tr key={item.id}>
                <Td>{idx + 1}</Td>
                <Td>{item.title}</Td>
                <Td>{CATEGORY_MAP[item.categoryCode] || "-"}</Td>
                <Td>
                  <ActionButton onClick={() => handleEdit(item)}>
                    수정
                  </ActionButton>
                </Td>
                <Td>
                  <ActionButton delete onClick={() => handleDelete(item.id)}>
                    삭제
                  </ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
}

export default ContentManageList;
