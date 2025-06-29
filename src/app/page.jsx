"use client";
import { LuArrowUpRight, LuFuel } from "react-icons/lu";
import TruckWrapper from "../Components/TruckWapper";
import { IoIosArrowForward } from "react-icons/io";
import { PiHardHat } from "react-icons/pi";
import { PiBridge } from "react-icons/pi";
import { PiShieldPlus } from "react-icons/pi";

import { Instrument_Sans } from "next/font/google";
import Footer from "@/Components/Footer";
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
    { title: "RELIABILITY. EXPERIENCE. SCALE.", howPopup: true },
    {
      title: "OVER 25 YEARS OF OPERATION",
      showPopup: true,
    },
    { title: "100+ FLEET VEHICLES" },
    { title: "OPERATES ACROSS THE GCC" },
    { title: "24/7 OPERATIONAL SUPPORT", howPopup: true },
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

  return (
    <div className="min-h-screen bg-gray-100 p-1 sm:p-2">
      {/* Hero Section with Video Background */}
      <section className="relative h-[100vh] overflow-hidden rounded-b-xl sm:rounded-b-2xl">
        {/* Background Video - Contained within hero section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/Truck Logo Reveal.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-200/30 z-5" />

        {/* Hero Content */}
        <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 lg:pt-44 h-full">
          {/* Left Side Content */}
          <div className="flex-1 max-w-full lg:max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[90px] 3xl:text-[120px] font-bold leading-tight">
              <span className="text-[#01016F]">ARABIAN </span>
              <span className="text-[#EF1E24]">SKY</span>
              <br />
              <span className="text-[#01016F]">TRANSPORT</span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-[37px] text-[#000] font-semibold mb-6 sm:mb-8 lg:mb-10 mt-2 sm:mt-4">
              THE WHEELS OF RELIABILITY
            </p>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/70 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4 sm:gap-7 justify-between rounded-xl shadow-lg">
                <h3 className="text-[#000000] font-semibold mb-2 sm:mb-3 text-xs sm:text-sm leading-tight">
                  We Have All Kinds Of Solution
                  <br />
                  To Deliver Your Goods
                </h3>

                <button className="bg-[#01016F] text-white pl-3 sm:pl-4 pr-[3px] sm:pr-[4px] py-[3px] sm:py-[4px] rounded-full hover:bg-blue-800 transition-colors w-fit flex items-center space-x-2 self-end">
                  <span className="text-xs sm:text-sm font-semibold">
                    Get a free quote
                  </span>
                  <div className="size-[24px] sm:size-[28px] bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#000000] text-sm sm:text-lg">
                      <LuArrowUpRight />
                    </span>
                  </div>
                </button>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4 sm:gap-7 justify-between rounded-lg shadow-lg">
                <h3 className="text-[#000000] text-xs sm:text-sm font-semibold mb-2 sm:mb-3 leading-tight">
                  Powering the UAE and GCC with professional, scalable, and
                  time-critical logistics solutions for over 25 years.
                </h3>
                <button className="text-[#000000] font-semibold flex items-center space-x-2 self-end">
                  <span className="text-sm sm:text-lg">Explore More</span>
                  <span className="text-sm sm:text-lg">
                    <LuArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Spinning Wheel - Hidden on mobile/tablet */}
          <div className="hidden xl:flex absolute flex-1 justify-end items-center -bottom-35 -right-35">
            <img
              src="/wheel.png"
              alt="Transport Vehicle"
              className="w-60 h-60 xl:w-80 xl:h-80 object-cover rounded-full animate-spin"
              style={{ animationDuration: "20s" }}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[45px] 3xl:text-[60px] text-[#01016F] font-semibold text-center mb-8 sm:mb-10 lg:mb-12">
            ABOUT <span className="text-[#EF1E24]">US</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left side - Image placeholder */}
            <div className="bg-[#999999] h-48 sm:h-56 lg:h-64 rounded-xl flex items-center justify-center order-2 lg:order-1">
              <span className="text-white text-sm sm:text-lg">
                Image Placeholder
              </span>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#000000] mb-3 sm:mb-4">
                <span className="text-[#01016F]">Our</span> Story
              </h3>
              <p className="text-[#000000] mb-4 sm:mb-6 font-medium leading-relaxed text-sm sm:text-base">
                Driving the Region Since 1998 We are one of the UAE's leading
                logistics and transport providers, with a reputation built on
                precision, safety, and customer-first service.
              </p>
              <button className="bg-[#01016F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#01016F] transition-colors text-sm sm:text-base">
                Know more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white pb-8 sm:pb-12 lg:pb-16">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#01016F] font-bold text-center mb-8 sm:mb-10 lg:mb-12">
            OUR <span className="text-red-500">SERVICES</span>
          </h2>
          {/* <TruckWrapper /> */}
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-4">
              As Logistics Service Providers, We Offer A Wide Range Of Services
              To Support To Meet The Diverse Logistics Needs Of Businesses
              Across The UAE And GCC.
            </p>
          </div>

          {/* Service Items */}
          <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
            <div className="flex-1">
              {services.map((item, index) => (
                <div
                  key={index}
                  className="border-gray-200 mb-6 sm:mb-8 last:mb-0"
                >
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg underline">
                      {index + 1}. {item.title}
                    </h3>
                    <div className="w-full max-w-[400px] h-[150px] sm:h-[180px] lg:h-[200px] bg-gray-300 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-600">
                        Service Image
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Explore More Button - Responsive positioning */}
            <div className="flex items-center justify-center lg:mx-auto p-4 sm:p-6 lg:p-8">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-[#01016F] rounded-full flex items-center justify-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
                {/* Circular Text */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 128 128"
                >
                  <defs>
                    <path
                      id="circle-path"
                      d="M 64, 64 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                    />
                  </defs>
                  <text className="fill-white text-sm sm:text-lg lg:text-xl font-normal tracking-wider">
                    <textPath href="#circle-path" startOffset="0%">
                      Explore More Explore More
                    </textPath>
                  </text>
                </svg>

                {/* Center Arrow */}
                <div className="bg-white rounded-full p-1.5 sm:p-2 z-10 group-hover:rotate-45 transition-transform duration-300">
                  <LuArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#000000]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Header Section with Background Text */}
      <div className="w-full">
        <div className="relative h-[200px] sm:h-[250px] lg:h-[290px] bg-gradient-to-r from-[#01016F] to-[#0202D5] overflow-hidden">
          {/* Large Background Text - Responsive */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className={`${instrumentSans.variable} font-sans text-[80px] sm:text-[150px] md:text-[200px] lg:text-[250px] xl:text-[300px] font-bold text-[#EF1E2480] opacity-70 tracking-wider select-none`}
            >
              ARABIANS
            </h1>
          </div>

          {/* Overlay Cards - Responsive Grid */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-40 max-w-full">
              <div className="bg-gray-400 bg-opacity-80 rounded-lg w-[120px] h-[80px] sm:w-[180px] sm:h-[100px] lg:w-[220px] lg:h-[120px] xl:w-[250px] shadow-lg"></div>
              <div className="bg-gray-400 bg-opacity-80 rounded-lg w-[120px] h-[80px] sm:w-[180px] sm:h-[100px] lg:w-[220px] lg:h-[120px] xl:w-[250px] shadow-lg"></div>
              <div className="bg-gray-400 bg-opacity-80 rounded-lg w-[120px] h-[80px] sm:w-[180px] sm:h-[100px] lg:w-[220px] lg:h-[120px] xl:w-[250px] shadow-lg"></div>
              <div className="bg-gray-400 bg-opacity-80 rounded-lg w-[120px] h-[80px] sm:w-[180px] sm:h-[100px] lg:w-[220px] lg:h-[120px] xl:w-[250px] shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* White Section Below */}
        <div className="h-8 sm:h-12 lg:h-16 bg-white"></div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 tracking-tight">
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
                } relative`}
              >
                {/* Title */}
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-black uppercase tracking-wide z-10 pr-4">
                  {feature.title}
                </h3>

                {/* Arrow style changes on hover */}
                <div className="z-10 flex-shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:hidden">
                    <LuArrowUpRight className="w-full h-full" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-900 rounded-full hidden group-hover:flex items-center justify-center transition duration-300 ease-in-out">
                    <LuArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>

                {/* Center popup box (gray div) on hover - Hidden on mobile */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block">
                  <div className="w-48 h-64 sm:w-56 sm:h-72 lg:w-64 lg:h-80 rounded-lg bg-gray-400 shadow-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12">
            INDUSTRIES WE <span className="text-red-500">SERVE</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`${industry.bgColor} flex gap-3 sm:gap-4 items-center text-white p-3 sm:p-4 lg:p-2 rounded-lg w-full max-w-xs lg:max-w-none hover:scale-105 transition-transform duration-200`}
              >
                <div className="bg-white size-10 sm:size-11 rounded-[8px] flex justify-center text-black items-center text-xl sm:text-2xl flex-shrink-0">
                  {industry.icon}
                </div>
                <span className="text-xs sm:text-sm font-semibold flex-1 text-center lg:text-left">
                  {industry.title}
                </span>
                <span className="text-sm font-medium flex-shrink-0">
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
