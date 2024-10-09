"use client";
import React, { useEffect, useState } from "react";
import { addAddress } from "../lib/sliceAdress"; // تأكد من تحديث المسار الصحيح
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

export default function AddAddressPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const addressData = { name, details, phone, city };
    dispatch(addAddress(addressData))
      .then(() => {
        toast.success("Address added successfully!");
        setName("");
        setDetails("");
        setPhone("");
        setCity("");
        router.push('/loggedUser');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="p-5 mt-24">
      <h1 className="text-3xl font-bold mb-5">Add New Address</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="name-input" className="block mb-1">Name</label>
            <input
              id="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="details-input" className="block mb-1">Details</label>
            <input
              id="details-input"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone-input" className="block mb-1">Phone</label>
            <input
              id="phone-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city-input" className="block mb-1">City</label>
            <input
              id="city-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="col-span-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Address
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
