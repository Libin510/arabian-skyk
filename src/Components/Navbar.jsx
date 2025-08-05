"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // useEffect(() => {
  //   console.log("Current route:", pathname);
  // }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  return (
    <nav className={` py-2 absolute top-0 left-0 right-0 z-50 ${pathname == "/" ? "py-5 bg-transparent" : ""}`}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-2 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            {/* Logo - you can replace this with your actual logo */}
            <div className="p-2 rounded">
              <img
                src="./arabianskylogo.png"
                className="w-[100px] h-[30px] lg:h-[40px] lg:w-[150px]"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
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
        <div className="hidden lg:block">
          <Link href="/contact">
            <button className="bg-[#01016F] hover:bg-blue-900 text-white px-6 py-2 rounded font-medium transition-colors">
              CONTACT
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-blue-600 p-2"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden mt-4 pb-4 border-t bg-white border-gray-200 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-2 pt-4">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-gray-50 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-gray-50 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-gray-50 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/careers"
            className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-gray-50 transition-colors"
          >
            Careers
          </Link>
          <Link href="/contact">
            <button className="bg-[#01016F] hover:bg-blue-900 text-white px-6 py-2 rounded font-medium transition-colors mt-2 w-full">
              CONTACT
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}