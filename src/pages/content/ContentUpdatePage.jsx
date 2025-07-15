import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ContentAdd from "./ContentAdd";
import ImageManager from "./ImageManager";
import { AuthContext } from "../../pages/context/AuthContext";
import EventDetail from "../../components/addContent/EventDetail";
import FoodDetail from "../../components/addContent/FoodDetail";
import LodgingDetail from "../../components/addContent/LodgingDetail";
import TourDetail from "../../components/addContent/TourDetail";

const ContentUpdatePage = () => {
  const navigate = useNavigate();
  const { contentId } = useParams();
  const { auth } = useContext(AuthContext);
  const apiUrl = window.ENV?.API_URL;

  // 상태
  const [categoryCode, setCategoryCode] = useState("");
  const [title, setTitle] = useState("");
  const [tel, setTel] = useState("");
  const [homepage, setHomepage] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 이미지 관리
  const [images, setImages] = useState([]); // 새 이미지
  const [originalImages, setOriginalImages] = useState([]); // 기존 이미지
  const [deletedOriginalImages, setDeletedOriginalImages] = useState([]); // 삭제할 기존 이미지
  const [thumbnailInfo, setThumbnailInfo] = useState({}); // {type: 'original'|'new', id, url, file}

  // 상세폼 데이터
  const [detailData, setDetailData] = useState({});
  // 주소
  const [sidoName, setSidoName] = useState("");
  const [sigunguName, setSigunguName] = useState("");
  const [dongName, setDongName] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [detailName, setDetailName] = useState("");
  // 좌표
  const [mapX, setMapX] = useState("");
  const [mapY, setMapY] = useState("");

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

  // 데이터 불러오기
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
          console.log("items : ", content);
          setCategoryCode(content.categoryCode?.toString() || "");
          setTitle(content.title || "");
          setTel(content.tel || "");
          setHomepage(content.homepage || "");
          setPlayTime(content.playTime || "");
          setSidoName(content.sidoName || "");
          setSigunguName(content.sigunguName || "");
          setDongName(content.dongName || "");
          setPostAddress(content.postAddress?.trim() || "");
          setDetailName(content.detailName || "");
          setMapX(content.mapX || "");
          setMapY(content.mapY || "");
          if (content.detailDto) setDetailData(content.detailDto);

          // 기존 이미지 세팅
          const imageList = [];
          let thumbnailSet = false;
          if (content.firstImage) {
            imageList.push({
              id: "thumbnail",
              url: content.firstImage,
              isThumbnail: true,
              file: null,
            });
            setThumbnailInfo({
              type: "original",
              id: "thumbnail",
              url: content.firstImage,
              file: null,
            });
            thumbnailSet = true;
          }
          if (content.fileUrl && Array.isArray(content.fileUrl)) {
            content.fileUrl.forEach((url, idx) => {
              imageList.push({
                id: `origin-${idx}`,
                url: url,
                isThumbnail: false,
                file: null,
              });
            });
          }
          setOriginalImages(imageList);
          setImages([]);
          setDeletedOriginalImages([]);
        } else {
          setError("콘텐츠 정보를 불러오는데 실패했습니다.");
        }
      })
      .catch(() => setError("콘텐츠 정보를 불러오는 중 오류가 발생했습니다."))
      .finally(() => setLoading(false));
  }, [apiUrl, auth.accessToken, contentId]);

  // 이미지 추가
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (images.length + originalImages.length + files.length > 5) {
      alert("이미지는 최대 5개까지만 등록 가능합니다.");
      return;
    }
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      file,
      url: URL.createObjectURL(file),
      isThumbnail: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = null;
  };

  // 기존 이미지 삭제
  const handleRemoveOriginalImage = (id) => {
    const removed = originalImages.find((img) => img.id === id);
    if (!removed) return;
    setOriginalImages((prev) => prev.filter((img) => img.id !== id));
    setDeletedOriginalImages((prev) => [...prev, removed.url]);
    // 썸네일이 삭제된 경우 썸네일 정보도 초기화
    if (thumbnailInfo.type === "original" && thumbnailInfo.id === id) {
      setThumbnailInfo({});
    }
  };

  // 새 이미지 삭제
  const handleRemoveImage = (id) => {
    const removed = images.find((img) => img.id === id);
    if (removed && removed.url.startsWith("blob:")) {
      URL.revokeObjectURL(removed.url);
    }
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (thumbnailInfo.type === "new" && thumbnailInfo.id === id) {
      setThumbnailInfo({});
    }
  };

  // 썸네일 지정 (기존/새 이미지 모두 가능)
  const handleSetThumbnail = (id) => {
    // 기존 이미지
    const origin = originalImages.find((img) => img.id === id);
    if (origin) {
      setThumbnailInfo({ type: "original", id, url: origin.url, file: null });
      setOriginalImages((prev) =>
        prev.map((img) => ({ ...img, isThumbnail: img.id === id }))
      );
      setImages((prev) => prev.map((img) => ({ ...img, isThumbnail: false })));
      return;
    }
    // 새 이미지
    const newImg = images.find((img) => img.id === id);
    if (newImg) {
      setThumbnailInfo({ type: "new", id, url: newImg.url, file: newImg.file });
      setImages((prev) =>
        prev.map((img) => ({ ...img, isThumbnail: img.id === id }))
      );
      setOriginalImages((prev) =>
        prev.map((img) => ({ ...img, isThumbnail: false }))
      );
    }
  };

  // 주소 검색
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

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryCode) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    if (!title || title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!mapX || !mapY) {
      alert("주소 검색을 통해 좌표를 설정해주세요.");
      return;
    }
    // 썸네일 검사
    if (!thumbnailInfo.id) {
      alert("대표 이미지(썸네일)를 지정해주세요.");
      return;
    }

    const formData = new FormData();

    // 썸네일 처리
    if (thumbnailInfo.type === "new") {
      formData.append("thumbnail", thumbnailInfo.file);
    } else if (thumbnailInfo.type === "original") {
      formData.append("thumbnailUrl", thumbnailInfo.url);
    }

    // 추가 이미지(새로 등록한 것만)
    images
      .filter((img) => !img.isThumbnail)
      .forEach((img) => {
        formData.append("files", img.file);
      });

    // 삭제할 기존 이미지 목록
    deletedOriginalImages.forEach((url) => {
      formData.append("deletedImages", url);
    });

    // DTO
    const contentReqDTO = {
      categoryCode: parseInt(categoryCode),
      title,
      tel,
      homepage,
      playTime,
      sidoName,
      sigunguName,
      dongName,
      postAddress,
      detailName,
      mapX,
      mapY,
      ...detailData,
    };
    formData.append(
      "contentReqDTO",
      new Blob([JSON.stringify(contentReqDTO)], { type: "application/json" })
    );

    axios
      .put(`${apiUrl}/api/main-contents/${contentId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        alert("콘텐츠가 성공적으로 수정되었습니다.");
        navigate(`/admin/content/${contentId}`);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (typeof errorData === "string") {
            alert(`수정 오류: ${errorData}`);
          } else if (errorData.message) {
            alert(`수정 오류: ${errorData.message}`);
          } else {
            alert("수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
          }
        } else {
          alert("서버 연결에 문제가 발생했습니다.");
        }
      });
  };

  if (loading) return <div>콘텐츠 정보를 불러오는 중입니다...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ImageManager
        images={[...originalImages, ...images]}
        onAddImages={handleAddImages}
        onRemoveImage={handleRemoveImage}
        onRemoveOriginalImage={handleRemoveOriginalImage}
        onSetThumbnail={handleSetThumbnail}
      />
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
        sidoName={sidoName}
        sigunguName={sigunguName}
        dongName={dongName}
        postCode={postAddress}
        detailAddress={detailName}
        onDetailAddressChange={setDetailName}
        onAddressSearch={handleAddressSearch}
        detailData={{ ...detailData, mapX, mapY }}
        renderDetail={renderDetail()}
        onSubmit={handleSubmit}
        isUpdateMode={true}
        originalImages={originalImages}
        hideImageInputs={true}
      />
    </div>
  );
};

export default ContentUpdatePage;
