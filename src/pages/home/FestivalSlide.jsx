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

const FestivalSlide = ({ data }) => {
  return (
    <SlideWrapper>
      <SectionHeader>
        <MainTitle>축제</MainTitle>
        <VerticalBar />
        <SubText>페스티벌에 참여해보세요.</SubText>
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

export default FestivalSlide;
