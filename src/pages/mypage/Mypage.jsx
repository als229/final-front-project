import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { nicknameRegex } from "../validation/Validation";
import { motion } from "framer-motion";
import {
  PageContainer,
  HeroSection,
  HeroOverlay,
  HeroContent,
  ProfileSection,
  ProfileCard,
  ProfileImageContainer,
  ProfileImage,
  ProfileInfo,
  UserName,
  UserEmail,
  UserRealName,
  ProfileActions,
  ActionButton,
  ContentSection,
  SectionHeader,
  SectionTitle,
  SectionIcon,
  CardGrid,
  TravelCard,
  CardImage,
  CardImagePlaceholder,
  CardContent,
  CardTitle,
  CardComment,
  CardDate,
  LoadMoreButton,
  AccountSection,
  AccountCard,
  AccountAction,
  ModalWrapper,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  StyledInput,
  FileInputButton,
  HiddenFileInput,
  ImagePreview,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  EmptyStateMessage,
  TravelIconSmall,
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

  // 기존 useEffect 및 이벤트 핸들러 함수들은 유지
  useEffect(() => {
    if (!loading && auth.isAuthenticated === false) {
      alert("로그인이 필요합니다");
      navi("/login");
    }
    return;
  }, [auth.isAuthenticated, loading]);

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
        setProfileModal(false);
        setIsUpdate((prev) => !prev);
      })
      .catch((err) => {
        console.log("프로필 변경 실패 :", err);
      });
  };

  const handleDeleteProfile = (e) => {
    if (!auth.fileUrl || auth.fileUrl === defaultImageUrl) {
      alert("현재 등록된 사진이 없습니다.");
      return;
    }
    axios
      .delete(`${apiUrl}/api/users/delete-profile`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        alert("프로필 이미지가 삭제되었습니다.");
        setIsUpdate((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
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
            안녕하세요, {auth.nickName}님!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            당신의 여행 이야기를 들려주세요
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* 프로필 섹션 */}
      <ProfileSection>
        <ProfileCard>
          <ProfileImageContainer>
            <ProfileImage
              src={auth.fileUrl || defaultImageUrl}
              alt="프로필 이미지"
            />
            <ActionButton
              small
              onClick={() => {
                setFile("");
                setProfileModal(true);
              }}
            >
              <i className="fas fa-camera"></i>
            </ActionButton>
          </ProfileImageContainer>

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
            <UserEmail>
              <i className="fas fa-envelope"></i> {auth.email}
            </UserEmail>
            <UserRealName>
              <i className="fas fa-user"></i> {auth.realName}
            </UserRealName>
          </ProfileInfo>

          <ProfileActions>
            <ActionButton onClick={() => navi("/mypage/password")}>
              <i className="fas fa-lock"></i> 비밀번호 변경
            </ActionButton>
            <ActionButton onClick={handleDeleteProfile} warning>
              <i className="fas fa-user-times"></i> 프로필 사진 삭제
            </ActionButton>
          </ProfileActions>
        </ProfileCard>

        <AccountSection>
          <AccountCard>
            <h3>
              <i className="fas fa-cog"></i> 계정 관리
            </h3>
            <AccountAction onClick={() => navi("/mypage/delete")}>
              <i className="fas fa-user-slash"></i>
              <span>회원탈퇴</span>
            </AccountAction>
          </AccountCard>
        </AccountSection>
      </ProfileSection>

      {/* 즐겨찾기 섹션 */}
      <ContentSection>
        <SectionHeader>
          <SectionIcon className="fas fa-bookmark" />
          <SectionTitle>즐겨찾기한 여행지</SectionTitle>
        </SectionHeader>

        {favorite.length === 0 ? (
          <EmptyStateMessage>
            <i className="fas fa-search"></i>
            <p>아직 즐겨찾기한 여행지가 없습니다.</p>
            <p>관심있는 여행지를 찾아보세요!</p>
          </EmptyStateMessage>
        ) : (
          <>
            <CardGrid>
              {favorite.slice(0, moreFavorites).map((item, index) => (
                <TravelCard
                  key={index}
                  onClick={() => navi(`/${item.contentId}`)}
                  as={motion.div}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  {item.firstImage ? (
                    <CardImage src={item.firstImage} alt={item.title} />
                  ) : (
                    <CardImagePlaceholder>
                      <i className="fas fa-image"></i>
                    </CardImagePlaceholder>
                  )}
                  <CardContent>
                    <CardTitle>{item.title}</CardTitle>
                    <TravelIconSmall className="fas fa-map-marker-alt" />
                  </CardContent>
                </TravelCard>
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
        <SectionHeader>
          <SectionIcon className="fas fa-comment-dots" />
          <SectionTitle>나의 여행톡</SectionTitle>
        </SectionHeader>

        {comments.length === 0 ? (
          <EmptyStateMessage>
            <i className="fas fa-comments"></i>
            <p>아직 작성한 여행톡이 없습니다.</p>
            <p>여행지에 대한 의견을 공유해보세요!</p>
          </EmptyStateMessage>
        ) : (
          <>
            <CardGrid>
              {comments.slice(0, moreComments).map((item, index) => (
                <TravelCard
                  key={index}
                  onClick={() => navi(`/${item.contentId}`)}
                  as={motion.div}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  {item.firstImage ? (
                    <CardImage src={item.firstImage} alt={item.title} />
                  ) : (
                    <CardImagePlaceholder>
                      <i className="fas fa-image"></i>
                    </CardImagePlaceholder>
                  )}
                  <CardContent>
                    <CardTitle>{item.title}</CardTitle>
                    <CardComment>
                      <i className="fas fa-comment"></i> {item.content}
                    </CardComment>
                    <CardDate>
                      <i className="fas fa-calendar-alt"></i> {item.createTime}
                    </CardDate>
                  </CardContent>
                </TravelCard>
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
      {nickNameModal && (
        <ModalWrapper>
          <Modal
            as={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ModalHeader>
              <h3>
                <i className="fas fa-edit"></i> 닉네임 변경
              </h3>
              <button onClick={() => setNickNameModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </ModalHeader>
            <ModalBody>
              <StyledInput
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="새 닉네임 입력"
              />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <PrimaryButton onClick={handleSubmit}>
                  <i className="fas fa-check"></i> 변경하기
                </PrimaryButton>
                <SecondaryButton onClick={() => setNickNameModal(false)}>
                  <i className="fas fa-times"></i> 취소
                </SecondaryButton>
              </ButtonGroup>
            </ModalFooter>
          </Modal>
        </ModalWrapper>
      )}

      {/* 프로필 변경 모달 */}
      {profileModal && (
        <ModalWrapper>
          <Modal
            as={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ModalHeader>
              <h3>
                <i className="fas fa-user-circle"></i> 프로필 사진 변경
              </h3>
              <button onClick={() => setProfileModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </ModalHeader>
            <ModalBody>
              {previewImage && (
                <ImagePreview src={previewImage} alt="프로필 미리보기" />
              )}

              <FileInputButton>
                <i className="fas fa-camera"></i> 이미지 선택
                <HiddenFileInput
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </FileInputButton>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <PrimaryButton onClick={handleProfileSubmit}>
                  <i className="fas fa-save"></i> 저장하기
                </PrimaryButton>
                <SecondaryButton onClick={() => setProfileModal(false)}>
                  <i className="fas fa-times"></i> 취소
                </SecondaryButton>
              </ButtonGroup>
            </ModalFooter>
          </Modal>
        </ModalWrapper>
      )}
    </PageContainer>
  );
};

export default Mypage;
