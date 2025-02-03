"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
}
const CategoryCarousel = ({ categories, items }: CategoryCarouselProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);
  const filteredItems = selectedCategoryId
    ? items.filter((item) => item.categoryId === selectedCategoryId)
    : items;
  const toggleAccordion = (categoryId: number) => {
    setActiveAccordion(activeAccordion === categoryId ? null : categoryId);
  };
  if (!mounted) {
    return <div className="mt-8" />;
  }
  if (isMobile) {
    return (
      <div className="mt-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="mb-4 border border-gray-200 dark:border-gray-700 rounded"
          >
            <button
              onClick={() => toggleAccordion(category.id)}
              className={`flex items-center justify-between w-full px-4 py-3 text-left font-medium
                          bg-gray-100 dark:bg-gray-800 dark:text-white
                          hover:bg-gray-50 dark:hover:bg-gray-700
                          ${activeAccordion === category.id ? "bg-gray-100 dark:bg-gray-800" : ""}`}
            >
              <span>{category.name}</span>
              <span>{activeAccordion === category.id ? "-" : "+"}</span>
            </button>
            {activeAccordion === category.id && (
              <div className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  {items
                    .filter((item) => item.categoryId === category.id)
                    .map((item) => (
                      <div key={item.id}>
                        <div className="relative group overflow-hidden rounded-lg shadow-md dark:shadow-none">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={300}
                            height={200}
                            className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="mt-2 text-center">{item.title}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-start md:justify-center space-x-2 md:space-x-4 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`px-3 md:px-4 py-2 rounded-md font-medium whitespace-nowrap text-sm md:text-base
              bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-colors
              ${selectedCategoryId === category.id ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-white" : ""}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
        This is description under category button in desktop view.
      </p>
      <div className="relative">
        <button
          id="custom-prev"
          className="absolute top-1/2 -left-0 transform -translate-y-1/2 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-500 transition-colors"
        >
          <FaArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-white" />
        </button>
        <button
          id="custom-next"
          className="absolute top-1/2 -right-0 transform -translate-y-1/2 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-500 transition-colors"
        >
          <FaArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-white" />
        </button>
        <div className="mx-16">
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: "#custom-next",
              prevEl: "#custom-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
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
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {!isMobile && ( // Conditionally render overlay title only in desktop mode
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded">
                      {item.title}
                    </div>
                  )}
                </div>
                {isMobile && ( // Conditionally render title below image only in mobile mode
                  <div className="mt-2 text-center">{item.title}</div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default CategoryCarousel;
