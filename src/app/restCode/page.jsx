"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResetCode() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^\d+$/, "Reset code must be numeric"),
  });

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      toast.success("Success");
      route.push('/newpassword'); // Redirect to new password page
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema,
  });

  return (
    <div className="p-5">
      <div className="flex justify-center mb-5">
        <div className="bg-white p-10 rounded shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-5">Verify Reset Code</h1>
          <p className="text-gray-600 mb-6">
            Enter the reset code sent to your email
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="resetCode" className="block mb-2">Reset Code</label>
              <input
                id="resetCode"
                name="resetCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resetCode}
                className="border rounded p-2 w-full bg-gray-100"
              />
              {formik.errors.resetCode && formik.touched.resetCode && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.resetCode}</p>
              )}
            </div>

            <button
              type="submit"
              className={`bg-red-500 text-white font-semibold py-2 px-4 rounded w-full ${loading ? "opacity-50" : ""}`}
              disabled={loading}
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
