import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

// Define interfaces for categories and carousel items
interface Category {
  id: number;
  name: string;
}

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  categoryId: number; // Represents the category this item belongs to
}

// Props for the CategoryCarousel component
interface CategoryCarouselProps {
  categories: Category[];
  items: CarouselItem[];
}

const CategoryCarousel = ({ categories, items }: CategoryCarouselProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed

  useEffect(() => {
    if (isMobile) {
      setActiveAccordion(null); // Reset accordion when switching to mobile
    }
  }, [isMobile]);

  // Filter items based on the selected category
  const filteredItems = selectedCategoryId
    ? items.filter((item) => item.categoryId === selectedCategoryId)
    : items;

  const toggleAccordion = (categoryId: number) => {
    setActiveAccordion(activeAccordion === categoryId ? null : categoryId);
  };

  if (isMobile) {
    return (
      <div className="mt-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="mb-4 border border-gray-200 rounded"
          >
            <button
              onClick={() => toggleAccordion(category.id)}
              className={`flex items-center justify-between w-full px-4 py-3 text-left font-medium ${
                activeAccordion === category.id
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <span>{category.name}</span>
              <span>{activeAccordion === category.id ? "-" : "+"}</span>
            </button>
            {activeAccordion === category.id && (
              <div className="p-4">
                <div className="flex flex-wrap justify-start gap-4">
                  {filteredItems
                    .filter((item) => item.categoryId === category.id)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4"
                      >
                        <div className="relative group overflow-hidden rounded-lg shadow-md">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={300}
                            height={200}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded">
                            {item.title}
                          </div>
                        </div>
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
    <div className="mt-8">
      {/* Category Menu */}
      <div className="flex justify-start md:justify-center space-x-2 md:space-x-4 mb-6 overflow-x-auto">
        {" "}
        {/* Adjusted space-x and justify-start on mobile */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`px-3 md:px-4 py-2 rounded-md font-medium whitespace-nowrap text-sm md:text-base ${
              /* Adjusted px and text size */
              selectedCategoryId === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow (Outside Carousel) */}
        <div className="swiper-button-prev absolute top-1/2 -left-12 transform -translate-y-1/2 z-10 text-2xl cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
          <FaArrowLeft />
        </div>

        {/* Right Arrow (Outside Carousel) */}
        <div className="swiper-button-next absolute top-1/2 -right-12 transform -translate-y-1/2 z-10 text-2xl cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
          <FaArrowRight />
        </div>

        <div className="mx-16">
          {/* Swiper Carousel */}
          <Swiper
            slidesPerView={4} // Default for larger screens
            spaceBetween={20}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 }, // Mobile: 1 slide
              640: { slidesPerView: 2 }, // Tablet: 2 slides
              1024: { slidesPerView: 3 }, // Small desktop: 3 slides
              1280: { slidesPerView: 4 }, // Large desktop: 4 slides
            }}
            className="mySwiper"
          >
            {filteredItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative group overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
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

export default CategoryCarousel;
