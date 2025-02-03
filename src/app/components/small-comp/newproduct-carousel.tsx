"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
}

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  categoryId: number;
}

interface CategoryCarouselProps {
  categories: Category[];
  items: CarouselItem[];
  categoryIdToShow: number; // Changed to single number and renamed
}

const NewProductCarousel = ({
  categories,
  items,
  categoryIdToShow, // Changed prop name here
}: CategoryCarouselProps) => {
  const filteredItems = items.filter(
    (item) => item.categoryId === categoryIdToShow // Direct comparison
  );

  return (
    <div className="">
      <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
        This is description under category button in desktop view.
      </p>
      <div className="relative">
        <div className="mx-auto">
          <Swiper
            slidesPerView={4.5}
            spaceBetween={20}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
            }}
            className="mySwiper"
          >
            {filteredItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative group overflow-hidden rounded-lg shadow-md dark:shadow-none">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={800}
                    className="w-full h-[30rem] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded">
                    {item.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewProductCarousel;
