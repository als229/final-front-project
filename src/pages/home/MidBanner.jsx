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
        <BannerText>여행은 결국 기억을 남기는 일.</BannerText>
        <BannerSubText>
          놀러Way가 사랑받은 여행지를 콕! 찍어 추천합니다.
        </BannerSubText>
      </BannerContent>
    </BannerContainer>
  );
};

export default MidBanner;
