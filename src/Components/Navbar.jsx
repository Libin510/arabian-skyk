"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

export default function Navbar() {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <nav className={`py-2 absolute top-0 left-0 right-0 z-50 ${pathname === "/" ? "py-5 bg-white" : ""}`}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-2 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded">
            <img
              src="./arabianskylogo.png"
              className="w-[100px] h-[30px] lg:h-[40px] lg:w-[150px]"
              alt="Logo"
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                router.push(link.path, {
                  onTransitionReady: pageAnimation,
                });
              }}
              className="text-gray-700 hover:text-[#01016F] font-bold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Contact Button Desktop */}
        <div className="hidden lg:block">
          <Link href="/contact">
            <button className="bg-[#01016F] hover:bg-blue-900 text-white px-6 py-2 rounded font-medium transition-colors">
              CONTACT
            </button>
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-blue-600 p-2"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden mt-4 pb-4 border-t bg-white border-gray-200 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-2 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                router.push(link.path, {
                  onTransitionReady: pageAnimation,
                });
              }}
              className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-gray-50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
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
const pageAnimation = () => {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        transform: "translateY(0)",
      },
      {
        opacity: 0.5,
        scale: 0.9,
        transform: "translateY(-100px)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        transform: "translateY(100%)",
      },
      {
        transform: "translateY(0)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};