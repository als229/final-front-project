import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  DetailContainer,
  HeaderSection,
  BackButton,
  HeaderTitle,
  ActionButtons,
  EditButton,
  ContentStatusBar,
  ContentId,
  StatusGroup,
  StatusLabel,
  StatusBadge,
  StatusActions,
  StatusButton,
  ContentSection,
  ContentImageSection,
  MainImage,
  NoImagePlaceholder,
  ContentInfoSection,
  ContentInfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  DescriptionSection,
  SectionTitle,
  DescriptionText,
  LoadingMessage,
  ErrorMessage,
  CategoryDetailSection,
  CategoryDetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  ImagesContainer,
  AdditionalImage,
  TabsContainer,
  TabButton,
} from "./AdminContentDetail.styles";

const AdminContentDetail = () => {
  const { contentId } = useParams();
  const apiUrl = window.ENV?.API_URL;
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("info"); // 'info', 'details', 'images'

  // 카테고리 매핑
  const categoryMapping = {
    1: "관광지",
    2: "숙소",
    3: "맛집",
    4: "행사",
  };

  // 상태 매핑
  const statusMapping = {
    Y: { text: "게시", color: "#059669" },
    N: { text: "비활성", color: "#dc2626" },
  };

  // 콘텐츠 상세 정보 불러오기
  useEffect(() => {
    if (!contentId || !auth.accessToken) return;

    setLoading(true);
    setError(null);

    axios
      .get(`${apiUrl}/api/main-contents/${contentId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        params: { contentId },
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          console.log(response.data.items);
          setContent(response.data.items);
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

  // 콘텐츠 상태 변경
  const handleStatusChange = (status) => {
    axios
      .put(
        `${apiUrl}/api/admin/content/status`,
        {
          contentId,
          status,
        },
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("콘텐츠 상태가 변경되었습니다.");
          // 현재 페이지 새로고침
          axios
            .get(`${apiUrl}/api/main-contents/${contentId}`, {
              headers: { Authorization: `Bearer ${auth.accessToken}` },
              params: { contentId },
            })
            .then((res) => {
              if (res.status === 200 && res.data) {
                setContent(res.data.items);
              }
            });
        } else {
          alert("콘텐츠 상태 변경에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.error("콘텐츠 상태 변경 중 오류 발생:", err);
        alert("상태 변경 중 오류가 발생했습니다.");
      });
  };

  // 카테고리별 상세 정보 렌더링
  const renderCategoryDetails = () => {
    if (!content) return null;

    // detailDto가 null인 경우 안내 메시지 표시
    if (!content.detailDto) {
      return (
        <CategoryDetailGrid>
          <DetailItem $empty>
            <i className="fas fa-info-circle"></i>
            <p>
              {categoryMapping[content.categoryCode] || "이 콘텐츠"}의 상세
              정보가 등록되어 있지 않습니다.
            </p>
            <p>콘텐츠를 수정하여 상세 정보를 추가할 수 있습니다.</p>
          </DetailItem>
        </CategoryDetailGrid>
      );
    }

    const { categoryCode, detailDto } = content;

    switch (Number(categoryCode)) {
      case 1: // 관광지
        return (
          <CategoryDetailGrid>
            {detailDto.tourExp && (
              <DetailItem>
                <DetailLabel>관광지 설명</DetailLabel>
                <DetailValue>{detailDto.tourExp}</DetailValue>
              </DetailItem>
            )}
            {detailDto.usetimeTour && (
              <DetailItem>
                <DetailLabel>이용 시간</DetailLabel>
                <DetailValue>{detailDto.usetimeTour}</DetailValue>
              </DetailItem>
            )}
            {detailDto.parking && (
              <DetailItem>
                <DetailLabel>주차 정보</DetailLabel>
                <DetailValue>{detailDto.parking}</DetailValue>
              </DetailItem>
            )}
          </CategoryDetailGrid>
        );

      case 2: // 숙소
        return (
          <CategoryDetailGrid>
            {detailDto.lodgingExp && (
              <DetailItem>
                <DetailLabel>숙소 설명</DetailLabel>
                <DetailValue>{detailDto.lodgingExp}</DetailValue>
              </DetailItem>
            )}
            {(detailDto.checkIn || detailDto.checkOut) && (
              <DetailItem>
                <DetailLabel>체크인/체크아웃</DetailLabel>
                <DetailValue>
                  {detailDto.checkIn ? `체크인: ${detailDto.checkIn}` : ""}
                  {detailDto.checkIn && detailDto.checkOut ? " / " : ""}
                  {detailDto.checkOut ? `체크아웃: ${detailDto.checkOut}` : ""}
                </DetailValue>
              </DetailItem>
            )}
            {detailDto.elevator !== undefined && (
              <DetailItem>
                <DetailLabel>엘리베이터</DetailLabel>
                <DetailValue>
                  {detailDto.elevator ? "있음" : "없음"}
                </DetailValue>
              </DetailItem>
            )}
            {detailDto.parking && (
              <DetailItem>
                <DetailLabel>주차 정보</DetailLabel>
                <DetailValue>{detailDto.parking}</DetailValue>
              </DetailItem>
            )}
          </CategoryDetailGrid>
        );

      case 3: // 맛집
        return (
          <CategoryDetailGrid>
            {detailDto.foodExp && (
              <DetailItem>
                <DetailLabel>음식점 설명</DetailLabel>
                <DetailValue>{detailDto.foodExp}</DetailValue>
              </DetailItem>
            )}
            {detailDto.mainMenu && (
              <DetailItem>
                <DetailLabel>대표 메뉴</DetailLabel>
                <DetailValue>{detailDto.mainMenu}</DetailValue>
              </DetailItem>
            )}
            {detailDto.playTime && (
              <DetailItem>
                <DetailLabel>영업 시간</DetailLabel>
                <DetailValue>{detailDto.playTime}</DetailValue>
              </DetailItem>
            )}
            {detailDto.parking && (
              <DetailItem>
                <DetailLabel>주차 정보</DetailLabel>
                <DetailValue>{detailDto.parking}</DetailValue>
              </DetailItem>
            )}
          </CategoryDetailGrid>
        );

      case 4: // 행사
        return (
          <CategoryDetailGrid>
            {detailDto.eventExp && (
              <DetailItem>
                <DetailLabel>행사 설명</DetailLabel>
                <DetailValue>{detailDto.eventExp}</DetailValue>
              </DetailItem>
            )}
            {detailDto.program && (
              <DetailItem>
                <DetailLabel>프로그램</DetailLabel>
                <DetailValue>{detailDto.program}</DetailValue>
              </DetailItem>
            )}
            {detailDto.sponsor && (
              <DetailItem>
                <DetailLabel>주최/주관</DetailLabel>
                <DetailValue>{detailDto.sponsor}</DetailValue>
              </DetailItem>
            )}
            {(detailDto.eventStartDate || detailDto.eventEndDate) && (
              <DetailItem>
                <DetailLabel>행사 기간</DetailLabel>
                <DetailValue>
                  {detailDto.eventStartDate || "날짜 미정"}
                  {detailDto.eventEndDate ? ` ~ ${detailDto.eventEndDate}` : ""}
                </DetailValue>
              </DetailItem>
            )}
            {detailDto.useTimeFestival && (
              <DetailItem>
                <DetailLabel>이용 시간</DetailLabel>
                <DetailValue>{detailDto.useTimeFestival}</DetailValue>
              </DetailItem>
            )}
          </CategoryDetailGrid>
        );

      default:
        return <p>이 카테고리에 대한 상세 정보가 없습니다.</p>;
    }
  };

  // 추가 이미지 렌더링
  const renderAdditionalImages = () => {
    if (!content || !content.fileUrl || content.fileUrl.length === 0) {
      return <p>추가 이미지가 없습니다.</p>;
    }

    return (
      <ImagesContainer>
        {content.fileUrl.map((image, index) => (
          <AdditionalImage
            key={index}
            src={image}
            alt={`추가 이미지 ${index + 1}`}
          />
        ))}
      </ImagesContainer>
    );
  };

  if (loading) {
    return (
      <DetailContainer>
        <LoadingMessage>
          <i className="fas fa-spinner fa-spin"></i> 콘텐츠 정보를 불러오는
          중입니다...
        </LoadingMessage>
      </DetailContainer>
    );
  }

  if (error) {
    return (
      <DetailContainer>
        <ErrorMessage>
          <i className="fas fa-exclamation-circle"></i> {error}
        </ErrorMessage>
      </DetailContainer>
    );
  }

  if (!content) {
    return (
      <DetailContainer>
        <ErrorMessage>
          <i className="fas fa-exclamation-circle"></i> 콘텐츠 정보를 찾을 수
          없습니다.
        </ErrorMessage>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <HeaderSection>
        <HeaderTitle>콘텐츠 상세 정보</HeaderTitle>
        <ActionButtons>
          <EditButton
            onClick={() => navigate(`/admin/content/${contentId}/edit`)}
          >
            <i className="fas fa-edit"></i> 수정
          </EditButton>
        </ActionButtons>
      </HeaderSection>

      <ContentStatusBar>
        <ContentId>
          콘텐츠 ID: <span>{contentId}</span>
        </ContentId>
        <StatusGroup>
          <StatusLabel>현재 상태:</StatusLabel>
          <StatusBadge $color={statusMapping[content.status]?.color}>
            {statusMapping[content.status]?.text || "미정"}
          </StatusBadge>
        </StatusGroup>
        <StatusActions>
          {content.status !== "Y" && (
            <StatusButton $approve onClick={() => handleStatusChange("Y")}>
              <i className="fas fa-check"></i> 게시하기
            </StatusButton>
          )}
        </StatusActions>
      </ContentStatusBar>

      <TabsContainer>
        <TabButton
          $active={activeTab === "info"}
          onClick={() => setActiveTab("info")}
        >
          <i className="fas fa-info-circle"></i> 기본 정보
        </TabButton>
        <TabButton
          $active={activeTab === "details"}
          onClick={() => setActiveTab("details")}
        >
          <i className="fas fa-list-ul"></i> 카테고리별 상세
        </TabButton>
        <TabButton
          $active={activeTab === "images"}
          onClick={() => setActiveTab("images")}
        >
          <i className="fas fa-images"></i> 추가 이미지
        </TabButton>
      </TabsContainer>

      {activeTab === "info" && (
        <>
          <ContentSection>
            <ContentImageSection>
              {content.firstImage ? (
                <MainImage src={content.firstImage} alt={content.title} />
              ) : (
                <NoImagePlaceholder>
                  <i className="fas fa-image"></i>
                  <span>이미지 없음</span>
                </NoImagePlaceholder>
              )}
            </ContentImageSection>

            <ContentInfoSection>
              <ContentInfoGrid>
                <InfoItem>
                  <InfoLabel>제목</InfoLabel>
                  <InfoValue>{content.title}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>카테고리</InfoLabel>
                  <InfoValue>
                    {categoryMapping[content.categoryCode] || "미분류"}
                  </InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>연락처</InfoLabel>
                  <InfoValue>{content.tel || "없음"}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>주소</InfoLabel>
                  <InfoValue>
                    {content.sidoName && content.sigunguName
                      ? `${content.sidoName} ${content.sigunguName} ${
                          content.postAddress || ""
                        }`
                      : content.postAddress || "없음"}
                  </InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>홈페이지</InfoLabel>
                  <InfoValue>
                    {content.homepage ? (
                      <a
                        href={content.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {content.homepage}
                      </a>
                    ) : (
                      "없음"
                    )}
                  </InfoValue>
                </InfoItem>

                {content.createdTime && (
                  <InfoItem>
                    <InfoLabel>등록일</InfoLabel>
                    <InfoValue>{content.createdTime}</InfoValue>
                  </InfoItem>
                )}

                {content.modifiedTime && (
                  <InfoItem>
                    <InfoLabel>수정일</InfoLabel>
                    <InfoValue>{content.modifiedTime}</InfoValue>
                  </InfoItem>
                )}
              </ContentInfoGrid>
            </ContentInfoSection>
          </ContentSection>

          {content.overview && (
            <DescriptionSection>
              <SectionTitle>상세 설명</SectionTitle>
              <DescriptionText>{content.overview}</DescriptionText>
            </DescriptionSection>
          )}
        </>
      )}

      {activeTab === "details" && (
        <CategoryDetailSection>
          <SectionTitle>
            {categoryMapping[content.categoryCode] || "카테고리"} 상세 정보
          </SectionTitle>
          {renderCategoryDetails()}
        </CategoryDetailSection>
      )}

      {activeTab === "images" && (
        <CategoryDetailSection>
          <SectionTitle>추가 이미지</SectionTitle>
          {renderAdditionalImages()}
        </CategoryDetailSection>
      )}
    </DetailContainer>
  );
};

export default AdminContentDetail;
