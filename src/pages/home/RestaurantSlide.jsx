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
} from "./CommonCard.styls";

const RestaurantSlide = ({ data }) => {
  return (
    <SlideWrapper>
      <RecoHeader>
        <h2>맛집 랭킹</h2>
      </RecoHeader>

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

export default RestaurantSlide;
