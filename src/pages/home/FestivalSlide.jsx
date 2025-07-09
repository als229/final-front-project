import React from "react";
import { motion } from "framer-motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),
};

const FestivalSlide = ({ data }) => {
  const navi = useNavigate();

  return (
    <SlideWrapper>
      <SectionHeader>
        <MainTitle>축제</MainTitle>
        <VerticalBar />
        <SubText>지금 열리고 있는 색다른 축제를 경험해보세요</SubText>
      </SectionHeader>

      <CardList>
        {data.map((item, index) => (
          <motion.div
            key={item.contentId}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
          >
            <Card>
              <ImageWrapper>
                <Badge>추천</Badge>
                <CardImage
                  src={
                    item.firstImage ||
                    "https://via.placeholder.com/300x200?text=축제+이미지"
                  }
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
          </motion.div>
        ))}
      </CardList>
    </SlideWrapper>
  );
};

export default FestivalSlide;
