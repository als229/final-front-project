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
import { useNavigate } from "react-router-dom";

const BannerSlide = ({ data }) => {
  const navi = useNavigate();
  console.log(data);
  return (
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
                  <BannerImage
                    src={item.firstImage}
                    alt={item.title}
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
                </ImageBox>
              </SlideInner>
            </SwiperSlide>
          ))}
        </Swiper>
      </SlideWrapper>
      <PaginationSpacer />
    </>
  );
};

export default BannerSlide;
