import React from "react";
import {
  BannerContainer,
  BannerContent,
  BannerText,
  BannerSubText,
} from "./MidBanner.styls";

const MidBanner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <BannerText>여행은 새로운 시선을 만나는 시간</BannerText>
        <BannerSubText>
          놀러Way가 제안하는 특별한 여행지와 함께 새로운 하루를 만들어보세요.
        </BannerSubText>
      </BannerContent>
    </BannerContainer>
  );
};

export default MidBanner;
