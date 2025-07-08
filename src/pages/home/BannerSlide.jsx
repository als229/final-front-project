import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  SlideWrapper,
  SlideInner,
  TextBox,
  Badge,
  Title,
  SubText,
  ImageBox,
  BannerImage,
  PaginationSpacer,
} from "./BannerSlide.styls";

const BannerSlide = ({ data }) => (
  <>
    <SlideWrapper>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
      >
        {data.map((item) => (
          <SwiperSlide key={item.contentId}>
            <SlideInner>
              <TextBox>
                <Badge>여행가자</Badge>
                <Title>{item.title}</Title>
                <SubText>
                  {item.sidoName} {item.sigunguName} {item.dongName}{" "}
                  {item.detailName}
                </SubText>
              </TextBox>

              <ImageBox>
                <BannerImage src={item.firstImage} alt={item.title} />
              </ImageBox>
            </SlideInner>
          </SwiperSlide>
        ))}
      </Swiper>
    </SlideWrapper>
    <PaginationSpacer />
  </>
);

export default BannerSlide;
