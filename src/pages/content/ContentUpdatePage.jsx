import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ContentAdd from "./ContentAdd";
import { AuthContext } from "../../pages/context/AuthContext";

// 세부 정보 컴포넌트들
import EventDetail from "../../components/addContent/EventDetail";
import FoodDetail from "../../components/addContent/FoodDetail";
import LodgingDetail from "../../components/addContent/LodgingDetail";
import TourDetail from "../../components/addContent/TourDetail";

const ContentUpdatePage = () => {
  const navigate = useNavigate();
  const { contentId } = useParams();
  const { auth } = useContext(AuthContext);
  const apiUrl = window.ENV?.API_URL;

  // 기본 정보 상태
  const [categoryCode, setCategoryCode] = useState("");
  const [title, setTitle] = useState("");
  const [tel, setTel] = useState("");
  const [homepage, setHomepage] = useState("");
  const [playTime, setPlayTime] = useState("");

  // 로딩 및 에러 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 이미지 파일 리스트 (새로 업로드할 이미지)
  const [files, setFiles] = useState([]);

  // 기존 이미지 URL 리스트
  const [originalImages, setOriginalImages] = useState([]);

  // 상세폼 데이터
  const [detailData, setDetailData] = useState({});

  // 주소 상태
  const [sidoName, setSidoName] = useState("");
  const [sigunguName, setSigunguName] = useState("");
  const [dongName, setDongName] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [detailName, setDetailName] = useState("");

  // 첫 번째 이미지 미리보기 URL
  const [firstPreview, setFirstPreview] = useState(null);

  // 콘텐츠 데이터 불러오기
  useEffect(() => {
    if (!contentId || !auth.accessToken) return;

    setLoading(true);

    axios
      .get(`${apiUrl}/api/main-contents/${contentId}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        params: { contentId },
      })
      .then((response) => {
        if (response.status === 200 && response.data?.items) {
          const content = response.data.items;
          console.log("불러온 콘텐츠 데이터:", content);

          // 기본 정보 설정
          setCategoryCode(content.categoryCode?.toString() || "");
          setTitle(content.title || "");
          setTel(content.tel || "");
          setHomepage(content.homepage || "");
          setPlayTime(content.playTime || "");

          // 주소 정보 설정
          setSidoName(content.sidoName || "");
          setSigunguName(content.sigunguName || "");
          setDongName(content.dongName || "");
          setPostAddress(content.postAddress?.trim() || "");
          setDetailName(content.detailName || "");

          // 카테고리별 상세 정보
          if (content.detailDto) {
            setDetailData(content.detailDto);
          }

          // 이미지 URL 저장
          const images = [];
          if (content.firstImage) {
            images.push({ url: content.firstImage, isThumbnail: true });
          }

          if (content.fileUrl && Array.isArray(content.fileUrl)) {
            content.fileUrl.forEach((url) => {
              images.push({ url, isThumbnail: false });
            });
          }

          setOriginalImages(images);
        } else {
          setError("콘텐츠 정보를 불러오는데 실패했습니다.");
        }
      })
      .catch((err) => {
        console.error("콘텐츠 조회 중 오류 발생:", err);
        setError("콘텐츠 정보를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl, auth.accessToken, contentId]);

  // 새로운 이미지 미리보기 처리
  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setFirstPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [files]);

  // 카테고리별 디테일 렌더
  const renderDetail = () => {
    const props = { data: detailData, onChange: setDetailData };
    switch (categoryCode) {
      case "4":
        return <EventDetail {...props} />;
      case "2":
        return <FoodDetail {...props} />;
      case "3":
        return <LodgingDetail {...props} />;
      case "1":
        return <TourDetail {...props} />;
      default:
        return null;
    }
  };

  // 이미지 파일 핸들러
  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => {
      // 기존 이미지 + 새 이미지 총 개수 제한
      const totalCount = prev.length + selected.length;
      if (totalCount > 5) {
        alert("최대 5장까지만 가능합니다.");
        return prev;
      }
      return [...prev, ...selected];
    });
    e.target.value = null;
  };

  const handleRemoveFile = (idx) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  // Daum 우편번호 팝업
  const handleAddressSearch = (e) => {
    e.preventDefault();
    new window.daum.Postcode({
      oncomplete: (data) => {
        setSidoName(data.sido);
        setSigunguName(data.sigungu);
        setDongName(data.bname);
        setPostAddress(data.zonecode);
        setDetailName("");
      },
    }).open();
  };

  // 폼 제출 핸들러 (수정)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryCode) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }

    try {
      // 1) 공통 DTO + 파일들 업데이트
      const fd1 = new FormData();
      fd1.append("categoryCode", categoryCode);
      fd1.append("title", title);
      fd1.append("tel", tel);
      fd1.append("homepage", homepage);
      fd1.append("playTime", playTime);

      // 새 파일 추가
      files.forEach((file) => fd1.append("file", file));

      // 기존 이미지 정보도 추가 (백엔드에서 이 정보를 처리할 수 있어야 함)
      fd1.append("originalImages", JSON.stringify(originalImages));

      const res1 = await axios.put(
        `${apiUrl}/api/main-contents/${contentId}`,
        fd1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      // 2) 주소 필드 업데이트
      const fd2 = new FormData();
      fd2.append("sidoName", sidoName);
      fd2.append("sigunguName", sigunguName);
      fd2.append("dongName", dongName);
      fd2.append("postAddress", postAddress);
      fd2.append("detailName", detailName);

      await axios.put(`${apiUrl}/api/main-contents/${contentId}/address`, fd2, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      // 3) 카테고리별 상세 데이터 업데이트
      const fd3 = new FormData();
      fd3.append("categoryCode", categoryCode);
      Object.entries(detailData).forEach(([key, value]) => {
        fd3.append(key, value !== null && value !== undefined ? value : "");
      });

      await axios.put(`${apiUrl}/api/main-contents/${contentId}/details`, fd3, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      alert("콘텐츠가 성공적으로 수정되었습니다.");
      navigate(`/admin/content/${contentId}`);
    } catch (error) {
      console.error("수정 실패:", error);
      alert(`콘텐츠 수정에 실패했습니다: ${error.message}`);
    }
  };

  if (loading) {
    return <div>콘텐츠 정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ContentAdd
      // 기본 정보
      category={categoryCode}
      onCategoryChange={setCategoryCode}
      title={title}
      onTitleChange={setTitle}
      phone={tel}
      onPhoneChange={setTel}
      website={homepage}
      onWebsiteChange={setHomepage}
      hours={playTime}
      onHoursChange={setPlayTime}
      // 이미지 관련
      images={files}
      onImagesChange={handleFiles}
      onRemoveImage={handleRemoveFile}
      originalImages={originalImages}
      // 주소 관련
      sidoName={sidoName}
      sigunguName={sigunguName}
      dongName={dongName}
      postCode={postAddress}
      detailAddress={detailName}
      onDetailAddressChange={setDetailName}
      onAddressSearch={handleAddressSearch}
      // 상세 정보
      renderDetail={renderDetail()}
      onSubmit={handleSubmit}
      // 수정 모드 표시
      isUpdateMode={true}
    />
  );
};

export default ContentUpdatePage;
