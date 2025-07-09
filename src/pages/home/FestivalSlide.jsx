import React from "react";
import {
  SlideWrapper,
  CardList,
  Card,
  ImageWrapper,
  CardImage,
  Title,
  Location,
  CardBottom,
  Address,
  SectionHeader,
  MainTitle,
  VerticalBar,
  SubText,
  Badge,
} from "./CommonCard.styls";
import { useNavigate } from "react-router-dom";

const FestivalSlide = ({ data }) => {
  const navi = useNavigate();
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

export default FestivalSlide;
