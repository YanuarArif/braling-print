import { NavbarUi } from "@/components/shadcnblocks-com-navbar1";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full shadow-md z-50 bg-white dark:bg-black">
      <NavbarUi />
    </nav>
  );
};

export default Navbar;
