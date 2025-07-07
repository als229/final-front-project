import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BannerSlide from "./BannerSlide";
const Home = () => {
  const navi = useNavigate();
  const apiUrl = window.ENV?.API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/home`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <BannerSlide />
      <h1>asd</h1>
    </>
  );
};

export default Home;
