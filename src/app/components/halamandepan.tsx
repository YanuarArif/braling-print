import React from "react";
import ThemeSwitcher from "./theme-switcher";
import Carousel from "./small-comp/carousel";

const HalamanDepan = () => {
  return (
    <main className="flex mx-10 lg:mx-20 my-10">
      <div className="absolute bottom-5 left-5">
        <ThemeSwitcher />
      </div>
      <div className="w-full ">
        <Carousel />
      </div>
    </main>
  );
};

export default HalamanDepan;
