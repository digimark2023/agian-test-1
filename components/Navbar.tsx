import Link from "next/link";
import React from "react";

import { Oswald, Roboto_Flex } from "@next/font/google";
// const satisfy = Oswald({
//   subsets: ["latin"],
//   weight: "400",
// });
const satisfy = Roboto_Flex({
  subsets: ["latin"],
  weight: "400",
});
const Navbar = () => {
  return (
    // <nav>

    // </nav>

    <nav
      className="flex justify-between items-center w-3/4 mx-auto mt-2 border-b-2 pb-2 sm:px-4 px-2 bg-[#303289] rounded-lg h-14
  "
    >
      <div className="logo">{/* Your Logo Here */}</div>

      <div className="flex items-center mr-auto">
        {/* Removed justify-between to prevent pushing content to the edges */}
        <span className={`text-white text-xl ${satisfy.className}`}>
          VisionNest{" "}
        </span>{" "}
        {/* Apply satisfy.className to "ABC" */}
        {/* Your Logo Here */}
      </div>

      <div className={satisfy.className}>
        <ul className="flex justify-end items-center flex-1 ">
          {/* Wrap each link with <li> and apply classes for styling */}
          <Link
            className="link text-teal-50 hover:text-yellow-500 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full"
            href="/"
          >
            Home
          </Link>
          {/* <li className="mx-2">
          <Link className="link text-teal-50" href="/home2">
            Home2
          </Link>
        </li> */}
          <li className="mx-2">
            <Link
              className="link text-teal-50 hover:text-yellow-500 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full"
              href="/advisory"
            >
              Business Idea Generator
            </Link>
          </li>
          {/* <li className="mx-2">
          <Link className="link text-teal-50" href="/contact">
            Contact Us
          </Link>
        </li> */}
          <li className="mx-2">
            <Link
              className="link text-teal-50 hover:text-yellow-500 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full"
              href="/about"
            >
              About Us
            </Link>
          </li>
          {/* <li className="mx-2">
          <Link className="link text-teal-50" href="/signup">
            Signup
          </Link>
        </li> */}
          <li className="mx-2">
            <Link
              className="link text-teal-50 hover:text-yellow-500 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full"
              href="/newcontactform"
            >
              Contact
            </Link>
          </li>
          {/* 
        <li className="mx-2">
          <Link className="link text-teal-50" href="/exp">
            exp
          </Link>
        </li>
        <li className="mx-2">
          <Link className="link text-teal-50" href="/busiadv">
            Test
          </Link>
        </li> */}
        </ul>
      </div>
    </nav>

    // <div>Navbar</div>
  );
};

export default Navbar;
