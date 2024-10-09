"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductFlashSeals } from "../lib/sliceProduct";
import { addWishList } from "../lib/sliceWishlist";
import { addCart } from "../lib/sliceCart";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from 'next/image';

export default function Page() {
  const [loadingStates, setLoadingStates] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    dispatch(getProductFlashSeals());
  }, [dispatch]);

  const allProduct = useSelector((state) => state.getProductFlashSealsSlice.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { products: cartProducts } = useSelector((state) => state.cart);

  function addwishlistproduct(id) {
    if (!isLoggedIn) {
      toast.error("You need to log in to add the product to your wishlist.");
      return;
    }
    try {
      dispatch(addWishList(id));
      toast.success(wishlistProducts?.data?.message);
    } catch (error) {
      toast.error(wishlistProducts?.data?.message);
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
      toast.success(cartProducts?.data?.message);
    } catch (error) {
      toast.error(cartProducts?.data?.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  }

  return (
    <div className="container mx-auto p-5">
      <div className="font-semibold text-red-600 mb-5">This Month</div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-black text-2xl md:text-4xl">Best Selling Products</h1>
        <Link href="/allProduct" className="bg-red-600 text-white py-2 px-4 rounded">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(allProduct) && allProduct.slice(0, 4).map((el) => (
          <div key={el.id} className="relative text-center shadow-lg rounded-lg p-5 bg-white transition-transform transform hover:scale-105">
            <Link href={`/DetialsProduct/${el.id}/${el.category.name}`}>
              <Image
                src={el.imageCover}
                alt={el.name}
                width={200}
                height={200}
                className="rounded-t-lg object-cover"
              />
              <div className="text-left mt-3">
                <h2 className="font-bold text-black mb-2">{el.title}</h2>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-red-600">${el.price}</span>
                  <span className="font-semibold text-black text-sm">{el.ratingsAverage}</span>
                </div>
              </div>
            </Link>

            <div className="absolute top-4 right-4 flex flex-col gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); addwishlistproduct(el._id); }} 
                className="text-gray-600 text-xl hover:text-gray-800 transition-colors"
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>

            <button
              onClick={() => addToCartProduct(el.id)}
              className={`bg-blue-600 text-white font-semibold py-2 rounded w-full ${loadingStates[el.id] ? "opacity-50" : ""}`}
              disabled={loadingStates[el.id]}
            >
              {loadingStates[el.id] ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
