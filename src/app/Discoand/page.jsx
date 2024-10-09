"use client";
import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import Image from 'next/image';
import imageone from "../../assets/disc.svg";

const Completionist = () => <span>Countdown finished!</span>;

export default function Page() {
  const totalSeconds = 60 * 60 * 24 * 100;
  const [countEndData, setCountEndData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const endCount = localStorage.getItem("countdownEndDate");
      if (endCount) {
        setCountEndData(Number(endCount));
      } else {
        const newEndDate = Date.now() + totalSeconds * 1000;
        setCountEndData(newEndDate);
        localStorage.setItem("countdownEndDate", newEndDate);
      }
    }
  }, []);

  if (countEndData === null) {
    return null; // Render nothing until countEndData is set
  }

  return (
    <div className="bg-black p-10 mt-5 mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center">
          <h2 className="font-semibold text-green-500">Categories</h2>
          <h1 className="font-semibold text-2xl md:text-4xl text-white">
            Enhance Your Music Experience
          </h1>
          <Countdown
            date={countEndData}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              if (completed) {
                return <Completionist />;
              } else {
                return (
                  <div className="flex gap-2 mt-5">
                    {[{ label: "days", value: days }, { label: "hours", value: hours }, { label: "minutes", value: minutes }, { label: "seconds", value: seconds }].map(
                      ({ label, value }) => (
                        <div
                          key={label}
                          className="text-center bg-white p-3 rounded-md flex-1 min-w-[60px]"
                        >
                          <p className="font-semibold text-2xl text-black">{value}</p>
                          <p className="font-normal text-xs text-black">{label}</p>
                        </div>
                      )
                    )}
                  </div>
                );
              }
            }}
          />
        </div>
        <div className="relative w-full h-52 md:h-96 bg-center bg-cover"
          style={{ backgroundImage: `url(${imageone.src})` }}>
          {/* محتوى العمود الثاني هنا إذا لزم الأمر */}
        </div>
      </div>
    </div>
  );
}
