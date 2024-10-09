"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Page() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  
  const sliderRef = useRef(null);

  return (
    <div className="container mx-auto py-6">
      <div className="font-bold text-red-600 mb-6">Categories</div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-3xl text-black">Browse By Category</h2>
      </div>
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-5 m-2 border-2 border-gray-300 rounded-lg bg-gray-100 hover:bg-red-600 hover:text-white transition-all duration-300">
              <i className="fas fa-clock text-4xl"></i>
              <p className="font-normal">Smart Watch</p>
            </div>
          ))}
        </Slider>
        <div className="absolute top-1/2 right-2 flex gap-2 transform -translate-y-1/2 z-10">
          <i
            className="fas fa-arrow-left cursor-pointer text-2xl"
            onClick={() => sliderRef.current.slickPrev()}
          ></i>
          <i
            className="fas fa-arrow-right cursor-pointer text-2xl"
            onClick={() => sliderRef.current.slickNext()}
          ></i>
        </div>
      </div>
    </div>
  );
}
