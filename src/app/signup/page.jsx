"use client";
import React, { useState } from "react";
import img1 from "../../assets/dl.beatsnoop 1.svg";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    rePassword: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits long"),
  });

  async function handleReg(values) {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(response);
      localStorage.setItem('token', response.data.token);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => handleReg(values),
    validationSchema,
  });

  return (
    <div className="p-5 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:h-full">
          <img src={img1.src} alt="Logo" className="w-full h-full object-cover rounded-none" />
        </div>
        <div className="p-10">
          <h1 className="font-semibold text-3xl mb-5">Create an account</h1>
          <p className="text-gray-600 mb-8">Enter your details below</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name-input" className="block mb-2">Name</label>
              <input
                id="name-input"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full border rounded p-2 bg-gray-100"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email-input" className="block mb-2">Email or Phone Number</label>
              <input
                id="email-input"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border rounded p-2 bg-gray-100"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password-input" className="block mb-2">Password</label>
              <input
                id="password-input"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full border rounded p-2 bg-gray-100"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="rePassword-input" className="block mb-2">Confirm Password</label>
              <input
                id="rePassword-input"
                type="password"
                name="rePassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                className="w-full border rounded p-2 bg-gray-100"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="text-red-500">{formik.errors.rePassword}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="phone-input" className="block mb-2">Phone Number</label>
              <input
                id="phone-input"
                type="tel"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="w-full border rounded p-2 bg-gray-100"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-500">{formik.errors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-red-600 text-white py-2 rounded ${loading ? 'opacity-50' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Create Account"
              )}
            </button>
            
            <p className="text-center mt-4">
              Already have an account?
              <Link href="/login" className="text-red-600 underline ml-1">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
