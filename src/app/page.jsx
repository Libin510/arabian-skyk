"use client";
import { LuArrowUpRight, LuFuel } from "react-icons/lu";
import TruckWrapper from "../Components/TruckWapper";
import { IoIosArrowForward } from "react-icons/io";
import { PiHardHat } from "react-icons/pi";
import { PiBridge } from "react-icons/pi";
import { PiShieldPlus } from "react-icons/pi";
import Image from 'next/image';
import Head from 'next/head';

import { Instrument_Sans } from "next/font/google";
import Footer from "@/Components/Footer";
import TruckWrapper1 from "@/Components/TruckWapper1";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import './Home.css';

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: 'swap', // Add font-display swap for better performance
});

// Suppress hydration warnings for elements that might be affected by browser extensions
const NoSSR = dynamic(() => Promise.resolve(({ children }) => <>{children}</>), {
  ssr: false
});

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [truckArrived, setTruckArrived] = useState(false);

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

  // Fix hydration issues by ensuring component mounts on client
  useEffect(() => {
    setIsMounted(true);
    setShowSmoke(true);

    // SOLUTION 1: Ensure page starts at top
    window.scrollTo(0, 0);

    // SOLUTION 2: Prevent scroll restoration
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // SOLUTION 3: Add scroll to top on route change (if using Next.js router)
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    // If you're using Next.js router, uncomment this:
    // router.events.on('routeChangeComplete', handleRouteChange);
    // return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, []);

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
    if (!isMounted) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY);

          const baseSpeed = 1;
          const speedMultiplier = Math.min(scrollDelta * 0.1, 3);
          const newSpeed = baseSpeed + speedMultiplier;

          if (scrollSpeed !== newSpeed) {
            setScrollSpeed(newSpeed);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMounted]);

  useEffect(() => {
    if (truckArrived) {
      const titleTimer = setTimeout(() => setShowTitle(true), 100); // Reduced delay
      const videoTimer = setTimeout(() => setShowVideo(true), 200); // Reduced delay
      const cardTimer = setTimeout(() => setShowCard(true), 300); // Reduced delay

      return () => {
        clearTimeout(titleTimer);
        clearTimeout(videoTimer);
        clearTimeout(cardTimer);
      };
    }
  }, [truckArrived]);

  // SOLUTION 4: Simplified loading state - avoid layout shift
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Keep the same layout structure to prevent shift */}
        <section className="relative overflow-hidden">
          <div className="relative flex items-center justify-between px-4 h-screen">
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#01016F]"></div>
                <p className="mt-4 text-[#01016F] text-sm">Loading...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <NoSSR>
      <Head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"
        />
        {/* Preload critical images */}
        <link rel="preload" href="/truck.png" as="image" />
        <link rel="preload" href="/truck-poster.jpg" as="image" />
      </Head>

      <div suppressHydrationWarning>
        {/* Hero Section with Video Background */}
        <section className="relative h-screen w-screen ">
          {/* Hero Content */}
          <div className="absolute inset-0 z-0 smoke-animate pointer-events-none"></div>

          <div className="relative flex items-center justify-between px-2 py-2 h-full">
            {/* Truck Image with Next.js Image component */}
            {showSmoke && !truckArrived && (
              <Image
                src="/truck.png"
                alt="Truck"
                width={200}
                height={120}
                className="truck-anim -rotate-[23deg]"
                onAnimationEnd={() => setTruckArrived(true)}
                priority // Critical for LCP
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            )}

            {/* Content Card above */}
            <div className="relative w-full max-w-7xl mx-auto !pt-0">
              <div className="relative z-10 text-center sm:text-left">
                {/* FIXED: Removed animation delay from LCP elements */}
                {showTitle && (
                 <h2 className="font-bold uppercase leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
                 <span className="block">Arabian Sky</span>
                 <span className="block mt-1 text-3xl md:text-6xl lg:text-8xl font-bold">
                   Transport
                 </span>
               </h2>
                )}
                {/* FIXED: This is likely your LCP element - removed delay and animation */}
                {showTitle && (
                  <p className="mt-4 text-sm sm:text-base font-semibold text-black tracking-tight capitalize max-w-xl">
                    Powering the UAE and GCC with professional, scalable, and
                    time-critical logistics solutions for over 25 years.
                  </p>
                )}
              </div>

              <div className="w-full text-right mt-10">
                <div className="flex flex-col w-full gap-4">
                  <div className="relative w-full mx-auto">
                    {showVideo && (
                      <>
                        <p className="absolute -top-9 right-0 z-30 text-white font-bold text-base uppercase bg-[#01016F] px-3 py-1 rounded-t-lg w-[40%]">
                          <span className="text-red-500 text-xl tracking-widest">*</span> THE WHEELS OF RELIABILITY
                        </p>
                        {/* FIXED: Added explicit dimensions and poster for better CLS */}
                        <div className="relative mx-auto overflow-hidden rounded-b-lg rounded-l-lg z-20 w-full  max-w-[89.375rem] aspect-[1430/539]  max-h-[20rem]">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster="/truck-poster.jpg"
                            className="absolute top-0 left-0 w-full h-full object-cover z-10"
                          >
                            <source src="/Truck Logo Reveal.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>


                      </>
                    )}
                  </div>
                  {/* FIXED: Reserve space for dynamic content to prevent CLS */}
                  <div className="relative w-fit max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[1430px] z-10 min-h-[60px]">
                    {showCard && (
                      <div className="bg-[#01016F] text-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                        {/* Left Text */}
                        <h3 className="text-white font-semibold text-sm sm:text-base leading-tight text-center sm:text-left">
                          We Have All Kinds Of Solution{" "}
                          <br className="hidden sm:block" />
                          To Deliver Your Goods
                        </h3>

                        {/* Right Button */}
                        <button className="bg-white text-[#01016F] flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                          Get a free quote
                          <span className="text-[#01016F] text-lg">
                            <LuArrowUpRight />
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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
              {/* Left side - Image placeholder with fixed dimensions */}
              <div className="bg-[#999999] rounded-xl flex items-center justify-center order-2 lg:order-1 hover-lift" style={{ aspectRatio: '4/3', minHeight: '200px' }}>
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
        <section className="bg-white pb-8 sm:pb-12 lg:pb-16">
          <div className="mx-auto w-full px-4 sm:px-6 lg:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#01016F] font-bold text-center mb-8 sm:mb-10 lg:mb-12 fade-in-up">
              OUR <span className="text-red-500">SERVICES</span>
            </h2>
            <TruckWrapper className="w-full" />
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
                    className={`service-card ${index < visibleCards ? "visible" : ""
                      } flex flex-col lg:flex-row items-center gap-6 lg:gap-8`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Service Content */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col gap-3 sm:gap-4">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg underline">
                          {index + 1}. {items.title}
                        </h3>
                        {/* FIXED: Added explicit dimensions for service images */}
                        <div className="w-full max-w-[400px] bg-gray-300 rounded flex items-center justify-center hover-lift" style={{ aspectRatio: '4/3', minHeight: '150px' }}>
                          <span className="text-xs text-gray-600">
                            Service Image
                          </span>
                        </div>
                      </div>
                    </div>

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
          <div className="relative overflow-hidden" style={{ minHeight: '200px' }}>
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
                    className={`bg-gray-400 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer float-animation delay-${index * 100}`}
                    style={{
                      animationDelay: `${index * 300}ms`,
                      width: '120px',
                      height: '80px',
                      minWidth: '120px',
                      minHeight: '80px'
                    }}
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
                  className={`group flex items-center justify-between py-4 sm:py-5 lg:py-6 ${index !== features.length - 1
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

                  {/* Center popup box on hover - Enhanced with fixed dimensions */}
                  {feature.showPopup && (
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden sm:block">
                      <div className="rounded-lg bg-gray-400 shadow-2xl transform group-hover:scale-105 transition-transform duration-500" style={{ width: '200px', height: '250px' }}></div>
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
                  className={`${industry.bgColor
                    } flex gap-3 sm:gap-4 items-center text-white p-3 sm:p-4 lg:p-2 rounded-lg w-full max-w-xs lg:max-w-none hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer fade-in-up delay-${index * 100
                    }`}
                  style={{ minHeight: '60px' }} // Reserve space to prevent CLS
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
    </NoSSR>
  );
}