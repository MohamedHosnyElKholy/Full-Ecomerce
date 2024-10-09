import React from 'react';
import Image from 'next/image';
import imageone from "../../assets/one (1).png";
import imagetwo from "../../assets/one (2).png";
import imagethree from "../../assets/one (3).png";
import imagefour from "../../assets/one (4).png";

export default function Page() {
  return (
    <div className="container mx-auto p-5">
      <div className="font-semibold text-red-600 mb-2">
        Featured
      </div>

      <div className="flex flex-col sm:flex-row items-center mt-5 gap-5">
        <h2 className="font-semibold text-3xl text-black">New Arrival</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
        <div>
          <Image 
            src={imagetwo} 
            alt="Image Two" 
            width={500} // قم بتحديد العرض
            height={300} // قم بتحديد الارتفاع
            className="w-full h-full rounded-none" 
          />
        </div>

        <div>
          <Image 
            src={imageone} 
            alt="Image One" 
            width={500} // قم بتحديد العرض
            height={300} // قم بتحديد الارتفاع
            className="w-full h-1/2 rounded-none" 
          />

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <Image 
                src={imagethree} 
                alt="Image Three" 
                width={250} // قم بتحديد العرض
                height={200} // قم بتحديد الارتفاع
                className="w-full h-full rounded-none" 
              />
            </div>
            <div>
              <Image 
                src={imagefour} 
                alt="Image Four" 
                width={250} // قم بتحديد العرض
                height={200} // قم بتحديد الارتفاع
                className="w-full h-full rounded-none" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid for icons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 text-center">
        {[
          {
            icon: <i className="fas fa-truck text-white text-5xl"></i>,
            title: "FREE AND FAST DELIVERY",
            subtitle: "Free delivery for all orders over $140",
          },
          {
            icon: <i className="fas fa-headset text-white text-5xl"></i>,
            title: "24/7 CUSTOMER SERVICE",
            subtitle: "Friendly 24/7 customer support",
          },
          {
            icon: <i className="fas fa-check-circle text-white text-5xl"></i>,
            title: "MONEY BACK GUARANTEE",
            subtitle: "We return money within 30 days",
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center p-4 bg-black border-2 border-gray-300 rounded-lg max-w-xs mx-auto">
            <div className="mb-4 p-2 bg-red-600 rounded-full">
              {item.icon}
            </div>
            <h3 className="text-white font-bold">{item.title}</h3>
            <p className="text-white">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
