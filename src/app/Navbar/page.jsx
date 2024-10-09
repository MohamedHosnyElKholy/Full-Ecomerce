"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const pages = ["Home", "Contact", "About", "SignUp", "Address"];

function ResponsiveAppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { products: cartProducts } = useSelector((state) => state.cart);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("countdownEndDate");
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-black hover:text-red-500 transition-colors">
          Exclusive
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>

        <div className={`absolute bg-white shadow-md mt-2 right-0 z-10 w-48 top-0 rounded-md ${isMenuOpen ? 'block' : 'hidden'}`}>
          {pages.map((page) => (
            <Link key={page} href={page === "Home" ? "/" : `/${page.toLowerCase()}`} className="block p-2 hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
              {page}
            </Link>
          ))}
          <div className="flex justify-around mt-2 border-t border-gray-200 pt-2">
            <Link href="/wishlist" className="flex items-center">
              <i className="fas fa-heart text-lg text-gray-700 hover:text-red-500"></i>
            </Link>
            <Link href="/cart" className="flex items-center relative">
              <i className="fas fa-shopping-cart text-lg text-gray-700 hover:text-red-500"></i>
              {cartProducts?.data?.numOfCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-semibold">
                  {cartProducts.data.numOfCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="hidden md:flex space-x-6">
          {pages.map((page) => (
            <Link key={page} href={page === "Home" ? "/" : `/${page.toLowerCase()}`} className="text-black hover:text-red-500 transition-colors font-medium">
              {page}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Link href="/allProduct" className="absolute right-2 top-2 text-gray-500 hover:text-red-500 transition-colors">
              <i className="fas fa-search"></i>
            </Link>
          </div>

          <Link href="/wishlist" className="relative hidden md:flex items-center">
            <i className="fas fa-heart text-xl text-gray-700 hover:text-red-500 transition-colors"></i>
          </Link>

          <Link href="/cart" className="relative hidden md:flex items-center">
            <i className="fas fa-shopping-cart text-xl text-gray-700 hover:text-red-500 transition-colors"></i>
            {cartProducts?.data?.numOfCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-semibold">
                {cartProducts.data.numOfCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default ResponsiveAppBar;
