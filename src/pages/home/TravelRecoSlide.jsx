import React from "react";
import {
  SlideWrapper,
  CardList,
  Card,
  ImageWrapper,
  CardImage,
  Title,
  Location,
  Address,
  CardBottom,
  SectionHeader,
  MainTitle,
  SubText,
  VerticalBar,
  Badge,
} from "./CommonCard.styls";
import { useNavigate } from "react-router-dom";

const TravelRecoSlide = ({ data }) => {
  const navi = useNavigate();
  return (
    <SlideWrapper>
      <SectionHeader>
        <MainTitle>여행지</MainTitle>
        <VerticalBar />
        <SubText>인기여행지를 소개해드립니다.</SubText>
      </SectionHeader>

      <CardList>
        {data.map((item) => (
          <Card key={item.contentId}>
            <ImageWrapper>
              <Badge>추천</Badge>
              <CardImage
                src={item.firstImage}
                style={{ cursor: "pointer" }}
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
              />
            </ImageWrapper>
            <CardBottom>
              <Title>{item.title}</Title>
              <Location>
                {item.sidoName} {item.sigunguName}
              </Location>
              <Address>
                {item.detailName} {item.postAddrres}
              </Address>
            </CardBottom>
          </Card>
        ))}
      </CardList>
    </SlideWrapper>
  );
};

export default TravelRecoSlide;
