import React from "react";
import ThemeSwitcher from "./theme-switcher";
import Carousel from "./small-comp/carousel";
import CategoryCarousel from "./small-comp/category-carousel1";
import { categories, items } from "../data/carousel-index";

const HalamanDepan = () => {
  return (
    <main className="flex flex-col gap-6 h-full">
      <div className="absolute bottom-5 left-5">
        <ThemeSwitcher />
      </div>
      <section className="container my-3 mt-5">
        <Carousel />
      </section>
      <section className="container my-3">
        <CategoryCarousel categories={categories} items={items} />
      </section>
      <section className="container my-3">
        <p>Section selanjutnya</p>
      </section>
    </main>
  );
};

export default HalamanDepan;
