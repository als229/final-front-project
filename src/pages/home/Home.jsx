import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BannerSlide from "./BannerSlide";
import TravelRecoSlide from "./TravelRecoSlide";
import MidBanner from "./MidBanner";
import FestivalSlide from "./FestivalSlide";
import RestaurantSlide from "./RestaurantSlide";
import Hotel from "./Hotel";
const Home = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;
  const [contents, setContents] = useState([]);
  const [bannserContents, setBannerContents] = useState([]);
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
    axios
      .get(`${apiUrl}/api/home`)
      .then((res) => {
        console.log(" 응답 확인:", res.data);

        setContents(res.data.items);
        setBannerContents(res.data.items);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <BannerSlide data={top5} />
      <TravelRecoSlide data={travelList} />
      <Hotel data={hotelList} />
      <MidBanner />
      <FestivalSlide data={festivalList} />
      <RestaurantSlide data={restaurantList} />
    </>
  );
};
export default Home;
