import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BannerSlide from "./BannerSlide";
import TravelRecoSlide from "./TravelRecoSlide";
import MidBanner from "./MidBanner";
import FestivalSlide from "./FestivalSlide";
import RestaurantSlide from "./RestaurantSlide";
import Hotel from "./Hotel";
import { HomeContainer, SectionDivider, ScrollToTopButton } from "./Home.styls";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const [contents, setContents] = useState([]);
  const [bannserContents, setBannerContents] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const top5 = bannserContents.slice(0, 5);

  const travelList = contents
    .filter((item) => item.category === "1")
    .slice(0, 4);
  const restaurantList = contents
    .filter((item) => item.category === "2")
    .slice(0, 4);
  const hotelList = contents
    .filter((item) => item.category === "3")
    .slice(0, 4);
  const festivalList = contents
    .filter((item) => item.category === "4")
    .slice(0, 4);

  useEffect(() => {
    // 데이터 가져오기
    axios
      .get(`${apiUrl}/api/home`)
      .then((res) => {
        setContents(res.data.items);
        setBannerContents(res.data.items);
      })
      .catch((err) => console.error(err));

    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [apiUrl]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <HomeContainer>
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <BannerSlide data={top5} />
      </motion.div>

      <SectionDivider>
        <span>추천 여행지</span>
      </SectionDivider>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <TravelRecoSlide data={travelList} />
      </motion.div>

      <SectionDivider>
        <span>특별한 숙소</span>
      </SectionDivider>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <Hotel data={hotelList} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <MidBanner />
      </motion.div>

      <SectionDivider>
        <span>지금 즐기기 좋은 축제</span>
      </SectionDivider>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <FestivalSlide data={festivalList} />
      </motion.div>

      <SectionDivider>
        <span>맛집 탐방</span>
      </SectionDivider>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <RestaurantSlide data={restaurantList} />
      </motion.div>

      {showScrollButton && (
        <ScrollToTopButton
          as={motion.button}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-chevron-up"></i>
        </ScrollToTopButton>
      )}
    </HomeContainer>
  );
};

export default Home;
