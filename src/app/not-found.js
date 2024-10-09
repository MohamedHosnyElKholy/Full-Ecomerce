'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Image from 'next/image';
import imageerr from "../assets/404-error.svg"; // تأكد من المسار صحيح

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-5">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={imageerr} // استخدم الصورة مباشرة
          alt="404 Not Found"
          width={500} // استبدل بالقيمة المناسبة
          height={300} // استبدل بالقيمة المناسبة
          className="rounded-none"
        />
      </motion.div>

      {/* Text */}
      <h1 className="font-bold text-5xl mb-5">Oops!</h1>
      <h6 className="text-lg mb-5 text-gray-600">
        We can't seem to find the page you're looking for.
      </h6>

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => router.push("/")}
          className="bg-red-600 text-white font-medium rounded py-3 px-6 hover:bg-red-500"
        >
          <i className="fas fa-home mr-2"></i> Back to Home
        </button>
      </motion.div>
    </div>
  );
}
