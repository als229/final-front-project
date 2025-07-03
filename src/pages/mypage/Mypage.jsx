import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ProfileWrapper,
  LeftBox,
  RightBox,
  LeftContent,
  ModifyLeftWrapper,
  ModifyRightWrapper,
  RightContent,
  FavoriteWrapper,
  Box,
  FavoriteName,
  Item,
  Comment,
  Date,
  SectionTitle,
  ProfileImageWrapper,
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalContent,
  ButtonGroup,
  ConfirmButton,
  CancelButton,
  ProfileImagePreview,
  FileInputLabel,
  FileInput,
  Input,
  LoadMoreButton,
} from "./Mypage.styls";
import { AuthContext } from "../context/AuthContext";
import { nicknameRegex } from "../validation/Validation";
const Mypage = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const { auth, updateProfile } = useContext(AuthContext);

  const [nickNameModal, setNickNameModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [nickName, setNickName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [favorite, setFavorite] = useState([]);
  const [comments, setComments] = useState([]);

  const [moreFavorites, setMoreFavorites] = useState(4);
  const [moreComments, setMoreComments] = useState(4);

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get(`${apiUrl}/api/users/favorite`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((res) => {
          setFavorite(res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get(`${apiUrl}/api/users/comments`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((res) => {
          setComments(res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get(`${apiUrl}/api/users/select-profile`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((res) => {
          const { realName, nickName, email, fileUrl } = res.data.items;
          updateProfile({ realName, nickName, email, fileUrl });
        })
        .catch((err) => {
          console.log("사용자 정보 조회실패 : ", err);
        });
    }
  }, [auth.accessToken, isUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickName.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!nicknameRegex.test(nickName)) {
      alert("닉네임은 영문/숫자 2~30자 또는 한글 2~5자여야 합니다.");
      return;
    }
    axios
      .put(
        `${apiUrl}/api/users/update-nickname`,
        {
          nickName: nickName,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        alert("닉네임이 변경되었습니다");
        setNickNameModal(false);
        setIsUpdate((prev) => !prev);
      })
      .catch((err) => {
        const errorCode = err.response.data.code;
        const message = err.response.data.message;

        if (errorCode == "E400_DUPLICATION_NICKNAME") {
          alert(message);
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = (e) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .put(`${apiUrl}/api/users/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        const newUrl = res.data.items.fileUrl;
        setPreviewImage(newUrl);
        setFile(newUrl);
      })
      .catch((err) => {
        console.log("프로필 변경 실패 :", err);
      });
  };

  return (
    <>
      {nickNameModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>닉네임 변경</ModalTitle>
            <ModalContent>
              <Input
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              <ButtonGroup>
                <ConfirmButton onClick={handleSubmit}>변경</ConfirmButton>
                <CancelButton onClick={() => setNickNameModal(false)}>
                  취소
                </CancelButton>
              </ButtonGroup>
            </ModalContent>
          </ModalBox>
        </ModalOverlay>
      )}

      {profileModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>프로필 변경</ModalTitle>
            <ModalContent>
              {previewImage && (
                <ProfileImagePreview src={previewImage} alt="프로필 미리보기" />
              )}

              <FileInputLabel htmlFor="file">📷 이미지 선택</FileInputLabel>
              <FileInput id="file" type="file" onChange={handleFileChange} />

              <ButtonGroup>
                <ConfirmButton onClick={handleProfileSubmit}>
                  저장
                </ConfirmButton>
                <CancelButton onClick={() => setProfileModal(false)}>
                  취소
                </CancelButton>
              </ButtonGroup>
            </ModalContent>
          </ModalBox>
        </ModalOverlay>
      )}

      <Container>
        <div>
          <SectionTitle>마이페이지</SectionTitle>
        </div>
        <ProfileWrapper>
          <LeftBox>
            <LeftContent>
              <ProfileImageWrapper>
                {auth.fileUrl ? (
                  <img src={auth.fileUrl} />
                ) : (
                  <span>기본 이미지</span>
                )}
              </ProfileImageWrapper>
              <p>😎 {auth.nickName} </p>
              <ModifyLeftWrapper>
                <button
                  type="button"
                  onClick={() => {
                    setNickName("");
                    setNickNameModal(true);
                  }}
                >
                  닉네임 변경
                </button>
                <button
                  onClick={() => {
                    setFile("");
                    setProfileModal(true);
                  }}
                >
                  프로필 변경
                </button>
              </ModifyLeftWrapper>
            </LeftContent>
          </LeftBox>
          <RightBox>
            <RightContent>
              <button
                type="button"
                onClick={() => {
                  navi("/mypage/password");
                }}
              >
                비밀번호 변경
              </button>
              <button
                type="button"
                onClick={() => {
                  navi("/mypage/delete");
                }}
              >
                회원탈퇴
              </button>
            </RightContent>

            <ModifyRightWrapper>
              <p>📧 {auth.email}</p>
              <p>👤 {auth.realName}</p>
            </ModifyRightWrapper>
          </RightBox>
        </ProfileWrapper>
        <div>
          <SectionTitle>즐겨찾기</SectionTitle>

          <FavoriteWrapper>
            {favorite.length === 0 ? (
              <p>즐겨찾기가 없습니다</p>
            ) : (
              favorite.slice(0, moreFavorites).map((item, index) => (
                <Item key={index}>
                  <Box>
                    {item.firstImage ? (
                      <img
                        src={item.firstImage}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <p>이미지 없음</p>
                    )}
                  </Box>
                  <FavoriteName>{item.title}</FavoriteName>
                </Item>
              ))
            )}
          </FavoriteWrapper>
          <div style={{ textAlign: "center" }}>
            {favorite.length > moreFavorites && (
              <LoadMoreButton
                onClick={() => setMoreFavorites((prev) => prev + 4)}
              >
                👀 더보기
              </LoadMoreButton>
            )}
          </div>
        </div>

        <div>
          <SectionTitle>여행톡</SectionTitle>

          <FavoriteWrapper>
            {comments.length === 0 ? (
              <p>댓글이 없습니다.</p>
            ) : (
              comments.slice(0, moreComments).map((item, index) => (
                <Item key={index}>
                  <Box>
                    {item.firstImage ? (
                      <img
                        src={item.firstImage}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "사진 없음"
                    )}
                  </Box>
                  <FavoriteName>{item.title}</FavoriteName>
                  <Comment>댓글: {item.content}</Comment>
                  <Date>{item.createTime}</Date>
                </Item>
              ))
            )}
          </FavoriteWrapper>
          <div style={{ textAlign: "center" }}>
            {comments.length > moreComments && (
              <LoadMoreButton
                onClick={() => setMoreComments((prev) => prev + 4)}
              >
                👀 더보기
              </LoadMoreButton>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
export default Mypage;
