"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOrder } from "../lib/sliceOrder";
import Link from "next/link";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { products: getorder } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrder());
  }, [dispatch]);

  return (
    <div className="p-5 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-bold mb-5 text-center text-gray-800">
        All Orders
      </h1>
      <hr className="mb-5" />
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 border-b">Order ID</th>
              <th className="py-3 px-4 border-b">User Name</th>
              <th className="py-3 px-4 border-b">Phone Number</th>
              <th className="py-3 px-4 border-b">City</th>
              <th className="py-3 px-4 border-b">Total Price</th>
              <th className="py-3 px-4 border-b">Created At</th>
              <th className="py-3 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {getorder?.data?.data.map((order, index) => (
              <tr
                key={order._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-3 px-4 border-b">{order._id}</td>
                <td className="py-3 px-4 border-b">{order.user.name}</td>
                <td className="py-3 px-4 border-b">{order?.shippingAddress?.phone}</td>
                <td className="py-3 px-4 border-b">{order?.shippingAddress?.city}</td>
                <td className="py-3 px-4 border-b">{order.totalOrderPrice} EGP</td>
                <td className="py-3 px-4 border-b">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => alert(`Order Details: ${order._id}`)}
                  >
                    <span className="material-icons">info</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
