"use client";
/* eslint-disable @next/next/no-img-element */
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
// import "swiper/css/bundle";
import React from "react";
import { useCurrentBreakpoint } from "../hooks/useCurrentBreakpoint";

interface Props {}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const breakpointToslidesPerViewMapper = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 4,
  DEFAULT: 4,
};

const ImageSlider = ({}: Props) => {
  const breakpoint =
    useCurrentBreakpoint() as keyof typeof breakpointToslidesPerViewMapper;
  const slidesPerView =
    breakpointToslidesPerViewMapper[breakpoint] ||
    breakpointToslidesPerViewMapper.DEFAULT;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      className="w-[80vw]"
      navigation
      speed={3000}
      autoplay={{ delay: 1000 }}
      // pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={slidesPerView}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {[...Array.from({ length: 6 })].map((_, i) => (
        <SwiperSlide key={`slide-${i}`}>
          {/* <img
            alt="Header"
            src={`/images/slider-${i + 1}.webp`}
            className="w-[800px]"
            loading="lazy"
          /> */}
          <LazyLoadImage
            alt="Header"
            src={`/images/slider-${i + 1}.webp`}
            className="w-[800px] rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default ImageSlider;
