"use client";
import React, { useState } from "react";
import Image from "next/image"; // استيراد مكون Image من Next.js
import img1 from "../../assets/dl.beatsnoop 1.svg";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      console.log(response);
      toast.success(response.data.message);
      route.push('/restCode');
    } catch (error) {
      toast.error(error.response?.data.message || "An error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema,
  });

  return (
    <div className="p-5">
      <div className="flex justify-center mb-5">
        <Image 
          src={img1} // استخدام مكون Image
          alt="Logo" 
          width={500} // تحديد العرض
          height={300} // تحديد الارتفاع
          className="w-full md:w-1/2"
        />
      </div>
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="md:w-1/2 p-10">
          <h1 className="font-medium text-3xl mb-5 text-black">Forgot Password</h1>
          <p className="font-normal text-base mb-8 text-gray-700">
            Enter your email to receive a reset link
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email-input" className="block mb-2 text-gray-600">Email</label>
              <input
                id="email-input"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full bg-gray-200 rounded p-2"
                type="email"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 mt-2">{formik.errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white rounded p-3 hover:bg-red-600 flex items-center justify-center"
            >
              {loading ? <span className="loader"></span> : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
