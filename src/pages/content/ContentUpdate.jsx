import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "src/styles/ContentForm.css";

function ContentUpdate() {
  const [categoryCode, setCategoryCode] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { contentId } = useParams();

  console.log("contentId:", contentId);
  const [contentForm, setContentForm] = useState({
    title: "",
    tel: "",
    homepage: "",
    playtime: "",
  });

  const [coordinateForm, setCoordinateForm] = useState({
    mapX: "",
    mapY: "",
  });

  const [lodgingForm, setLodgingForm] = useState({
    lodgingExp: "",
    checkIn: "",
    checkOut: "",
    parking: "",
    elevator: "",
  });

  const [festivalForm, setFestivalForm] = useState({
    program: "",
    eventExp: "",
    sponsor: "",
    usetimeFestival: "",
    eventStartDate: "",
    eventEndDate: "",
  });

  const [foodForm, setFoodForm] = useState({
    foodExp: "",
    mainMenu: "",
    menu: "",
    parking: "",
  });

  const [tourForm, setTourForm] = useState({
    tourExp: "",
    usetimeTour: "",
    parking: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios
      .get(`http://localhost:12345/api/content/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;

        setContentForm({
          title: data.title,
          tel: data.tel,
          homepage: data.homepage,
          playtime: data.playtime,
        });

        setCategoryCode(data.categoryCode);

        setCoordinateForm({
          mapX: data.coordinateDTO?.mapX,
          mapY: data.coordinateDTO?.mapY,
        });

        switch (data.categoryCode) {
          case 1:
            setLodgingForm(data.lodgingDTO);
            break;
          case 2:
            setFoodForm(data.foodDTO);
            break;
          case 3:
            setTourForm(data.tourDTO);
            break;
          case 4:
            setFestivalForm(data.festivalDTO);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.error("콘텐츠 불러오기 실패", err);
      });
  }, [contentId]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    const dto = {
      ...contentForm,
      categoryCode: Number(categoryCode),
      coordinateDTO: coordinateForm,
    };

    switch (Number(categoryCode)) {
      case 1:
        dto.lodgingDTO = lodgingForm;
        break;
      case 2:
        dto.foodDTO = foodForm;
        break;
      case 3:
        dto.tourDTO = tourForm;
        break;
      case 4:
        dto.festivalDTO = festivalForm;
        break;
      default:
        break;
    }

    const formData = new FormData();
    formData.append(
      "detailContentDTO",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    for (let pair of formData.entries()) {
      console.log("▶ FormData entry:", pair[0], pair[1]);
    }
    if (thumbnailFile) formData.append("firstImage", thumbnailFile);
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      await axios.put(
        `http://localhost:12345/api/content/${contentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("등록 성공");
    } catch (err) {
      console.error(err);
      alert("등록 실패");
    }
  };

  return (
    <div className="form-wrapper">
      <form className="content-form" onSubmit={handleSubmit}>
        <h2>콘텐츠 등록</h2>

        <div className="form-grid">
          <label>카테고리</label>
          <select
            value={categoryCode}
            onChange={(e) => setCategoryCode(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="1">숙소</option>
            <option value="2">맛집</option>
            <option value="3">관광지</option>
            <option value="4">축제</option>
          </select>

          <label>제목</label>
          <input
            type="text"
            value={contentForm.title}
            onChange={(e) =>
              setContentForm({ ...contentForm, title: e.target.value })
            }
          />

          <label>썸네일 사진</label>
          <div className="thumbnail-box">
            <div className="thumbnail-preview">
              {thumbnailPreview ? (
                <img src={thumbnailPreview} alt="미리보기" />
              ) : (
                <span>사진 미리보기</span>
              )}
            </div>
            <input type="file" onChange={handleThumbnailChange} />
          </div>

          <label>전화번호</label>
          <input
            type="text"
            value={contentForm.tel}
            onChange={(e) =>
              setContentForm({ ...contentForm, tel: e.target.value })
            }
          />

          <label>홈페이지</label>
          <input
            type="text"
            value={contentForm.homepage}
            onChange={(e) =>
              setContentForm({ ...contentForm, homepage: e.target.value })
            }
          />

          <label>운영 시간</label>
          <input
            type="text"
            value={contentForm.playtime}
            onChange={(e) =>
              setContentForm({ ...contentForm, playtime: e.target.value })
            }
          />

          <label>X좌표</label>
          <input
            type="text"
            value={coordinateForm.mapX}
            onChange={(e) =>
              setCoordinateForm({ ...coordinateForm, mapX: e.target.value })
            }
          />

          <label>Y좌표</label>
          <input
            type="text"
            value={coordinateForm.mapY}
            onChange={(e) =>
              setCoordinateForm({ ...coordinateForm, mapY: e.target.value })
            }
          />

          {Number(categoryCode) === 1 && (
            <>
              <label>체크인</label>
              <input
                type="text"
                value={lodgingForm.checkIn}
                onChange={(e) =>
                  setLodgingForm({ ...lodgingForm, checkIn: e.target.value })
                }
              />
              <label>체크아웃</label>
              <input
                type="text"
                value={lodgingForm.checkOut}
                onChange={(e) =>
                  setLodgingForm({ ...lodgingForm, checkOut: e.target.value })
                }
              />
              <label>주차</label>
              <input
                type="text"
                value={lodgingForm.parking}
                onChange={(e) =>
                  setLodgingForm({ ...lodgingForm, parking: e.target.value })
                }
              />
              <label>엘리베이터</label>
              <input
                type="text"
                value={lodgingForm.elevator}
                onChange={(e) =>
                  setLodgingForm({ ...lodgingForm, elevator: e.target.value })
                }
              />
            </>
          )}

          {Number(categoryCode) === 2 && (
            <>
              <label>대표 메뉴</label>
              <input
                type="text"
                value={foodForm.mainMenu}
                onChange={(e) =>
                  setFoodForm({ ...foodForm, mainMenu: e.target.value })
                }
              />
              <label>메뉴</label>
              <input
                type="text"
                value={foodForm.menu}
                onChange={(e) =>
                  setFoodForm({ ...foodForm, menu: e.target.value })
                }
              />
              <label>주차</label>
              <input
                type="text"
                value={foodForm.parking}
                onChange={(e) =>
                  setFoodForm({ ...foodForm, parking: e.target.value })
                }
              />
            </>
          )}

          {Number(categoryCode) === 3 && (
            <>
              <label>관광 설명</label>
              <input
                type="text"
                value={tourForm.tourExp}
                onChange={(e) =>
                  setTourForm({ ...tourForm, tourExp: e.target.value })
                }
              />
              <label>이용 시간</label>
              <input
                type="text"
                value={tourForm.usetimeTour}
                onChange={(e) =>
                  setTourForm({ ...tourForm, usetimeTour: e.target.value })
                }
              />
              <label>주차</label>
              <input
                type="text"
                value={tourForm.parking}
                onChange={(e) =>
                  setTourForm({ ...tourForm, parking: e.target.value })
                }
              />
            </>
          )}

          {Number(categoryCode) === 4 && (
            <>
              <label>행사 설명</label>
              <textarea
                value={festivalForm.eventExp ?? ""}
                onChange={(e) =>
                  setFestivalForm({ ...festivalForm, eventExp: e.target.value })
                }
              />
              <label>프로그램</label>
              <textarea
                value={festivalForm.program}
                onChange={(e) =>
                  setFestivalForm({ ...festivalForm, program: e.target.value })
                }
              />
              <label>스폰서</label>
              <input
                type="text"
                value={festivalForm.sponsor}
                onChange={(e) =>
                  setFestivalForm({ ...festivalForm, sponsor: e.target.value })
                }
              />
              <label>입장료</label>
              <input
                type="text"
                value={festivalForm.usetimeFestival}
                onChange={(e) =>
                  setFestivalForm({
                    ...festivalForm,
                    usetimeFestival: e.target.value,
                  })
                }
              />
              <label>시작일</label>
              <input
                type="date"
                value={festivalForm.eventStartDate}
                onChange={(e) =>
                  setFestivalForm({
                    ...festivalForm,
                    eventStartDate: e.target.value,
                  })
                }
              />
              <label>종료일</label>
              <input
                type="date"
                value={festivalForm.eventEndDate}
                onChange={(e) =>
                  setFestivalForm({
                    ...festivalForm,
                    eventEndDate: e.target.value,
                  })
                }
              />
            </>
          )}

          <label>추가 사진들</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="multi-preview-box">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`img-${idx}`}
                className="multi-thumbnail"
              />
            ))}
          </div>
        </div>

        <div className="submit-box">
          <button type="submit">수정하기</button>
        </div>
      </form>
    </div>
  );
}

export default ContentUpdate;
