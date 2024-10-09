"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, removeProductFlashSeals, clearCart, getuserCart } from "../lib/sliceCart";
import Image from 'next/image';
import { toast } from "react-hot-toast";
import Link from 'next/link';

export default function Page() {
  const [loadingStates, setLoadingStates] = useState({});
  const [loadingRemoveStates, setLoadingRemoveStates] = useState({});
  const dispatch = useDispatch();
  const { products: cartProducts } = useSelector((state) => state.cart);
  const allCart = cartProducts?.data?.data?.products || [];

  useEffect(() => {
    dispatch(getuserCart());
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart()).then(() => dispatch(getuserCart()));
  };

  const handleRemoveCart = async (id) => {
    setLoadingRemoveStates((prev) => ({ ...prev, [id]: true }));
    try {
      await dispatch(removeProductFlashSeals(id));
      await dispatch(getuserCart());
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Failed to remove product from cart.");
    } finally {
      setLoadingRemoveStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleUpdateCart = async (id, count) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      await dispatch(updateCart({ id, count }));
      await dispatch(getuserCart());
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="container mx-auto mt-24">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {allCart.length === 0 ? (
        <div className="text-center mt-4">
          <h2 className="text-xl text-gray-600">Your cart is empty. Please add some products!</h2>
        </div>
      ) : (
        <>
          {/* Total Price Section */}
          <div className="mt-4 text-right">
            <h2 className="text-2xl font-bold text-gray-800">Total Price:</h2>
            <h2 className="text-2xl text-red-600">${cartProducts?.data?.data?.totalCartPrice}</h2>
          </div>

          {/* Clear Cart Button */}
          <div className="text-right mb-2 mt-1">
            <button onClick={handleClearCart} className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
              Clear Cart
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col gap-4">
            {allCart.map((product) => (
              <div key={product.product?.id} className="flex flex-col sm:flex-row items-center p-4 border border-gray-300 rounded-md">
                <div className="relative w-20 h-20">
                  <Image
                    src={product.product?.imageCover}
                    alt={product.product?.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left p-2">
                  <h2 className="text-lg font-semibold">{product.product?.title}</h2>
                  <p className="text-gray-600 mb-1">Price: ${product?.price}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <button
                      onClick={() => handleUpdateCart(product.product?.id, product.count - 1)}
                      disabled={loadingStates[product.product?.id] || product.count <= 1}
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="mx-1 text-xl">
                      {loadingStates[product.product?.id] ? "..." : product.count}
                    </span>
                    <button
                      onClick={() => handleUpdateCart(product.product?.id, product.count + 1)}
                      disabled={loadingStates[product.product?.id]}
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-end ml-0 sm:ml-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleRemoveCart(product.product?.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    {loadingRemoveStates[product.product?.id] ? "..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Check Out Button */}
          <div className="text-right mt-4 mb-4">
            <Link href="/cheakOut">
              <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Check Out
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
