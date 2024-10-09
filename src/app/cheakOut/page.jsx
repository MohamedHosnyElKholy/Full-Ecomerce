"use client";
import React, { useState } from "react";
import img1 from "../../assets/dl.beatsnoop 1.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { cheakOut } from "../lib/sliceCart";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only"),
    details: Yup.string().required("Details are required"),
    city: Yup.string().required("City is required"),
  });

  const { products: cheakCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const sessions = cheakCart?.data?.session?.url;

  async function handleReg({ cartId, values }) {
    try {
      setLoading(true);
      await dispatch(cheakOut({ cartId, formdData: values }));
      if (sessions) {
        route.push(sessions);
      } else {
        console.log('err');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      phone: "",
      details: "",
      city: "",
    },
    onSubmit: (values) => handleReg({ cartId: '6703fddb475ce789cdbcba42', values }),
    validationSchema,
  });

  return (
    <div className="p-5 mt-24">
      <div className="flex flex-col md:flex-row justify-center mb-5">
        <div className="w-full md:w-7/12">
          <img src={img1?.src} alt="Logo" className="w-full h-auto rounded-none" />
        </div>
        <div className="w-full md:w-5/12 p-10">
          <h1 className="font-medium text-3xl mb-5 text-black">
            Complete Your Purchase
          </h1>
          <p className="font-normal text-lg mb-8 text-gray-700">
            Enter your details below
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label htmlFor="phone-input" className="block mb-2">Phone Number</label>
              <input
                id="phone-input"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="bg-gray-100 rounded w-full p-2"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-500 mt-2 font-normal">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="details-input" className="block mb-2">Details</label>
              <input
                id="details-input"
                name="details"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                className="bg-gray-100 rounded w-full p-2"
              />
              {formik.errors.details && formik.touched.details && (
                <p className="text-red-500 mt-2 font-normal">
                  {formik.errors.details}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="city-input" className="block mb-2">City</label>
              <input
                id="city-input"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className="bg-gray-100 rounded w-full p-2"
              />
              {formik.errors.city && formik.touched.city && (
                <p className="text-red-500 mt-2 font-normal">
                  {formik.errors.city}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-red-600 font-medium mb-5 text-white rounded w-full py-3 hover:bg-red-500 flex items-center justify-center"
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-check"></i>
              )}
              <span className="ml-2">Proceed to Checkout</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
