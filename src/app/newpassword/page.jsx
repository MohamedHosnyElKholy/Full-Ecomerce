"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function NewPassword() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, 
        values,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      toast.success("Password reset successfully!");
      localStorage.setItem("Newtoken", response.data.token);
      route.push("/login"); // Redirect after success
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema,
  });

  return (
    <div className="p-5">
      <div className="flex justify-center mb-5">
        <div className="bg-white p-10 rounded shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-5">Reset Password</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="border rounded p-2 w-full bg-gray-100"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block mb-2">New Password</label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className="border rounded p-2 w-full bg-gray-100"
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className={`bg-red-500 text-white font-semibold py-2 px-4 rounded w-full ${loading ? "opacity-50" : ""}`}
              disabled={loading}
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
