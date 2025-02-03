import React from "react";
import ThemeSwitcher from "./theme-switcher";
import Carousel from "./small-comp/carousel";
import CategoryCarousel from "./small-comp/category-carousel";
import { categories, items } from "../data/carousel-index";

const HalamanDepan = () => {
  return (
    <main className="flex flex-col my-10 gap-6 h-full">
      <div className="absolute bottom-5 left-5">
        <ThemeSwitcher />
      </div>
      <section className="container z-10">
        <Carousel />
      </section>
      <section className="container">
        <CategoryCarousel categories={categories} items={items} />
      </section>
    </main>
  );
};

export default HalamanDepan;
