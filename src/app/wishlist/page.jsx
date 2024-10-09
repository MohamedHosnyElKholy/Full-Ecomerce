'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishLits, deleteWishList } from "../lib/sliceWishlist";
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function Wishlist() {
  const { products: getwishlistProducts } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishLits());
  }, [dispatch]);

  async function deleteProductWish(id) {
    try {
      await dispatch(deleteWishList(id)).unwrap();
      toast.success("Product removed from wishlist");
      await dispatch(getWishLits()).unwrap();
    } catch (error) {
      toast.error("Failed to remove product: " + error.message);
    }
  }

  return (
    <div className="container mx-auto my-8 p-5 mt-24">
      <h2 className="text-3xl font-bold mb-4">Your Wishlist</h2>
      {getwishlistProducts?.data?.data?.length === 0 ? (
        <p className="text-lg text-gray-600 text-center mt-4">
          Your wishlist is currently empty. Add items to your wishlist to save them for later!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(getwishlistProducts?.data?.data) && getwishlistProducts.data.data.map((item) => (
            <div key={item._id} className="border border-gray-300 rounded-lg p-4 flex flex-col items-center">
              <Image
                src={item.imageCover}
                alt={item.name}
                width={200}
                height={200}
                className="rounded-t-lg object-cover"
              />
              <h3 className="text-lg font-semibold text-center mt-2">{item.title}</h3>
              <p className="text-gray-700">Price: ${item.price}</p>
              <p className="text-gray-600">Rating: {item.ratingsAverage} ({item.ratingsQuantity} reviews)</p>
              <button 
                onClick={() => deleteProductWish(item._id)} 
                className="mt-4 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
