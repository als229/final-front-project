import React from "react";
import Slider from "react-slick";
import {
  SlideItem1,
  SlideItem2,
  SlideItem3,
  SlideItem4,
  SlideItem5,
  BannerImage,
  TitleBox,
  Leftbox,
  Rightbox,
  SliderWrapper,
} from "./BannerSlide.styls";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlide = ({ data }) => {
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
    <SliderWrapper>
      <Slider {...settings}>
        {data.map((item, index) => {
          const SlideItem = slideComponents[index % slideComponents.length];
          return (
            <SlideItem key={item.contentId}>
              <Leftbox>
                <TitleBox>
                  <p>{item.title}</p>
                </TitleBox>
              </Leftbox>

              <Rightbox>
                <BannerImage
                  src={`/images/${item.firstImage}`}
                  alt={item.title}
                />
              </Rightbox>
            </SlideItem>
          );
        })}
      </Slider>
    </SliderWrapper>
  );
};

export default BannerSlide;
