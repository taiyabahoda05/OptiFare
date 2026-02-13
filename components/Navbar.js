import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <nav className="h-15 bg-gray-100 flex justify-between items-center px-5 shadow-md">
        <div className="flex items-center gap-1 px-5">
          <Image
            src="/logo.png"
            alt="OptiFare Logo"
            width={50}
            height={50}
          />

          <span className="font-bold text-blue-900 text-4xl">
            OptiFare
          </span>
        </div>
        <ul className="flex items-center justify-center gap-4">
          <Link href="/">
            <li className="text-semibold text-sm text-gray-800 hover:text-blue-900 hover:transition-all duration-300 ease-in-out hover:scale-110 hover:underline hover:font-bold">
              Home
            </li>
          </Link>
          <Link href="/compare">
            <li className="text-semibold text-sm text-gray-800 hover:text-blue-900 hover:transition-all duration-300 ease-in-out hover:scale-110 hover:underline hover:font-bold">
              Compare
            </li>
          </Link>
          <Link href="/about">
            <li className="text-semibold text-sm text-gray-800 hover:text-blue-900 hover:transition-all duration-300 ease-in-out hover:scale-110 hover:underline hover:font-bold">
              How it works
            </li>
          </Link>
          <Link href="/contact">
            <li className="text-semibold text-sm text-gray-800 hover:text-blue-900 hover:transition-all duration-300 ease-in-out hover:scale-110 hover:underline hover:font-bold">
              Contact
            </li>
          </Link>

          <Link href="/compare">
            <button className="text-sm rounded-lg bg-blue-900 text-white px-4 py-1 hover:bg-blue-800 transition-colors duration-300 ease-in-out hover:scale-110 cursor-pointer">
              Try Now
            </button>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
