import React from "react";
import Slider from "react-slick";
import {
  BannerWrapper,
  SlideItem1,
  SlideItem2,
  SlideItem3,
  SlideItem4,
  SlideItem5,
  TextSection,
  Label,
  Title,
  DetailLink,
  ImageSection,
  BannerImage,
} from "./BannerSlide.styls";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slideData = [
  {
    id: 1,
    label: "가볼래-터 7월호 도착!",
    title: "하반기 시~작!\n마음 챙김 여행지",
    subText: "자세히 보기",
    imgUrl: "/img/slide1.png",
  },
  {
    id: 2,
    label: "가족 나들이 코스 추천",
    title: "천년의 역사를 품은\n경주 도보 여행지 4",
    subText: "자세히 보기",
    imgUrl: "/img/slide2.png",
  },
  {
    id: 3,
    label: "달빛 아래 걷는 월영교와 함께,",
    title: "고택에서 쉬어가는\n안동 1박 2일 코스",
    subText: "자세히 보기",
    imgUrl: "/img/slide3.png",
  },
  {
    id: 4,
    label: "대한민국구석구석 x TMAP",
    title: "APEC 개최지\n청량한 여름 여행",
    subText: "자세히 보기",
    imgUrl: "/img/slide4.png",
  },
  {
    id: 5,
    label: "여름 해변편",
    title: "가볼만할지도\n여름해변편",
    subText: "자세히 보기",
    imgUrl: "/img/slide5.png",
  },
];

const BannerSlide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const slideComponents = [
    SlideItem1,
    SlideItem2,
    SlideItem3,
    SlideItem4,
    SlideItem5,
  ];

  return (
    <BannerWrapper>
      <Slider {...settings}>
        {slideData.map((item, index) => {
          const SlideItem = slideComponents[index];
          return (
            <SlideItem key={item.id}>
              <TextSection>
                <Label>{item.label}</Label>
                <Title>{item.title}</Title>
                <DetailLink href="#">{item.subText}</DetailLink>
              </TextSection>
              <ImageSection>
                <BannerImage src={item.imgUrl} alt="slide" />
              </ImageSection>
            </SlideItem>
          );
        })}
      </Slider>
    </BannerWrapper>
  );
};

export default BannerSlide;
