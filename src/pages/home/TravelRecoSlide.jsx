import React from "react";
import {
  SlideWrapper,
  RecoHeader,
  CardList,
  Card,
  ImageWrapper,
  CardImage,
  HeartIcon,
  Title,
  Location,
  Address,
  CardBottom,
  SectionHeader,
  MainTitle,
  SubText,
  VerticalBar,
} from "./CommonCard.styls";

const TravelRecoSlide = ({ data }) => {
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
              <CardImage src={item.firstImage} />
              <HeartIcon></HeartIcon>
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
