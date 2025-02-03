import React from "react";
import ThemeSwitcher from "./theme-switcher";
import Carousel from "./small-comp/carousel";
import CategoryCarousel from "./small-comp/category-carousel";
import { categories, items } from "../data/carousel-index";
import NewProductCarousel from "./small-comp/newproduct-carousel";
import Footer from "./footer";

const HalamanDepan = () => {
  return (
    <main className="flex flex-col gap-6 h-full">
      {/* <div className="absolute bottom-5 left-5">
        <ThemeSwitcher />
      </div> */}
      <section className="container my-3 mt-5">
        <Carousel />
      </section>
      <section className="container my-3">
        <CategoryCarousel categories={categories} items={items} />
      </section>
      <section className="flex flex-col container my-3">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center">
          Produk Baru
        </h1>
        <NewProductCarousel
          categories={categories}
          items={items}
          categoryIdToShow={4}
        />
      </section>
      <section className="container my-3">
        <p>Section selanjutnya</p>
      </section>
      <Footer />
    </main>
  );
};

export default HalamanDepan;
