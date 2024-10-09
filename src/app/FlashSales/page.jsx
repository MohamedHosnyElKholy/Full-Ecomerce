"use client";
import React, { useRef, useEffect, useState } from "react";
import Countdown from "react-countdown";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductFlashSeals } from "../lib/sliceProduct";
import { addWishList } from "../lib/sliceWishlist";
import { addCart } from "../lib/sliceCart";
import toast from "react-hot-toast";
import Image from 'next/image';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const [loadingStates, setLoadingStates] = useState({});
  const allProduct = useSelector((state) => state.getProductFlashSealsSlice.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { products: cartProducts } = useSelector((state) => state.cart);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProductFlashSeals());
  }, [dispatch]);

  function addWishlistProduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your wishlist.");
      return;
    }
    try {
      dispatch(addWishList(id));
      toast.success(wishlistProducts?.data?.message || "Added to wishlist!");
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while adding.");
    }
  }

  async function addToCartProduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your cart.");
      return;
    }
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      await dispatch(addCart(id));
      toast.success(cartProducts?.data?.message || "Added to cart!");
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while adding.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const sliderRef = useRef(null);
  const totalSeconds = 60 * 60 * 24 * 200;

  const Completionist = () => <span>You are good to go!</span>;

  const [countdownDate, setCountdownDate] = useState(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEndDate = localStorage.getItem("countdownEndDate");
      if (storedEndDate) {
        setCountdownDate(Number(storedEndDate));
      } else {
        const newEndDate = Date.now() + totalSeconds * 1000;
        setCountdownDate(newEndDate);
        localStorage.setItem("countdownEndDate", newEndDate);
      }
    }
  }, []);

  if (countdownDate === null) {
    return <div className="flex justify-center mt-4"><div className="loader"></div></div>;
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="text-center font-bold text-blue-600">
        Today’s
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mt-5">
        <h2 className="font-bold text-2xl md:text-4xl text-gray-800">Flash Sales</h2>
        <div className="flex">
          <Countdown
            date={countdownDate}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              if (completed) {
                return <Completionist />;
              } else {
                return (
                  <div className="flex gap-4 items-center">
                    <div className="text-center">
                      <span className="font-medium text-sm">Days</span>
                      <div className="font-bold text-lg md:text-2xl text-blue-600">{days} :</div>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-sm">Hours</span>
                      <div className="font-bold text-lg md:text-2xl text-blue-600">{hours} :</div>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-sm">Minutes</span>
                      <div className="font-bold text-lg md:text-2xl text-blue-600">{minutes} :</div>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-sm">Seconds</span>
                      <div className="font-bold text-lg md:text-2xl text-blue-600">{seconds}</div>
                    </div>
                  </div>
                );
              }
            }}
          />
        </div>
      </div>

      <div className="relative mt-5">
        <Slider ref={sliderRef} {...settings}>
          {Array.isArray(allProduct) &&
            allProduct.slice(0, 20).map((el) => (
              <div key={el.id} className="max-w-xs mx-2">
                <Link href={`/DetialsProduct/${el.id}/${el.category.name}`} className="block text-center">
                  <Image
                    src={el.imageCover}
                    alt={el.name}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover transition-transform transform hover:scale-105 m-auto"
                  />
                  <div className="p-4 border rounded-lg bg-gray-50 mt-2">
                    <h3 className="font-semibold text-gray-800">{el.name}</h3>
                    <p className="text-gray-600">{el.description.length > 50 ? `${el.description.slice(0, 50)}...` : el.description}</p>
                    <div className="font-bold text-blue-600">${el.price}</div>
                  </div>
                </Link>
                <div className="flex justify-between p-2 border-t mt-2">
                  <button 
                    onClick={() => addToCartProduct(el.id)} 
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    {loadingStates[el.id] ? "Loading..." : "Add to Cart"}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); addWishlistProduct(el.id); }} className="text-gray-600 hover:text-blue-700 transition-colors">
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            ))}
        </Slider>

        <div className="absolute top-0 right-0 flex gap-2 z-10">
          <button onClick={() => sliderRef.current.slickPrev()} className="bg-white border p-2 rounded shadow hover:bg-gray-100 transition-colors">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={() => sliderRef.current.slickNext()} className="bg-white border p-2 rounded shadow hover:bg-gray-100 transition-colors">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="flex justify-center my-4">
          <Link href="/allProduct" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}
