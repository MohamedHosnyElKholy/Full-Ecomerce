import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-black p-8 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
          {/* العمود الأول */}
          <div className="mb-5">
            <h2 className="font-bold text-2xl mb-4">Exclusive</h2>
            <p className="font-medium text-xl mb-4">Subscribe</p>
            <p className="font-light text-lg mb-5">Get 10% off your first order</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg text-white border border-white placeholder-white p-2"
            />
          </div>

          {/* العمود الثاني */}
          <div className="mb-5">
            <h2 className="font-medium text-xl mb-4">Support</h2>
            <p className="font-light text-lg mb-4">
              111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
            </p>
            <p className="font-light text-lg mb-4">exclusive@gmail.com</p>
            <p className="font-light text-lg mb-4">+88015-88888-9999</p>
          </div>

          {/* العمود الثالث */}
          <div className="mb-5">
            <h2 className="font-medium text-xl mb-4">Account</h2>
            <p className="font-light text-lg mb-4">My Account</p>
            <p className="font-light text-lg mb-4">Login / Register</p>
            <p className="font-light text-lg mb-4">Cart</p>
            <p className="font-light text-lg mb-4">Wishlist</p>
            <p className="font-light text-lg mb-4">Shop</p>
          </div>

          {/* العمود الرابع */}
          <div className="mb-5">
            <h2 className="font-medium text-xl mb-4">Quick Link</h2>
            <p className="font-light text-lg mb-4">Privacy Policy</p>
            <p className="font-light text-lg mb-4">Terms Of Use</p>
            <p className="font-light text-lg">FAQ</p>
            <p className="font-light text-lg">Contact</p>
          </div>

          {/* العمود الخامس */}
          <div className="mb-5">
            <h2 className="font-medium text-xl mb-4">Download App</h2>
            <p className="font-medium text-sm mb-4">Save $3 with App New User Only</p>
            <div className="flex mt-4 gap-2">
              <Image src="/path/to/qrcode.svg" alt="QR Code" width={100} height={100} className="w-full" />
              <div>
                <Image src="/path/to/download-appstore.svg" alt="App Store" width={100} height={40} className="w-full mb-2" />
                <Image src="/path/to/google-play.svg" alt="Google Play" width={100} height={40} className="w-full" />
              </div>
            </div>
          </div>
        </div>
        <p className="font-light text-center">
          Copyright Ecomerve 2024. All rights reserved
        </p>
      </div>
    </div>
  );
}
