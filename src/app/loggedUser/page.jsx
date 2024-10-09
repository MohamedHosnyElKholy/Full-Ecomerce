"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAdress, deleteUserAdress } from "../lib/sliceAdress"; // تأكد من أن المسار صحيح
import { toast } from "react-hot-toast";

const CustomerData = () => {
  const dispatch = useDispatch();
  const { addresses, loading, error } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getUserAdress());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteUserAdress(id));
    dispatch(getUserAdress()); // تحديث قائمة العناوين
    toast.success("Address deleted successfully");
  };

  return (
    <div className="p-5">
      <h4 className="text-center text-2xl mb-5">Customer Data</h4>
      {loading ? (
        <div className="flex justify-center mt-4">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 font-bold text-left">Name</th>
                {window.innerWidth > 640 && (
                  <th className="py-2 px-4 font-bold text-left">Details</th>
                )}
                <th className="py-2 px-4 font-bold text-left">Phone</th>
                <th className="py-2 px-4 font-bold text-left">City</th>
                <th className="py-2 px-4 font-bold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {addresses.length > 0 ? (
                addresses.map((customer) => (
                  <tr key={customer._id} className="border-b">
                    <td className="py-2 px-4">{customer.name}</td>
                    {window.innerWidth > 640 && (
                      <td className="py-2 px-4">{customer.details || 'N/A'}</td>
                    )}
                    <td className="py-2 px-4">{customer.phone}</td>
                    <td className="py-2 px-4">{customer.city}</td>
                    <td className="py-2 px-4">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(customer._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={window.innerWidth > 640 ? 5 : 4} className="py-2 px-4 text-center">
                    No data available to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {error && (
        <p className="text-red-500 text-center mt-2">{error}</p>
      )}
    </div>
  );
};

export default CustomerData;
