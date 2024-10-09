"use client";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { getProductFlashSeals } from "../lib/sliceProduct";
import { addWishList } from "../lib/sliceWishlist";
import { addCart } from "../lib/sliceCart";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function ProductsPage() {
  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);

  const dispatch = useDispatch();
  const allProduct = useSelector((state) => state.getProductFlashSealsSlice.products);
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);
  const { products: cartProducts } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProductFlashSeals());
  }, [dispatch]);

  const addwishlistproduct = (id) => {
    try {
      dispatch(addWishList(id));
      toast.success(wishlistProducts?.data?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const addToCartProduct = async (id) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      await dispatch(addCart(id));
      toast.success(cartProducts?.data?.message);
    } catch (error) {
      toast.error(cartProducts?.data?.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = allProduct?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-5 mt-24">
      <h1 className="text-3xl font-bold mb-5">All Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-md p-2 mb-5 w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-4 text-center relative"
            >
              <Link href={`/DetialsProduct/${product.id}/${product.category.name}`}>
                <Image
                  src={product.imageCover}
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                  alt={product.title}
                />
                <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                <p className="text-red-600 font-medium">${product.price}</p>
                <p className="text-gray-600 mt-2">{product.description.slice(0, 50)}...</p>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCartProduct(product.id);
                }}
                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                {loadingStates[product.id] ? (
                  <span className="loader"></span>
                ) : (
                  "Add to Cart"
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addwishlistproduct(product.id);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
