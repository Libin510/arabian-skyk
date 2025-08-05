"use client";
import { LuArrowUpRight, LuFuel } from "react-icons/lu";
import TruckWrapper from "../Components/TruckWapper";
import { IoIosArrowForward } from "react-icons/io";
import { PiHardHat } from "react-icons/pi";
import { PiBridge } from "react-icons/pi";
import { PiShieldPlus } from "react-icons/pi";
import Image from "next/image";
import { FaStarOfLife } from "react-icons/fa6";

import { Instrument_Sans } from "next/font/google";
import Footer from "@/Components/Footer";
import { useEffect, useRef, useState } from "react";
import "./Home.css";
import ImageReveal from "@/Components/ImageReveal";
import Preloader from "@/Components/Preloader";
import TruckImage from "@/Components/TruckImage";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export default function Home() {
  const [showSmoke, setShowSmoke] = useState(false);
  const [truckArrived, setTruckArrived] = useState(false);
  // Enhanced loader states
  const [isLoading, setIsLoading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  console.log(truckArrived, "truckArrived");

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

  const [scrollSpeed, setScrollSpeed] = useState(1);

  const [isMobile, setIsMobile] = useState(false);
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // useEffect(() => {
  //   const updateDimensions = () => {
  //     if (divRef.current) {
  //       const rect = divRef.current.getBoundingClientRect();
  //       const newDimensions = {
  //         width: rect.width,
  //         height: rect.height,
  //       };

  //       // Only update if dimensions actually changed
  //       if (
  //         newDimensions.width !== dimensions.width ||
  //         newDimensions.height !== dimensions.height
  //       ) {
  //         setDimensions(newDimensions);
  //         console.log("Div dimensions changed:", newDimensions);
  //       }
  //     }
  //   };

  //   updateDimensions();

  //   // Set up resize observer for more precise tracking
  //   const resizeObserver = new ResizeObserver(updateDimensions);
  //   if (divRef.current) {
  //     resizeObserver.observe(divRef.current);
  //   }

  //   window.addEventListener("resize", updateDimensions);

  //   return () => {
  //     resizeObserver.disconnect();
  //     window.removeEventListener("resize", updateDimensions);
  //   };
  // }, [dimensions]);
  console.log(dimensions, "kkkk");

  // Hide loader when both conditions are met
  useEffect(() => {
    if (assetsLoaded && minimumTimeElapsed) {
      // Add a small delay for smooth transition
      const hideLoader = setTimeout(() => {
        setIsLoading(false);
        // Start animations after loader is hidden
        setTimeout(() => {
          setShowSmoke(true);
          window.scrollTo(0, 0);
        }, 100);
      }, 300);

      return () => clearTimeout(hideLoader);
    }
  }, [assetsLoaded, minimumTimeElapsed]);

  // Scroll restoration
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.warn("Loader forced to hide due to timeout");
        setIsLoading(false);
        setShowSmoke(true);
      }
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);
  // useEffect(() => {
  //   if (showSmoke) {
  //     const box = document.querySelector(".box");
  //     if (box) {
  //       box.classList.add("boxMove");
  //     }
  //   }
  // }, [showSmoke]);
  // Show loader while loading
  // if (isLoading) {
  //   return <Preloader />;
  // }
  // {isLoading && <Preloader />}
  return (
    <div className="w-screen relative mt-40">
      {isLoading && (
        <div className="fixed inset-0 bg-white z-[9999]">
          <Preloader />
        </div>
      )}

      <div
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Truck Container */}
        <div
          className="w-full h-[100vh] bg-white mt-5 relative"
          ref={divRef}
        >
          <div className="right_angle_triangle"></div>
          {showSmoke && (
            <TruckImage
              // dimensions={dimensions}
              setTruckArrived={(value) => setTruckArrived(value)}
            />
          )}
        </div>

        {/* Truck Arrived Content */}
        {truckArrived && (
          <div className="absolute top-5  left-1/2 transform -translate-x-1/2 w-full max-w-10/12 mx-auto z-10 px-4 sm:px-6 lg:px-8">
            {/* Title & Description */}
            <div className="relative z-10 text-left mb-4">
              <h2 className="font-bold uppercase leading-tight text-[8vw] md:text-[6vw] lg:text-[3.5vw]">
                <span className="block leading-[0.5]">Arabian Sky</span>
                <span className="block text-[10.5vw] md:text-[6.5vw] lg:text-[5vw] font-bold">
                  Transport
                </span>
              </h2>
              <p className="text-sm md:text-base lg:text-base font-semibold text-black tracking-tight capitalize max-w-[85%] md:max-w-[65%] lg:max-w-[65%]">
                Powering the UAE and GCC with professional, scalable, and
                time-critical logistics solutions for over 25 years.
              </p>
            </div>

            {/* Video Section */}
            <div className="w-full text-right pt-4">
              <div className="flex flex-col gap-2 w-full mx-auto">
                <div className="relative w-full mx-auto">
                  <p className="w-fit -mt-4 sm:-mt-8 lg:-mt-12 justify-self-end font-bold bg-[#01016F] px-3 py-2 rounded-t-lg flex items-center gap-2 text-white text-sm">
                    <FaStarOfLife className="size-[13px] lg:size-[16px] text-red-500" />
                    <span className="font-instrument-sans font-semibold text-sm lg:text-sm 2xl:text-xl">
                      THE WHEELS OF RELIABILITY
                    </span>
                  </p>

                  {/* Unified Responsive Video */}
                  <div className="relative w-full  mx-auto aspect-video overflow-hidden rounded-b-lg rounded-l-lg z-20 max-h-[200px] sm:max-h-[300px] md:max-h-[350px] lg:max-h-[250px] xl:max-h-[330px] 2xl:max-h-[330px] lg:aspect-[2.5/1] xl:aspect-[3/1]">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/truck-poster.jpg"
                      className="absolute top-0 left-0 w-full h-full object-cover z-10"
                    >
                      <source src="/Truck Logo Reveal.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="relative w-full md:max-w-[65%] lg:max-w-[60%] 2xl:max-w-[50%]">
                  <div className="bg-[#01016F] text-white rounded-lg lg:rounded-xl px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                    <h3 className="text-white font-semibold text-sm lg:text-sm 2xl:text-lg leading-tight text-center sm:text-left">
                      We Have All Kinds Of Solution{" "}
                      <br className="hidden sm:block" />
                      To Deliver Your Goods
                    </h3>

                    <button className="bg-white text-black flex items-center gap-2 font-semibold text-xs sm:text-sm lg:text-sm xl:text-sm 2xl:text-base px-3 py-2 rounded-full hover:scale-105 transition-transform">
                      Get a free quote
                      <span className="bg-[#01016F] text-white rounded-full p-2 text-base lg:text-sm 2xl:text-base">
                        <LuArrowUpRight />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Us Section - Enhanced Responsiveness */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-2">
          <section className="py-12 lg:py-40 bg-white">
            <div className="">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#01016F] font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 fade-in-up">
                ABOUT <span className="text-[#EF1E24]">US</span>
              </h2>

              <div className="flex flex-col justify-between md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-40 items-center w-full h-full">
                {/* Image placeholder - Mobile optimized */}
                <div className="bg-[#999999] w-full h-[25vh] lg:w-[50vw] lg:h-[45vh] rounded-xl flex items-center justify-center hover-lift">
                  <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg">
                    Image Placeholder
                  </span>
                </div>

                {/* Content - Mobile optimized */}
                <div className="order-1 lg:order-2 fade-in-up delay-300 text-left w-full lg:w-[50%]">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#000000] mb-3 sm:mb-4">
                    <span className="text-[#01016F]">Our</span> Story
                  </h3>
                  <p className="text-[#000000] mb-4 sm:mb-6 font-medium leading-relaxed text-sm sm:text-base lg:mx-0">
                    Driving the Region Since 1998 We are one of the UAE's
                    leading logistics and transport providers, with a reputation
                    built on precision, safety, and customer-first service.
                  </p>
                  <button className="bg-[#01016F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-blue-800 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    Know more
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Services Section - Mobile Responsive Layout */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-2">
          <section className="bg-white py-8 lg:py-20">
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#01016F] font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 fade-in-up">
                OUR <span className="text-red-500">SERVICES</span>
              </h2>
              {/* <TruckWrapper className="w-full" /> */}
              <div className="text-center mb-4 sm:mb-6 md:mb-8 fade-in-up delay-200 px-4">
                <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
                  As Logistics Service Providers, We Offer A Wide Range Of
                  Services To Support To Meet The Diverse Logistics Needs Of
                  Businesses Across The UAE And GCC.
                </p>
              </div>

              {/* Services - Mobile First Approach */}
              <div className="py-6 sm:py-8 md:py-12 lg:py-16 relative">
                {/* Mobile Layout */}
                <div className="block md:hidden scrollbar-hide">
                  <div className="space-y-6 sm:space-y-8">
                    {services.map((item, index) => (
                      <div key={index} className="text-center">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-3 sm:mb-4">
                          {index + 1}. {item.title}
                        </h3>
                        <div className="w-full h-[23vh] bg-gray-300 rounded flex items-center justify-center mx-auto hover-lift">
                          <span className="text-xs text-gray-600">
                            Service Image
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Explore Button */}
                  <div className="flex justify-center mt-8">
                    <div className="relative w-20 h-20 bg-[#01016F] rounded-full flex items-center justify-center group hover:scale-110 transition-all duration-300 cursor-pointer pulse-glow">
                      <svg
                        className="absolute inset-0 w-full h-full spin-slow"
                        viewBox="0 0 128 128"
                      >
                        <defs>
                          <path
                            id="circle-path-mobile"
                            d="M 64, 64 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                          />
                        </defs>
                        <text className="fill-white text-base font-normal tracking-wider">
                          <textPath href="#circle-path-mobile" startOffset="0%">
                            Explore • Explore •
                          </textPath>
                        </text>
                      </svg>
                      <div className="bg-white rounded-full p-1.5 z-10 group-hover:rotate-45 transition-transform duration-300">
                        <LuArrowUpRight className="text-base text-black" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                  {/* Fixed Truck and Explore Button */}
                  <div className="absolute top-0 right-0 flex flex-col gap-12 z-20">
                    <div className="sticky top-8 self-end">
                      <Image
                        src="/Truckmg.png"
                        alt="Truck"
                        width={600}
                        height={120}
                        className="justify-self-end mt-10 w-[40vw] h-[16vh] lg:w-[35vw] lg:h-[33vh]"
                      />
                    </div>

                    <div className="sticky top-32 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-40 lg:h-40 p-5 bg-[#01016F] rounded-full flex items-center justify-center group hover:scale-110 transition-all duration-300 cursor-pointer pulse-glow">
                        <svg
                          className="absolute inset-0 w-full h-full spin-slow"
                          viewBox="0 0 128 128"
                        >
                          <defs>
                            <path
                              id="circle-path-desktop"
                              d="M 64, 64 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                            />
                          </defs>
                          <text className="fill-white text-sm sm:text-lg lg:text-xl font-normal tracking-wider">
                            <textPath
                              href="#circle-path-desktop"
                              startOffset="0%"
                            >
                              Explore More • Explore More •
                            </textPath>
                          </text>
                        </svg>
                        <div className="bg-white rounded-full p-1.5 sm:p-2 z-10 group-hover:rotate-45 transition-transform duration-300">
                          <LuArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-black" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="h-[500px] overflow-y-auto pr-[400px] lg:pr-[640px] scrollbar-hide">
                    <div className="flex flex-col gap-8 lg:gap-12">
                      {services.map((item, index) => (
                        <div
                          key={index}
                          className="service-card visible grid grid-cols-1 items-center justify-center"
                        >
                          <div className="w-full">
                            <div className="flex flex-col gap-3 sm:gap-4">
                              <h3 className="font-semibold text-gray-800 text-sm lg:text-lg underline">
                                {index + 1}. {item.title}
                              </h3>
                              <div
                                className="w-[50vw] h-[35vh] lg:w-[40vw] lg:h-[45vh] bg-gray-300 rounded flex items-center justify-center hover-lift"
                                style={{ aspectRatio: "4/2" }}
                              >
                                <span className="text-xs text-gray-600">
                                  Service Image
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Background Animation Section - Mobile Optimized */}
        <div className="w-full">
          <div className="relative overflow-hidden 15vh md:25vh lg:36vh">
            <div className="absolute inset-0 gradient-animate"></div>

            {/* Responsive Background Text */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="whitespace-nowrap py-2">
                <h1
                  className={`${instrumentSans.variable} font-sans slide-text text-[40px] xs:text-[60px] sm:text-[80px] md:text-[120px] lg:text-[15vw] font-bold text-[#FFFFFF80] opacity-70 tracking-wider select-none`}
                  style={{
                    "--animation-duration": `${35 / scrollSpeed}s`,
                  }}
                >
                  ARABIAN SKY TRANSPORT
                </h1>
              </div>
            </div>

            {/* Responsive Overlay Cards */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div
                className={`grid gap-4 sm:gap-8 md:gap-12 lg:gap-20 xl:gap-40 max-w-full ${
                  isMobile ? "grid-cols-2" : "grid-cols-4"
                }`}
              >
                {[...Array(isMobile ? 2 : 4)].map((_, index) => (
                  <div
                    key={index}
                    className={`bg-gray-400 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer float-animation delay-${
                      index * 100
                    }`}
                    style={{
                      animationDelay: `${index * 300}ms`,
                      width: isMobile ? "80px" : "15vw",
                      height: isMobile ? "50px" : "18vh",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="h-4 sm:h-6 md:h-8 lg:h-12 bg-white"></div>
        </div>

        {/* Why Choose Us Section - Enhanced Mobile */}
        {/* <div className="max-w-screen-2xl mx-auto px-2">
       <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 tracking-tight fade-in-up">
              WHY CHOOSE <span className="text-red-500">US</span>
            </h2>

            <div className="relative">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group flex items-center justify-between py-3 sm:py-4 md:py-5 lg:py-6 ${
                    index !== features.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } relative fade-in-up delay-${index * 100}`}
                >
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-black uppercase tracking-wide z-10 pr-4 transition-colors duration-300 group-hover:text-[#01016F] flex-1">
                    {feature.title}
                  </h3>

                  <div className="z-10 flex-shrink-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black group-hover:hidden transition-all duration-300">
                      <LuArrowUpRight className="w-full h-full" />
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#01016F] rounded-full hidden group-hover:flex items-center justify-center transition-all duration-300 scale-in">
                      <LuArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>

                
                  {feature.showPopup && (
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:block">
                      <div
                        className="rounded-lg bg-gray-400 shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                        style={{
                          width: isMobile ? "150px" : "200px",
                          height: isMobile ? "180px" : "250px",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
       </div> */}

        {/* Industries Section - Responsive Grid */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 tracking-tight fade-in-up">
            WHY CHOOSE <span className="text-red-500">US</span>
          </h2>
          <ImageReveal />
        </div>

        {/* Industries We Serve Section */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-2">
          <section className="py-8 sm:py-12 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 fade-in-up">
                INDUSTRIES WE <span className="text-red-500">SERVE</span>
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
                {industries.map((industry, index) => (
                  <div
                    key={index}
                    className={`${
                      industry.bgColor
                    } flex gap-3 lg:gap-4 items-center text-white p-2 rounded-lg w-full hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer fade-in-up delay-${
                      index * 100
                    }`}
                    // style={{ minHeight: "60px" }} // Reserve space to prevent CLS
                  >
                    <div className="bg-white size-8 sm:size-11 rounded flex justify-center text-black items-center text-sm lg:text-2xl hover:rotate-12 transition-transform duration-300">
                      {industry.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold flex-1 text-left">
                      {industry.title}
                    </span>
                    {/* <span className="text-sm font-medium flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300">
                      <IoIosArrowForward />
                    </span> */}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-2">
          <Footer />
        </div>
      </div>
    </div>
  );
}
