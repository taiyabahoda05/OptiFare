import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <nav className="min-h-15 bg-gray-100 flex flex-col sm:flex-row justify-between items-center gap-2 px-3 py-2 sm:px-5 shadow-md">
        <div className="flex items-center gap-1">
          <Image
            src="/logo.png"
            alt="OptiFare Logo"
            width={50}
            height={50}
            className="h-10 w-10 sm:h-[50px] sm:w-[50px]"
          />

          <span className="font-bold text-blue-900 text-2xl sm:text-3xl md:text-4xl">
            OptiFare
          </span>
        </div>
        <ul className="w-full sm:w-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-3 md:gap-4">
          <Link href="/">
            <li className="whitespace-nowrap text-semibold text-sm text-gray-800 hover:text-blue-900 hover:transition-all duration-300 ease-in-out hover:scale-110 hover:underline hover:font-bold">
              Home
            </li>
          </Link>
          <Link href="/compare">
            <li className="whitespace-nowrap text-semibold text-sm text-gray-800 hover:text-blue-900 hover:transition-all duration-300 ease-in-out hover:scale-110 hover:underline hover:font-bold">
              Compare
            </li>
          </Link>
          <Link href="/about">
            <li className="whitespace-nowrap text-semibold text-sm text-gray-800 hover:text-blue-900 hover:transition-all duration-300 ease-in-out hover:scale-110 hover:underline hover:font-bold">
              How it works
            </li>
          </Link>
          <Link href="/contact">
            <li className="whitespace-nowrap text-semibold text-sm text-gray-800 hover:text-blue-900 hover:transition-all duration-300 ease-in-out hover:scale-110 hover:underline hover:font-bold">
              Contact
            </li>
          </Link>

          <Link href="/compare">
            <button className="whitespace-nowrap text-sm rounded-lg bg-blue-900 text-white px-4 py-1 hover:bg-blue-800 transition-colors duration-300 ease-in-out hover:scale-110 cursor-pointer">
              Try Now
            </button>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
