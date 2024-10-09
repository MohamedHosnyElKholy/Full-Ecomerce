"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Contact() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        {/* معلومات الاتصال */}
        <div className="md:col-span-3 border-r md:border-gray-300 pr-5 mb-5 md:mb-0">
          <div className="mb-5">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white rounded-full p-4 text-3xl">
                <i className="fas fa-phone"></i>
              </div>
              <h2 className="text-lg font-semibold">Call To Us</h2>
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-gray-700 mt-2">Phone: +8801611112222</p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white rounded-full p-4 text-3xl">
                <i className="fas fa-envelope"></i>
              </div>
              <h2 className="text-lg font-semibold">Write To Us</h2>
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-gray-700 mt-2">Emails: customer@exclusive.com</p>
            <p className="text-gray-700">support@exclusive.com</p>
          </div>
        </div>

        {/* النموذج */}
        <div className="md:col-span-9">
          <form className="bg-gray-100 p-5 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* حقل الاسم */}
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* حقل البريد الإلكتروني */}
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* حقل الهاتف */}
              <div>
                <label className="block mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* حقل الرسالة */}
              <div className="md:col-span-3">
                <label className="block mb-2">Message</label>
                <textarea
                  required
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* زر إرسال الرسالة */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-500"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
