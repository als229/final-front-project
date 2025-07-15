import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContentAdd from "./ContentAdd";
import ImageManager from "./ImageManager";
import EventDetail from "../../components/addContent/EventDetail";
import FoodDetail from "../../components/addContent/FoodDetail";
import LodgingDetail from "../../components/addContent/LodgingDetail";
import TourDetail from "../../components/addContent/TourDetail";

const ContentAddPage = () => {
  // 기본 정보 상태
  const [categoryCode, setCategoryCode] = useState("");
  const [title, setTitle] = useState("");
  const [tel, setTel] = useState("");
  const [homepage, setHomepage] = useState("");
  const [playTime, setPlayTime] = useState("");
  const navi = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;

  // 통합된 이미지 관리 (ImageManager 사용)
  const [images, setImages] = useState([]);

  // 상세폼 데이터 (festival, food, lodging, tour)
  const [detailData, setDetailData] = useState({});

  // 주소 팝업 결과
  const [sidoName, setSidoName] = useState("");
  const [sigunguName, setSigunguName] = useState("");
  const [dongName, setDongName] = useState("");
  const [postAddress, setPostAddress] = useState(""); // zonecode
  const [detailName, setDetailName] = useState(""); // 상세 주소

  // 좌표 정보를 별도 상태로 관리
  const [mapX, setMapX] = useState("");
  const [mapY, setMapY] = useState("");

  // Kakao Maps API 로드 확인
  useEffect(() => {
    window.kakaoMapsLoaded = window.kakaoMapsLoaded || false;

    const loadKakaoMapsAPI = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakaoMapsLoaded = true;
        console.log("Kakao Maps API가 이미 로드되어 있습니다.");
        return;
      }

      console.log("Kakao Maps API 로드 시작...");
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c338bd3a36435339984df445d3229ab6&libraries=services";
      script.async = true;

      script.onload = () => {
        console.log("Kakao Maps API 스크립트 로드 완료");
        window.kakaoMapsLoaded = true;
      };

      document.head.appendChild(script);
    };

    loadKakaoMapsAPI();
  }, []);

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

  // 이미지 관리 핸들러 - ImageManager 용
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 최대 5개 이미지 제한
    if (images.length + files.length > 5) {
      alert("이미지는 최대 5개까지만 등록 가능합니다.");
      return;
    }

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      file,
      url: URL.createObjectURL(file),
      isThumbnail: images.length === 0, // 첫 번째 이미지는 자동으로 썸네일로 설정
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = null;
  };

  const handleRemoveImage = (id) => {
    const removedImage = images.find((img) => img.id === id);

    // URL.revokeObjectURL을 사용하여 메모리 누수 방지
    if (removedImage && removedImage.url.startsWith("blob:")) {
      URL.revokeObjectURL(removedImage.url);
    }

    // 이미지 배열에서 제거
    setImages((prev) => {
      const newImages = prev.filter((img) => img.id !== id);

      // 썸네일이 삭제된 경우 첫 번째 이미지를 썸네일로 설정
      if (removedImage && removedImage.isThumbnail && newImages.length > 0) {
        return newImages.map((img, idx) =>
          idx === 0 ? { ...img, isThumbnail: true } : img
        );
      }

      return newImages;
    });
  };

  const handleSetThumbnail = (id) => {
    console.log("썸네일로 설정:", id);
    setImages((prev) => {
      const updated = prev.map((img) => ({
        ...img,
        isThumbnail: img.id === id,
      }));
      console.log("업데이트된 이미지:", updated);
      return updated;
    });
  };

  // 시도별 기본 좌표 설정 (API 실패 시 대비)
  const setDefaultCoordinates = (sido) => {
    let defaultX = "126.9780"; // 서울 기본값
    let defaultY = "37.5665";

    // 시도별 대략적인 좌표 설정
    if (sido.includes("부산")) {
      defaultX = "129.0756";
      defaultY = "35.1795";
    } else if (sido.includes("인천")) {
      defaultX = "126.7052";
      defaultY = "37.4563";
    } else if (sido.includes("대구")) {
      defaultX = "128.6014";
      defaultY = "35.8714";
    } else if (sido.includes("광주")) {
      defaultX = "126.8526";
      defaultY = "35.1595";
    } else if (sido.includes("대전")) {
      defaultX = "127.3845";
      defaultY = "36.3504";
    } else if (sido.includes("울산")) {
      defaultX = "129.3114";
      defaultY = "35.5384";
    } else if (sido.includes("세종")) {
      defaultX = "127.2890";
      defaultY = "36.4800";
    } else if (sido.includes("경기")) {
      defaultX = "127.0276";
      defaultY = "37.2750";
    } else if (sido.includes("강원")) {
      defaultX = "127.7299";
      defaultY = "37.8228";
    } else if (sido.includes("충북")) {
      defaultX = "127.4912";
      defaultY = "36.6357";
    } else if (sido.includes("충남")) {
      defaultX = "126.8000";
      defaultY = "36.5184";
    } else if (sido.includes("전북")) {
      defaultX = "127.1436";
      defaultY = "35.7175";
    } else if (sido.includes("전남")) {
      defaultX = "126.9910";
      defaultY = "34.8160";
    } else if (sido.includes("경북")) {
      defaultX = "128.8889";
      defaultY = "36.4919";
    } else if (sido.includes("경남")) {
      defaultX = "128.2132";
      defaultY = "35.4606";
    } else if (sido.includes("제주")) {
      defaultX = "126.5312";
      defaultY = "33.4996";
    }

    setMapX(defaultX);
    setMapY(defaultY);

    // detailData에도 좌표 설정
    setDetailData((prev) => ({
      ...prev,
      mapX: defaultX,
      mapY: defaultY,
    }));

    console.log(`${sido}의 기본 좌표로 설정: x=${defaultX}, y=${defaultY}`);
  };

  // Daum 우편번호 팝업
  const handleAddressSearch = (e) => {
    e.preventDefault();

    new window.daum.Postcode({
      oncomplete: (data) => {
        const fullAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
        console.log("선택한 주소:", fullAddress);

        // 주소 정보 설정
        setSidoName(data.sido);
        setSigunguName(data.sigungu);
        setDongName(data.bname);
        setPostAddress(data.zonecode);
        setDetailName("");

        // 좌표 설정 함수
        const getCoordinates = () => {
          try {
            if (window.kakao && window.kakao.maps) {
              const geocoder = new window.kakao.maps.services.Geocoder();
              geocoder.addressSearch(fullAddress, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const coords = result[0];
                  console.log("좌표 변환 성공:", coords);

                  setMapX(coords.x);
                  setMapY(coords.y);

                  setDetailData((prev) => ({
                    ...prev,
                    mapX: coords.x,
                    mapY: coords.y,
                  }));
                } else {
                  console.log("좌표 변환 실패, 기본값 사용");
                  setDefaultCoordinates(data.sido);
                }
              });
            } else {
              console.log("Kakao Maps API 없음, 기본값 사용");
              setDefaultCoordinates(data.sido);
            }
          } catch (error) {
            console.error("좌표 변환 중 오류:", error);
            setDefaultCoordinates(data.sido);
          }
        };

        // 0.5초 후에 좌표 설정 시도 (API 로딩 대기)
        setTimeout(getCoordinates, 500);
      },
    }).open();
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!categoryCode) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (!title || title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    // 이미지 검사
    if (images.length === 0) {
      alert("최소 1개 이상의 이미지를 등록해주세요.");
      return;
    }

    // 썸네일 확인
    const thumbnail = images.find((img) => img.isThumbnail);
    if (!thumbnail) {
      alert("대표 이미지(썸네일)를 지정해주세요.");
      return;
    }

    // 좌표 확인
    if (!mapX || !mapY) {
      alert("주소 검색을 통해 좌표를 설정해주세요.");
      return;
    }

    // FormData 생성
    const formData = new FormData();

    // 썸네일 이미지 추가 (isThumbnail=true인 이미지)
    formData.append("thumbnail", thumbnail.file);

    // 추가 이미지들 (isThumbnail=false인 이미지들)
    const additionalImages = images.filter((img) => !img.isThumbnail);
    additionalImages.forEach((img) => {
      formData.append("files", img.file);
    });

    // ContentReqDTO 객체 생성
    const contentReqDTO = {
      // 기본 정보
      categoryCode: categoryCode,
      title: title,
      tel: tel,
      homepage: homepage,
      playTime: playTime,

      // 주소 정보
      sidoName: sidoName,
      sigunguName: sigunguName,
      dongName: dongName,
      postAddress: postAddress,
      detailName: detailName,

      // 좌표 정보 설정 (명시적으로 추가)
      mapX: mapX,
      mapY: mapY,

      // 카테고리별 상세 정보 (좌표 정보 제외)
      ...Object.keys(detailData)
        .filter((key) => key !== "mapX" && key !== "mapY")
        .reduce((obj, key) => {
          obj[key] = detailData[key];
          return obj;
        }, {}),
    };

    // 디버깅용 로그
    console.log("전송할 데이터:", contentReqDTO);
    console.log("좌표 정보:", { mapX, mapY });
    console.log("이미지 정보:", {
      썸네일: thumbnail.file.name,
      추가이미지: additionalImages.map((img) => img.file.name),
    });

    // JSON 데이터를 Blob으로 변환하여 FormData에 추가
    formData.append(
      "contentReqDTO",
      new Blob([JSON.stringify(contentReqDTO)], { type: "application/json" })
    );

    // API 호출
    axios
      .post(`${ENV_URL}/api/main-contents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("등록 성공:", response.data);
        alert("컨텐츠가 정상 등록되었습니다.");
        navi("/admin/adminContentList");
      })
      .catch((error) => {
        console.error("등록 실패:", error);

        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (typeof errorData === "string") {
            alert(`등록 오류: ${errorData}`);
          } else if (errorData.message) {
            alert(`등록 오류: ${errorData.message}`);
          } else {
            alert("등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
          }
        } else {
          alert("서버 연결에 문제가 발생했습니다.");
        }
      });
  };

  return (
    <div>
      {/* 이미지 관리자 컴포넌트 */}
      <ImageManager
        images={images} // 원본 배열 직접 전달
        onAddImages={handleAddImages}
        onRemoveImage={handleRemoveImage}
        onSetThumbnail={handleSetThumbnail}
      />

      {/* 컨텐츠 추가 폼 */}
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
        // 주소 관련
        sidoName={sidoName}
        sigunguName={sigunguName}
        dongName={dongName}
        postCode={postAddress}
        detailAddress={detailName}
        onDetailAddressChange={setDetailName}
        onAddressSearch={handleAddressSearch}
        // 좌표 정보가 포함된 detailData
        detailData={{ ...detailData, mapX, mapY }}
        // 상세 정보
        renderDetail={renderDetail()}
        onSubmit={handleSubmit}
        // 등록 모드 (수정이 아님)
        isUpdateMode={false}
        // 빈 이미지 관련 속성 (이미지 관리는 ImageManager로 이동)
        hideImageInputs={true}
      />
    </div>
  );
};

export default ContentAddPage;
