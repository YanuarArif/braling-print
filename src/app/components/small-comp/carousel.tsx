"use client";

import { useState, useEffect } from "react";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { title: "Custom", color: "bg-blue-500" },
    { title: "Hard Box", color: "bg-green-500" },
    { title: "Kilk Clean", color: "bg-yellow-500" },
    { title: "Go", color: "bg-red-500" },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [items.length]);

  return (
    <div className="w-full p-4 md:p-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl md:rounded-3xl">
      <div className="flex flex-col md:flex-row md:items-end">
        {" "}
        {/* Ubah items-center md:items-start menjadi md:items-end */}
        {/* Text Section - Stacked above on mobile, bottom aligned on desktop */}
        <div className="w-full md:w-1/4 pr-0 md:pr-8 text-gray-700 mb-6 md:mb-2 text-center md:text-left">
          {" "}
          {/* Tetap mb-6 untuk mobile, hapus md:mb-0 */}
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
            Pilih Jenis Produk
          </h2>
          <p className="text-xs md:text-sm">
            Telusuri berbagai pilihan produk kami. Klik pada tombol di bawah
            untuk melihat detail setiap jenis.
          </p>
        </div>
        {/* Carousel Container - Full width on mobile */}
        <div className="w-full md:w-3/4 relative h-64 md:h-96">
          {/* Main Carousel Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`${items[activeIndex].color} w-full h-full rounded-xl md:rounded-2xl transition-all duration-500 transform scale-95 hover:scale-100`}
            >
              <div className="flex items-center justify-center h-full text-white text-lg md:text-2xl p-4">
                {items[activeIndex].title} Content
              </div>
            </div>
          </div>

          {/* Horizontal Navigation - Adjusted for mobile */}
          <div className="absolute left-0 right-0 bottom-2 md:bottom-4 flex justify-center space-x-2 md:space-x-4 pb-2">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-lg md:rounded-xl transition-all duration-300 text-xs md:text-sm ${
                  activeIndex === index
                    ? `${item.color} text-white scale-110 shadow-md md:shadow-xl`
                    : "bg-gray-100 hover:bg-gray-200 scale-100 text-gray-700"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
