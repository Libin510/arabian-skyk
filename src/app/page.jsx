"use client";
import { LuArrowUpRight, LuFuel } from "react-icons/lu";
import TruckWrapper from "../Components/TruckWapper";
import { IoIosArrowForward } from "react-icons/io";
import { PiHardHat } from "react-icons/pi";
import { PiBridge } from "react-icons/pi";
import { PiShieldPlus } from "react-icons/pi";

import { Instrument_Sans } from "next/font/google";
import Footer from "@/Components/Footer";
import TruckWrapper1 from "@/Components/TruckWapper1";
import { useEffect, useRef, useState } from "react";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

export default function Home() {
  const services = [
    {
      id: "01",
      title: "HEAVY HAULAGE & PROJECT LOGISTICS",
      gradient: "from-blue-600 to-purple-600",
      pattern: "geometric",
    },
    {
      id: "02",
      title: "CUSTOMS CLEARANCE",
      gradient: "from-emerald-500 to-teal-600",
      pattern: "dots",
    },
    {
      id: "03",
      title: "FLEET MAINTENANCE & ROADSIDE SUPPORT",
      gradient: "from-orange-500 to-red-600",
      pattern: "waves",
    },
  ];

  const features = [
    { title: "RELIABILITY. EXPERIENCE. SCALE.", showPopup: true },
    {
      title: "OVER 25 YEARS OF OPERATION",
      showPopup: true,
    },
    { title: "100+ FLEET VEHICLES" },
    { title: "OPERATES ACROSS THE GCC" },
    { title: "24/7 OPERATIONAL SUPPORT", showPopup: true },
  ];

  const industries = [
    {
      icon: <LuFuel />,
      title: "OIL & GAS",
      bgColor: "bg-[#01016F]",
    },
    {
      icon: <PiHardHat />,
      title: "CONSTRUCTION",
      bgColor: "bg-[#1E1E1E]",
    },
    {
      icon: <PiBridge />,
      title: "INFRASTRUCTURE",
      bgColor: "bg-[#1E1E1E]",
    },
    {
      icon: <PiShieldPlus />,
      title: "GOVERNMENT & DEFENSE",
      bgColor: "bg-[#1E1E1E]",
    },
  ];

  const [visibleCards, setVisibleCards] = useState(2);
  const [truckStopped, setTruckStopped] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef(null);

  // Callback for TruckWrapper1 to notify when truck stops
  const handleTruckStopped = () => {
    setTruckStopped(true);
    // Show the third card after truck stops
    setTimeout(() => {
      setVisibleCards(3);
    }, 500);
  };

  // Enhanced scroll speed calculation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      // Calculate speed based on scroll velocity (more responsive)
      const baseSpeed = 1;
      const speedMultiplier = Math.min(scrollDelta * 0.1, 3); // Cap at 4x speed
      const newSpeed = baseSpeed + speedMultiplier;

      setScrollSpeed(newSpeed);
      setLastScrollY(currentScrollY);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Reset speed after scroll stops (shorter delay for more responsiveness)
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollSpeed(baseSpeed);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  return (
    <div className="min-h-screen ">
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes slideRightToLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes floatUp {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(239, 30, 36, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(239, 30, 36, 0.6);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .gradient-animate {
          animation: gradientShift 8s ease infinite;
        }

        .slide-text {
          animation: slideRightToLeft var(--animation-duration, 15s) linear
            infinite;
        }

        .float-animation {
          animation: floatUp 3s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .gradient-animate {
          background: linear-gradient(
            90deg,
            #01016f 0%,
            #0202d5 16.66%,
            #4338ca 33.33%,
            #6366f1 50%,
            #8b5cf6 66.66%,
            #a78bfa 83.33%,
            #01016f 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .delay-1500 {
          animation-delay: 1500ms;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .smooth-bounce {
          animation: floatUp 2s ease-in-out infinite;
        }

        .service-card {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.6s ease-out;
        }

        .service-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Section with Video Background */}
      <section className="relative h-[100vh] overflow-hidden ">
        {/* Hero Content */}
        <div className="relative flex items-center justify-between px-4  h-full">
          {/* Gradient background div behind */}
          {/* <div
            className="bg-gradient-to-r from-[#1131A6] to-[#F70105] h-[2800px] w-[670px] rotate-[67deg] absolute z-0"
            style={{ right: "-130px", marginTop: "180px" }}
          ></div> */}
          <div
            className="absolute z-0 h-[2800px] w-[670px] rotate-[67deg] bg-white overflow-hidden"
            style={{ right: "-130px", marginTop: "180px" }}
          >
            <div className="h-full w-full bg-gradient-to-r from-[#1131A6] to-[#F70105] animate-gradientReveal"></div>
          </div>

          {/* Content Card above */}
          <div className="relative ">
            <div className=" relative z-10 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-semibold uppercase leading-tight">
                <span className="block">Arabian Sky</span>
                <span className="block text-5xl sm:text-6xl font-extrabold mt-1">
                  Transport
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base font-medium text-black tracking-tight capitalize max-w-xl">
                Powering the UAE and GCC with professional, scalable, and
                time-critical logistics solutions for over 25 years.
              </p>
            </div>

            <div className="  w-[100%] text-right">
              {/* Box with video background */}
              <p className="inline-block text-white font-bold text-xl uppercase bg-[#01016F]  px-4 py-2 rounded-tr-lg ">
                <span className="text-red-500 text-xl">*</span> THE WHEELS OF
                RELIABILITY
              </p>
              <div className="relative h-[400px] w-[1430px]  rounded-b-lg rounded-l-lg overflow-hidden z-20">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover z-10"
                >
                  <source src="/Truck Logo Reveal.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Optional overlay or content inside the video box */}
                <div className="relative z-20 w-full h-full"></div>
              </div>
              <div className="relative w-fit z-10 bg-[#01016F] text-white rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                {/* Left Text */}
                <h3 className="text-white font-semibold text-sm sm:text-base leading-tight text-center sm:text-left">
                  We Have All Kinds Of Solution{" "}
                  <br className="hidden sm:block" />
                  To Deliver Your Goods
                </h3>

                {/* Right Button */}
                <button className="bg-white text-[#01016F] flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
                  Get a free quote
                  <span className="text-[#01016F] text-lg">
                    <LuArrowUpRight />
                  </span>
                </button>
              </div>
              {/* Content */}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[45px] 3xl:text-[60px] text-[#01016F] font-semibold text-center mb-8 sm:mb-10 lg:mb-12 fade-in-up">
            ABOUT <span className="text-[#EF1E24]">US</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left side - Image placeholder */}
            <div className="bg-[#999999] h-48 sm:h-56 lg:h-64 rounded-xl flex items-center justify-center order-2 lg:order-1 hover-lift">
              <span className="text-white text-sm sm:text-lg">
                Image Placeholder
              </span>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 fade-in-up delay-300">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#000000] mb-3 sm:mb-4">
                <span className="text-[#01016F]">Our</span> Story
              </h3>
              <p className="text-[#000000] mb-4 sm:mb-6 font-medium leading-relaxed text-sm sm:text-base">
                Driving the Region Since 1998 We are one of the UAE's leading
                logistics and transport providers, with a reputation built on
                precision, safety, and customer-first service.
              </p>
              <button className="bg-[#01016F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-blue-800 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                Know more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white pb-8 w-screen sm:pb-12 lg:pb-16">
        <div className="mx-auto w-screen px-4 sm:px-6 lg:px-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#01016F] font-bold text-center mb-8 sm:mb-10 lg:mb-12 fade-in-up">
            OUR <span className="text-red-500">SERVICES</span>
          </h2>
<TruckWrapper className="w-screen" />
          <div className="text-center mb-6 sm:mb-8 fade-in-up delay-200">
            <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-4">
              As Logistics Service Providers, We Offer A Wide Range Of Services
              To Support To Meet The Diverse Logistics Needs Of Businesses
              Across The UAE And GCC.
            </p>
          </div>

          {/* Service Items */}
          <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:gap-12">
              {/* Service Cards */}
              {services.slice(0, visibleCards).map((items, index) => (
                <div
                  key={index}
                  className={`service-card ${
                    index < visibleCards ? "visible" : ""
                  } flex flex-col lg:flex-row items-center gap-6 lg:gap-8`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Service Content */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg underline">
                        {index + 1}. {items.title}
                      </h3>
                      <div className="w-full max-w-[400px] h-[150px] sm:h-[180px] lg:h-[200px] bg-gray-300 rounded flex items-center justify-center hover-lift">
                        <span className="text-xs text-gray-600">
                          Service Image
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Truck Animation for first card */}
                  {index === 0 && (
                    <div className="flex items-center justify-center flex-1 w-full lg:w-auto">
                      <TruckWrapper1 onTruckStopped={handleTruckStopped} />
                    </div>
                  )}

                  {/* Circular Explore Button for second card */}
                  {index === 1 && (
                    <div className="flex items-center justify-center lg:mx-auto p-4 sm:p-6 lg:p-8">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-[#01016F] rounded-full flex items-center justify-center group hover:scale-110 transition-all duration-300 cursor-pointer pulse-glow">
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 128 128"
                        >
                          <defs>
                            <path
                              id={`circle-path-${index}`}
                              d="M 64, 64 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                            />
                          </defs>
                          <text className="fill-white text-sm sm:text-lg lg:text-xl font-normal tracking-wider">
                            <textPath
                              href={`#circle-path-${index}`}
                              startOffset="0%"
                            >
                              Explore More • Explore More •
                            </textPath>
                          </text>
                        </svg>
                        <div className="bg-white rounded-full p-1.5 sm:p-2 z-10 group-hover:rotate-45 transition-transform duration-300">
                          <LuArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#000000]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Header Section with Background Text */}
      <div className="w-full">
        <div className="relative h-[200px] sm:h-[250px] lg:h-[290px] overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 gradient-animate"></div>

          {/* Large Background Text - Enhanced with proper scroll speed */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="whitespace-nowrap">
              <h1
                className={`${instrumentSans.variable} font-sans slide-text text-[80px] sm:text-[150px] md:text-[200px] lg:text-[250px] xl:text-[300px] font-bold text-[#EF1E2480] opacity-70 tracking-wider select-none`}
                style={{
                  "--animation-duration": `${35 / scrollSpeed}s`,
                }}
              >
                ARABIANS • ARABIANS • ARABIANS
              </h1>
            </div>
          </div>

          {/* Overlay Cards - Enhanced with better animations */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-40 max-w-full">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`bg-gray-400 bg-opacity-80 backdrop-blur-sm rounded-lg w-[120px] h-[80px] sm:w-[180px] sm:h-[100px] lg:w-[220px] lg:h-[120px] xl:w-[250px] shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer float-animation delay-${
                    index * 100
                  }`}
                  style={{ animationDelay: `${index * 300}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* White Section Below */}
        <div className="h-8 sm:h-12 lg:h-16 bg-white"></div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 tracking-tight fade-in-up">
            WHY CHOOSE <span className="text-red-500">US</span>
          </h2>

          <div className="relative">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group flex items-center justify-between py-4 sm:py-5 lg:py-6 ${
                  index !== features.length - 1
                    ? "border-b border-gray-200"
                    : ""
                } relative fade-in-up delay-${index * 100}`}
              >
                {/* Title */}
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-black uppercase tracking-wide z-10 pr-4 transition-colors duration-300 group-hover:text-[#01016F]">
                  {feature.title}
                </h3>

                {/* Arrow style changes on hover */}
                <div className="z-10 flex-shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:hidden transition-all duration-300">
                    <LuArrowUpRight className="w-full h-full" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#01016F] rounded-full hidden group-hover:flex items-center justify-center transition-all duration-300 scale-in">
                    <LuArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>

                {/* Center popup box on hover - Enhanced */}
                {feature.showPopup && (
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden sm:block">
                    <div className="w-48 h-64 sm:w-56 sm:h-72 lg:w-64 lg:h-80 rounded-lg bg-gray-400 shadow-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 fade-in-up">
            INDUSTRIES WE <span className="text-red-500">SERVE</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`${
                  industry.bgColor
                } flex gap-3 sm:gap-4 items-center text-white p-3 sm:p-4 lg:p-2 rounded-lg w-full max-w-xs lg:max-w-none hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer fade-in-up delay-${
                  index * 100
                }`}
              >
                <div className="bg-white size-10 sm:size-11 rounded-[8px] flex justify-center text-black items-center text-xl sm:text-2xl flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                  {industry.icon}
                </div>
                <span className="text-xs sm:text-sm font-semibold flex-1 text-center lg:text-left">
                  {industry.title}
                </span>
                <span className="text-sm font-medium flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300">
                  <IoIosArrowForward />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
