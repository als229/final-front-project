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
} from "./CommonCard.styls";

const TravelRecoSlide = ({ data }) => {
  return (
    <SlideWrapper>
      <RecoHeader>
        <h2>여행콕콕</h2>
      </RecoHeader>

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
