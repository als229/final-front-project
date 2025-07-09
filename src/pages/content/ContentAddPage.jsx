import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentAdd from "./ContentAdd";
import EventDetail from "../../components/addContent/EventDetail";
import FoodDetail from "../../components/addContent/FoodDetail";
import LodgingDetail from "../../components/addContent/LodgingDetail";
import TourDetail from "../../components/addContent/TourDetail";
import { useNavigate } from "react-router-dom";

// public/index.html <head> 에 아래 한 줄 추가:
// <script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>

const ContentAddPage = () => {
  // 기본
  const [categoryCode, setCategoryCode] = useState("");
  const [title, setTitle] = useState("");
  const [tel, setTel] = useState("");
  const [homepage, setHomepage] = useState("");
  const [playTime, setPlayTime] = useState("");
  const navi = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;

  // 이미지 파일 리스트 (첫 번째가 썸네일 역할)
  const [files, setFiles] = useState([]);

  // 상세폼 데이터 (festival, food, lodging, tour)
  const [detailData, setDetailData] = useState({});

  // 주소 팝업 결과
  const [sidoName, setSidoName] = useState("");
  const [sigunguName, setSigunguName] = useState("");
  const [dongName, setDongName] = useState(""); // ← 여기에 추가
  const [postAddress, setPostAddress] = useState(""); // zonecode
  const [detailName, setDetailName] = useState(""); // 상세 주소

  // 첫 번째 이미지 미리보기 URL (ContentAdd 안에서 처리하므로 필요 없으면 삭제 가능)
  const [firstPreview, setFirstPreview] = useState(null);
  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setFirstPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setFirstPreview(null);
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
      if (prev.length + selected.length > 5) {
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
  const handleAddressSearch = () => {
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

  // 전체 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1) 공통 DTO + 파일들 전송
      const fd1 = new FormData();
      // — 공통 DTO
      fd1.append("categoryCode", categoryCode);
      fd1.append("title", title);
      fd1.append("tel", tel);
      fd1.append("homepage", homepage);
      fd1.append("playTime", playTime);
      // — 파일들
      files.forEach((file) => fd1.append("file", file));

      const res1 = await axios.post(`${ENV_URL}/api/main-contents`, fd1, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res1.data);
      const contentId = res1.data.items; // 서버 반환 ID

      // 2) 주소 필드 전송
      const fd2 = new FormData();
      fd2.append("sidoName", sidoName);
      fd2.append("sigunguName", sigunguName);
      fd2.append("dongName", dongName);
      fd2.append("postAddress", postAddress);
      fd2.append("detailName", detailName);

      await axios.post(
        `${ENV_URL}/api/main-contents/${contentId}/address`,
        fd2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 3) 카테고리별 상세 데이터 전송
      const fd3 = new FormData();
      fd3.append("categoryCode", categoryCode);
      Object.entries(detailData).forEach(([key, value]) => {
        fd3.append(key, value);
      });

      await axios.post(
        `${ENV_URL}/api/main-contents/${contentId}/details`,
        fd3,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("컨텐츠가 정상 등록되었습니다.");
      navi("/");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <ContentAdd
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
      images={files}
      onImagesChange={handleFiles}
      onRemoveImage={handleRemoveFile}
      sidoName={sidoName}
      sigunguName={sigunguName}
      dongName={dongName} // ← 넘겨주기
      postCode={postAddress}
      detailAddress={detailName}
      onDetailAddressChange={setDetailName}
      onAddressSearch={handleAddressSearch}
      renderDetail={renderDetail()}
      onSubmit={handleSubmit}
    />
  );
};

export default ContentAddPage;
