"use client";
import React, { useState } from "react";
import Image from "next/image"; // استيراد مكون Image من Next.js
import img1 from "../../assets/dl.beatsnoop 1.svg";
import { useDispatch } from "react-redux"; 
import Link from "next/link";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const route = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  async function handleReg(values) {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      localStorage.setItem('token', response.data.token);
      toast.success(response.data.message);
      route.push('/');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => handleReg(values),
    validationSchema,
  });

  return (
    <div className="p-5 mt-24">
      <div className="flex justify-center mb-5">
        <Image 
          src={img1} // استخدام مكون Image
          alt="Avatar" 
          width={500} // تحديد العرض
          height={300} // تحديد الارتفاع
          className="rounded-none" 
        />
      </div>
      <div className="p-10 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-5">Log In</h1>
        <p className="text-gray-600 mb-8">Enter your details below</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email-input" className="block mb-2">Email or Phone Number</label>
            <input
              id="email-input"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full p-3 border rounded bg-gray-100"
              type="text"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="password-input" className="block mb-2">Password</label>
            <input
              id="password-input"
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full p-3 border rounded bg-gray-100"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-3 bg-red-500 text-white rounded hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Create Account"}
          </button>

          <p className="text-center mt-5">
            Already have an account?
            <Link href="/signup" className="text-red-500 underline ml-1">Register</Link>
            <Link href="/forgotpassword" className="text-red-500 underline ml-3">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
