"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // useEffect(() => {
  //   console.log("Current route:", pathname);
  // }, [pathname]);
  
  return (
    <nav className={`bg-gray-100 px-6 py-2 m-[47px] rounded-2xl top-0 left-0 right-0 z-50 shadow-sm ${pathname == "/" ? "fixed" : ""}`}>
      <div className="max-w-78xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            {/* Logo - you can replace this with your actual logo */}
            <div className="p-2 rounded">
              <img
                src="./arabianskylogo.png"
                className="h-[57px] w-[210px]"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-bold transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 font-bold transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="text-gray-700 hover:text-blue-600 font-bold transition-colors"
          >
            Services
          </Link>
          <Link
            href="/careers"
            className="text-gray-700 hover:text-blue-600 font-bold transition-colors"
          >
            Careers
          </Link>
        </div>

        {/* Contact Button */}
        <div className="hidden md:block">
          <Link href="/contact">
            <button className="bg-[#01016F] hover:bg-blue-900 text-white px-6 py-2 rounded font-medium transition-colors">
              CONTACT
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-blue-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (you can add state management to show/hide this) */}
      <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
        <div className="flex flex-col space-y-2 pt-4">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium py-2"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 font-medium py-2"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="text-gray-700 hover:text-blue-600 font-medium py-2"
          >
            Services
          </Link>
          <Link
            href="/careers"
            className="text-gray-700 hover:text-blue-600 font-medium py-2"
          >
            Careers
          </Link>
          <Link href="/contact">
            <button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded font-medium transition-colors mt-2 w-full">
              CONTACT
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
