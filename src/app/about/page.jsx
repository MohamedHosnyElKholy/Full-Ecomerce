'use client';
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 
import image1 from '../../assets/istockphoto-1214561965-612x612.jpg';
import image2 from '../../assets/bussinesOne.png';
import image3 from '../../assets/bussinesThree.png';
import image4 from '../../assets/bussinesTwo.png';

export default function About() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-24">
        <div>
          <h1 className="font-bold text-3xl md:text-5xl mb-4">Our Story</h1>
          <p className="font-normal mb-6 text-base md:text-lg">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </p>
          <p className="text-base md:text-lg">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast rate. Exclusive offers a diverse assortment in categories
            ranging from consumer goods.
          </p>
        </div>
        <div>
          <Image 
            src={image1} 
            alt="About Image" 
            width={500} 
            height={300} 
            className="w-full h-auto rounded-lg shadow-lg" 
          />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {[
  { value: "10.5k", label: "Sellers active on our site" },
  { value: "33k", label: "Monthly Product Sale" },
  { value: "45.5k", label: "Customers active on our site" },
  { value: "25k", label: "Annual gross sale on our site" },
].map(({ value, label }, index) => (
  <div key={index} className="flex flex-col items-center p-4 bg-gray-800 border-2 border-gray-300 rounded-lg max-w-xs mx-auto my-3">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 mb-4">
      <span className="text-white text-1xl font-bold">{value}</span>
    </div>
    <p className="text-white text-lg font-semibold text-center">{label}</p>
  </div>
))}
      </div>

      {/* Team Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {[
          { image: image2, name: "Tom Cruise", title: "Founder & Chairman" },
          { image: image3, name: "Emma Watson", title: "Managing Director" },
          { image: image4, name: "Will Smith", title: "Product Designer" },
        ].map(({ image, name, title }, index) => (
          <div key={index} className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg max-w-xs mx-auto my-3">
            <Image 
              src={image} 
              alt={name} 
              width={200} 
              height={200} 
              className="w-full h-48 object-cover rounded-full border-2 border-gray-300" 
            />
            <p className="mt-2 font-bold">{name}</p>
            <p className="text-gray-600">{title}</p>
          </div>
        ))}
      </div>

      {/* Additional Information Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {[
          { title: "FREE AND FAST DELIVERY", description: "Free delivery for all orders over $140" },
          { title: "24/7 CUSTOMER SERVICE", description: "Friendly 24/7 customer support" },
          { title: "MONEY BACK GUARANTEE", description: "We return money within 30 days" },
        ].map(({ title, description }, index) => (
          <div key={index} className="flex flex-col items-center p-4 bg-gray-800 border-2 border-gray-300 rounded-lg max-w-xs mx-auto my-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 mb-3">
              <span className="text-white text-2xl">💰</span>
            </div>
            <h2 className="text-white text-xl font-semibold text-center">{title}</h2>
            <p className="text-white text-sm text-center">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
