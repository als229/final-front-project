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
  CardBottom,
  Address,
  SectionHeader,
  MainTitle,
  VerticalBar,
  SubText,
} from "./CommonCard.styls";

const Hotel = ({ data }) => {
  return (
    <SlideWrapper>
      <SectionHeader>
        <MainTitle>숙소</MainTitle>
        <VerticalBar />
        <SubText>인기 숙소를 소개해드립니다.</SubText>
      </SectionHeader>

      <CardList>
        {data.map((item) => (
          <Card key={item.contentId}>
            <ImageWrapper>
              <CardImage src={item.firstImage} alt={item.title} />
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

export default Hotel;
