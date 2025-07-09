import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { nicknameRegex } from "../validation/Validation";

import {
  PageContainer,
  HeroSection,
  HeroOverlay,
  HeroContent,
  ProfileSection,
  ProfileGrid,
  ProfileCard,
  ProfileInfo,
  ProfileImage,
  UserName,
  UserDetail,
  ProfileActions,
  ActionButton,
  AccountActions,
  ContentSection,
  SectionTitle,
  EmptyState,
  CardGrid,
  ContentCard,
  CardMedia,
  CardBody,
  CardTitle,
  CardText,
  CardDate,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  Input,
  FileInput,
  FileLabel,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  LoadMoreButton,
  ImagePreview,
} from "./Mypage.styls";

const Mypage = () => {
  const navi = useNavigate();
  const defaultImageUrl =
    "https://final-nw-bucket.s3.ap-northeast-2.amazonaws.com/f62ed12c-abe9-439f-b822-e0e2c1441be9_KakaoTalk_20250630_205959345.jpg";
  const apiUrl = window.ENV?.API_URL;
  const { auth, updateProfile, loading } = useContext(AuthContext);

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
    if (!loading && auth.isAuthenticated === false) {
      alert("로그인이 필요합니다");
      navi("/login");
    }
  }, [auth.isAuthenticated, loading, navi]);

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
  }, [auth.accessToken, apiUrl]);

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
  }, [auth.accessToken, apiUrl]);

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
  }, [auth.accessToken, isUpdate, apiUrl, updateProfile]);

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
      .then(() => {
        alert("닉네임이 변경되었습니다");
        setNickNameModal(false);
        setIsUpdate((prev) => !prev);
      })
      .catch((err) => {
        const errorCode = err.response.data.code;
        const message = err.response.data.message;

        if (errorCode === "E400_DUPLICATION_NICKNAME") {
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

  const handleProfileSubmit = () => {
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
        setProfileModal(false);
        setIsUpdate((prev) => !prev);
      })
      .catch((err) => {
        console.log("프로필 변경 실패 :", err);
      });
  };

  const handleDeleteProfile = () => {
    if (!auth.fileUrl || auth.fileUrl === defaultImageUrl) {
      alert("현재 등록된 사진이 없습니다.");
      return;
    }

    if (window.confirm("프로필 이미지를 삭제하시겠습니까?")) {
      axios
        .delete(`${apiUrl}/api/users/delete-profile`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then(() => {
          alert("프로필 이미지가 삭제되었습니다.");
          setIsUpdate((prev) => !prev);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <PageContainer>
      {/* 히어로 섹션 */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {auth.nickName}님의 여행 공간
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            나만의 여행 이야기를 관리하세요
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* 프로필 섹션 */}
      <ProfileSection>
        <ProfileGrid>
          <ProfileCard>
            <ProfileImage
              src={auth.fileUrl || defaultImageUrl}
              alt="프로필 이미지"
            />

            <ProfileInfo>
              <UserName>
                {auth.nickName}
                <ActionButton
                  small
                  onClick={() => {
                    setNickName("");
                    setNickNameModal(true);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </ActionButton>
              </UserName>

              <UserDetail>
                <i className="fas fa-envelope"></i> {auth.email}
              </UserDetail>
              <UserDetail>
                <i className="fas fa-user"></i> {auth.realName}
              </UserDetail>
            </ProfileInfo>

            <ProfileActions>
              <ActionButton
                onClick={() => {
                  setFile("");
                  setProfileModal(true);
                }}
              >
                <i className="fas fa-camera"></i> 프로필 변경
              </ActionButton>

              <ActionButton onClick={handleDeleteProfile} danger>
                <i className="fas fa-user-times"></i> 프로필 삭제
              </ActionButton>
            </ProfileActions>
          </ProfileCard>

          <AccountActions>
            <ActionButton onClick={() => navi("/mypage/password")}>
              <i className="fas fa-lock"></i> 비밀번호 변경
            </ActionButton>

            <ActionButton onClick={() => navi("/mypage/delete")} danger>
              <i className="fas fa-user-slash"></i> 회원탈퇴
            </ActionButton>
          </AccountActions>
        </ProfileGrid>
      </ProfileSection>

      {/* 즐겨찾기 섹션 */}
      <ContentSection>
        <SectionTitle>
          <i className="fas fa-bookmark"></i> 즐겨찾기
        </SectionTitle>

        {favorite.length === 0 ? (
          <EmptyState>
            <i className="fas fa-heart-broken"></i>
            <p>즐겨찾기한 콘텐츠가 없습니다</p>
          </EmptyState>
        ) : (
          <>
            <CardGrid>
              {favorite.slice(0, moreFavorites).map((item, index) => (
                <ContentCard
                  key={index}
                  as={motion.div}
                  whileHover={{ y: -5 }}
                  onClick={() =>
                    navi(`/contentDetail`, {
                      state: {
                        id: item.contentId,
                        title: item.title,
                        image: item.firstImage,
                        location: item.location,
                      },
                    })
                  }
                >
                  <CardMedia>
                    {item.firstImage ? (
                      <img src={item.firstImage} alt={item.title} />
                    ) : (
                      <div className="no-image">
                        <i className="fas fa-image"></i>
                      </div>
                    )}
                  </CardMedia>

                  <CardBody>
                    <CardTitle>{item.title}</CardTitle>
                    <CardText>
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {item.location || "위치 정보 없음"}
                    </CardText>
                  </CardBody>
                </ContentCard>
              ))}
            </CardGrid>

            {favorite.length > moreFavorites && (
              <LoadMoreButton
                onClick={() => setMoreFavorites((prev) => prev + 4)}
              >
                <i className="fas fa-chevron-down"></i> 더 보기
              </LoadMoreButton>
            )}
          </>
        )}
      </ContentSection>

      {/* 여행톡 섹션 */}
      <ContentSection>
        <SectionTitle>
          <i className="fas fa-comments"></i> 여행톡
        </SectionTitle>

        {comments.length === 0 ? (
          <EmptyState>
            <i className="fas fa-comment-slash"></i>
            <p>작성한 댓글이 없습니다</p>
          </EmptyState>
        ) : (
          <>
            <CardGrid>
              {comments.slice(0, moreComments).map((item, index) => (
                <ContentCard
                  key={index}
                  as={motion.div}
                  whileHover={{ y: -5 }}
                  onClick={() =>
                    navi(`/contentDetail`, {
                      state: {
                        id: item.contentId,
                        title: item.title,
                        image: item.firstImage,
                        location: item.location,
                      },
                    })
                  }
                >
                  <CardMedia>
                    {item.firstImage ? (
                      <img src={item.firstImage} alt={item.title} />
                    ) : (
                      <div className="no-image">
                        <i className="fas fa-image"></i>
                      </div>
                    )}
                  </CardMedia>

                  <CardBody>
                    <CardTitle>{item.title}</CardTitle>
                    <CardText>
                      <i className="fas fa-comment"></i> {item.content}
                    </CardText>
                    <CardDate>
                      <i className="fas fa-calendar-alt"></i> {item.createTime}
                    </CardDate>
                  </CardBody>
                </ContentCard>
              ))}
            </CardGrid>

            {comments.length > moreComments && (
              <LoadMoreButton
                onClick={() => setMoreComments((prev) => prev + 4)}
              >
                <i className="fas fa-chevron-down"></i> 더 보기
              </LoadMoreButton>
            )}
          </>
        )}
      </ContentSection>

      {/* 닉네임 변경 모달 */}
      <AnimatePresence>
        {nickNameModal && (
          <Modal>
            <ModalOverlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <ModalContent
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <ModalHeader>
                <h3>
                  <i className="fas fa-edit"></i> 닉네임 변경
                </h3>
                <CloseButton onClick={() => setNickNameModal(false)}>
                  <i className="fas fa-times"></i>
                </CloseButton>
              </ModalHeader>

              <ModalBody>
                <Input
                  type="text"
                  placeholder="새 닉네임 입력"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <ButtonGroup>
                  <PrimaryButton onClick={handleSubmit}>변경하기</PrimaryButton>
                  <SecondaryButton onClick={() => setNickNameModal(false)}>
                    취소
                  </SecondaryButton>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      {/* 프로필 변경 모달 */}
      <AnimatePresence>
        {profileModal && (
          <Modal>
            <ModalOverlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <ModalContent
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <ModalHeader>
                <h3>
                  <i className="fas fa-camera"></i> 프로필 이미지 변경
                </h3>
                <CloseButton onClick={() => setProfileModal(false)}>
                  <i className="fas fa-times"></i>
                </CloseButton>
              </ModalHeader>

              <ModalBody>
                {previewImage && (
                  <ImagePreview src={previewImage} alt="프로필 미리보기" />
                )}

                <FileLabel htmlFor="profile-image">
                  <i className="fas fa-upload"></i> 이미지 선택
                </FileLabel>
                <FileInput
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </ModalBody>

              <ModalFooter>
                <ButtonGroup>
                  <PrimaryButton onClick={handleProfileSubmit}>
                    저장하기
                  </PrimaryButton>
                  <SecondaryButton onClick={() => setProfileModal(false)}>
                    취소
                  </SecondaryButton>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Mypage;
