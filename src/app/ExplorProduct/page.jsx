"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductFlashSeals());
  }, [dispatch]);

  function addwishlistproduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your wishlist.");
      return;
    }
    dispatch(addWishList(id));
    toast.success("Product added to wishlist.");
  }

  async function addToCartProduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your cart.");
      return;
    }
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      await dispatch(addCart(id));
      toast.success("Product added to cart.");
    } catch (error) {
      toast.error("Failed to add product to cart.");
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
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const sliderRef = useRef(null);

  return (
    <div className="container mx-auto p-4">
      <h2 className="font-semibold text-center text-3xl mb-5">Explore Products</h2>
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {Array.isArray(allProduct) &&
            allProduct.slice(0, 20).map((el) => (
              <div key={el.id} className="m-2 transition-transform transform hover:scale-105">
                <Link href={`/DetialsProduct/${el.id}/${el.category.name}`} className="block">
                  <Image
                    src={el.imageCover}
                    alt={el.name}
                    width={200}
                    height={200}
                    className="rounded-t-lg object-cover w-full h-48"
                  />
                  <div className="bg-white p-4 rounded-b-lg shadow-md">
                    <h3 className="font-semibold text-gray-800 mb-1">{el.name}</h3>
                    <p className="text-gray-600 mb-1">{el.description.length > 50 ? `${el.description.slice(0, 50)}...` : el.description}</p>
                    <span className="font-bold text-primary">${el.price}</span>
                  </div>
                </Link>
                <div className="flex justify-between p-2 border-t border-gray-200">
                  <button
                    onClick={() => addToCartProduct(el.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                  >
                    {loadingStates[el.id] ? (
                      <span className="loader"></span> // يمكن استخدام عنصر loader مخصص هنا
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                  <button
                    aria-label="add to wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      addwishlistproduct(el.id);
                    }}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            ))}
        </Slider>
        <div className="absolute top-10 right-10 flex gap-2 z-10">
          <button onClick={() => sliderRef.current.slickPrev()} className="bg-gray-200 p-2 rounded-full">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={() => sliderRef.current.slickNext()} className="bg-gray-200 p-2 rounded-full">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="flex justify-center my-4">
          <Link href="/allProduct" className="bg-red-600 text-white px-4 py-2 rounded">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}
