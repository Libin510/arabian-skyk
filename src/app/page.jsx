"use client";
import { LuArrowUpRight, LuFuel } from "react-icons/lu";
import TruckWrapper from "../Components/TruckWapper";
import { IoIosArrowForward } from "react-icons/io";
import { PiHardHat } from "react-icons/pi";
import { PiBridge } from "react-icons/pi";
import { PiShieldPlus } from "react-icons/pi";
import Image from "next/image";
import { FaStarOfLife } from "react-icons/fa6";

import { Instrument_Sans, Raleway } from "next/font/google";
// import Footer from "@/Components/Footer";
import { useEffect, useRef, useState } from "react";
import "./Home.css";
// import ImageReveal from "@/Components/ImageReveal";
import Preloader from "@/Components/Preloader";
import TruckImage from "@/Components/TruckImage";
import ScrollBaseAnimation from "../../components/uilayouts/scroll-text-marque";
// import StickyGallery from "@/Components/StickyGallery";
import "../Components/Particles.css";
import dynamic from "next/dynamic";
const StickyGallery = dynamic(() => import("@/Components/StickyGallery"), { ssr: false });
const ImageReveal = dynamic(() => import("@/Components/ImageReveal"), { ssr: false });
const Footer = dynamic(() => import("@/Components/Footer"), { ssr: false });
import Head from "next/head";
const TruckScen = dynamic(() => import("@/Components/TruckScen"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] sm:h-[180px] lg:h-[200px] bg-gray-100"></div>
  ),
});
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});
import PageWrapper from "@/Components/PageWrapper";
import { AnimateSvg } from "@/Components/AnimateSvg";
import ScrollReveal from "@/Components/ScrollReveal";
import RotatingText from "@/Components/RotatingText";

export default function Home() {
  const [showSmoke, setShowSmoke] = useState(false);
  const [truckArrived, setTruckArrived] = useState(false);
  // Enhanced loader states
  const [isLoading, setIsLoading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [truckLoaded, setTruckLoaded] = useState(false);

  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  console.log(truckArrived, "truckArrived");
  const [bgGradient, setBgGradient] = useState("bg-[#f2f0ee]");

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
  const [contentVisible, setContentVisible] = useState(false);

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

  // Hide loader when both conditions are met
 useEffect(() => {
    if (assetsLoaded) {
      setIsLoading(false);
      setShowSmoke(true);
      window.scrollTo(0, 0);
    }
  }, [assetsLoaded]);

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
  useEffect(() => {
    if (truckArrived) {
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 50); // small delay so CSS transition kicks in
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [truckArrived]);
  return (
    <>
    <Head>
        <link rel="preload" as="image" href="/truck-fallback.webp" />
        <link rel="preload" as="video" href="/Truck Logo Reveal (1).mp4" />
      </Head>

      <div className="w-screen relative mt-28 lg:mt-40">
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
          <div className="w-full h-[100vh] bg-white mt-5 relative" ref={divRef}>
            <div className="right_angle_triangle "></div>
            {showSmoke && (
              <TruckImage
                // dimensions={dimensions}
                setTruckArrived={(value) => setTruckArrived(value)}
              />
            )}
          </div>

          {/* Truck Arrived Content */}
          {truckArrived && (
            <div
              className={`absolute top-5 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl mx-auto z-10 px-4 sm:px-6 
      transition-all duration-1000 ease-in-out 
      ${
        contentVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }
    `}
            >
              {/* Title & Description */}
              <div className="relative z-10 text-left mb-4">
                <h2
                  className={`font-redhat uppercase leading-tight text-[8vw] md:text-[6vw] lg:text-[4.5vw] 2xl:text-[4vw]`}
                >
                  <span className="block leading-[0.5]">Arabian Sky</span>
                  <span className="block text-[10.5vw] md:text-[6.5vw] lg:text-[7vw] 2xl:text-[6vw] font-medium">
                    Transport
                  </span>
                </h2>
                <p className="text-sm md:text-base lg:text-base font-semibold text-black tracking-tight capitalize w-[85%] md:w-[65%] lg:w-[55%]">
                  Powering the UAE and GCC with professional, scalable, and
                  time-critical logistics solutions for over 25 years.
                </p>
              </div>

              {/* Video Section */}
              <div className="w-full text-right pt-4">
                <div className="flex flex-col gap-2 w-full mx-auto">
                  <div className="relative w-full mx-auto">
                    <p className="w-fit -mt-4 sm:-mt-8 lg:-mt-12 justify-self-end font-bold bg-[#01016F] px-3 py-2 rounded-t flex items-center gap-2 text-white text-sm">
                      <FaStarOfLife className="size-[13px] lg:size-[16px] text-red-500" />
                      <span className="font-instrument-sans font-semibold text-sm lg:text-xl 2xl:text-xl">
                        THE WHEELS OF RELIABILITY
                      </span>
                    </p>

                    {/* Unified Responsive Video */}
                    <div className="relative w-full  mx-auto aspect-video overflow-hidden rounded-b rounded-l z-20 h-full lg:h-[56vh]">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/truck-poster.jpg"
                        loading="lazy"
                        className="absolute top-0 left-0 w-full h-full object-cover z-10"
                      >
                        <source src="/Truck Logo Reveal (1).mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="relative w-full md:max-w-[65%] lg:max-w-[60%] 2xl:max-w-[50%]">
                    <div className="bg-[#01016F] text-white rounded px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                      <h3 className="text-white font-semibold text-sm lg:text-sm 2xl:text-lg leading-tight text-center sm:text-left">
                        We Have All Kinds Of Solution{" "}
                        <br className="hidden sm:block" />
                        To Deliver Your Goods
                      </h3>

                      <button className="bg-white text-black flex items-center gap-2 font-semibold text-xs sm:text-sm lg:text-sm xl:text-sm 2xl:text-base pl-3 pr-1 py-1 rounded-full hover:scale-105 transition-transform">
                        Get a free quote
                        <span className="bg-[#01016F] text-white rounded-full p-2 text-base lg:text-2xl">
                          <LuArrowUpRight />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="particle-container">
            {/* <div className="particles">
              {[...Array(30)].map((_, i) => (
                <span className="circle" key={i}></span>
              ))}
            </div> */}
            <div className="home-hero overflow-hidden">
              {/* About Us Section - Enhanced Responsiveness */}
              {/* <div className="absolute left-[-8rem] z-0 ">
                <div className="w-[85vw] rotate-[24deg]">
                  <AnimateSvg
                    width="100%"
                    height="100%"
                    viewBox="0 0 140 80"
                    className="my-svg-animation"
                    path="M10 50 C 20 40, 40 10, 50 20 C 60 30, 60 50, 70 60 C 80 70, 90 50, 100 40 C 110 30, 120 40, 130 50"
                    strokeColor="#ef1e24"
                    strokeWidth={2}
                    strokeLinecap="round"
                    animationDuration={1.5}
                    animationDelay={0}
                    animationBounce={0.3}
                    reverseAnimation={false}
                    enableHoverAnimation={false}
                  />
                </div>
              </div> */}

              <div className="max-w-screen-xl mx-auto px-4 md:px-6 z-40">
                <section className="py-12 lg:py-40 bg-transparent">
                  <div className="">
                    {/* <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#01016F] font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 fade-in-up">
                      ABOUT <span className="text-[#EF1E24]">US</span>
                    </h2> */}

                    <div className="flex flex-col justify-between md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-40 items-center w-full h-full">
                      {/* <div className="bg-[#999999] w-full h-[25vh] lg:w-[50vw] lg:h-[45vh] rounded flex items-center justify-center hover-lift">
                        <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg">
                          <img
                            src={
                              "https://legitmoves.com/wp-content/uploads/2023/08/1657958812_About-Us-main_0.jpg"
                            }
                            alt="About Us"
                            className="w-full h-full object-cover rounded"
                          />
                        </span>
                      </div> */}

                      {/* Content - Mobile optimized */}
                      <div className="order-1 lg:order-2 fade-in-up delay-300 text-left w-full">
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#000000] mb-3 sm:mb-4">
                          <span className="text-[#01016F]">Our</span> Story
                        </h3>
                        <ScrollReveal
                          baseOpacity={0}
                          enableBlur={true}
                          baseRotation={5}
                          blurStrength={10}
                        >
                          Driving the Region Since 1998 We are one of the UAE's
                          leading logistics and transport providers, with a
                          reputation built on precision, safety, and
                          customer-first service.
                        </ScrollReveal>
                        {/* <p className="text-[#000000] mb-4 sm:mb-6 font-medium leading-relaxed text-sm sm:text-base lg:mx-0">
                          Driving the Region Since 1998 We are one of the UAE's
                          leading logistics and transport providers, with a
                          reputation built on precision, safety, and
                          customer-first service.
                        </p> */}
                        <button className="bg-gradient-to-r from-[#1131A6] to-[#F70105] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-blue-800 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                          Know more
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Services Section*/}
          <div
            className={`bg-[#f2f0ee] relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzYiIGhlaWdodD0iNzYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0ibm9pc2UiPjxmZVR1cmJ1bGVuY2UgdHlwZT0icmZyYXR1cnIiIGJhc2VGcmVxdWVuY3k9IjAuNSIgbnVtT2N0YXZlcz0iMSIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI3NiIgaGVpZ2h0PSI3NiIgZmlsdGVyPSJ1cmwoI25vaXNlKSIvPjwvc3ZnPg==')] before:opacity-10 before:mix-blend-multiply before:content-[''] before:pointer-events-none`}
          >
            <div className="">
              <section className=" py-8 lg:py-20">
                <div className="w-full">
                  <div className="max-w-screen-xl mx-auto px-4 md:px-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#01016F] font-bold text-center mb-6 sm:mb-8 fade-in-up">
                    OUR <span className="text-red-500">SERVICES</span>
                  </h2>
                  {/* <TruckWrapper className="w-full" /> */}
                  <div className="text-center fade-in-up delay-200 px-4">
                    <p className="text-black max-w-3xl mx-auto text-base lg:text-2xl">
                      As Logistics Service Providers, We Offer A Wide Range Of
                      Services To Support To Meet The Diverse Logistics Needs Of
                      Businesses Across The UAE And GCC.
                    </p>
                  </div>
                  </div>
                   <div className="relative w-full h-[50vh] lg:h-[70vh]">
                    {!truckLoaded && (
                    <Image
                      src="/truck-fallback.webp"
                      alt="Truck"
                      fill
                      priority
                      className="object-contain"
                    />)}
                    <div className="absolute inset-0">
                      <TruckScen onLoadComplete={() => setTruckLoaded(true)} />
                    </div>
                  </div>

                  <div className="max-w-screen-xl mx-auto px-4 md:px-6">
                    <StickyGallery onChangeBackground={setBgGradient} />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Background Animation Section - Mobile Optimized */}
          <div className="w-full">
            <div className="relative overflow-hidden h-[15vh] md:h-[25vh] lg:h-[36vh]">
              <div className="absolute inset-0 group bg-gradient-to-r from-[#1131A6] to-[#F70105]"></div>

              {/* Responsive Background Text */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="whitespace-nowrap py-2">
                  {/* <h1
                  className={`slide-text text-[40px] xs:text-[60px] sm:text-[80px] md:text-[120px] lg:text-[15vw] font-bold text-[#FFFFFF80] opacity-70 tracking-wider select-none`}
                  style={{
                    "--animation-duration": `${35 / scrollSpeed}s`,
                  }}
                >
                  ARABIAN SKY TRANSPORT ARABIAN SKY TRANSPORT
                </h1> */}
                  <ScrollBaseAnimation
                    // delay={500}
                    baseVelocity={3}
                    scrollDependent={true}
                    clasname="font-bold leading-[90%] text-[15vw] text-[#FFFFFF80]"
                  >
                    ARABIAN SKY TRANSPORT
                  </ScrollBaseAnimation>
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
                      className={`bg-gray-400 w-[15vw] h-[18vh] bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer${
                        index * 100
                      }`}
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
          <div className="max-w-screen-xl mx-auto px-4 md:px-6 pt-[5rem]">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 tracking-tight fade-in-up text-[#01016F]">
              WHY CHOOSE <span className="text-[#F70105]">US</span>
            </h2>
            <ImageReveal />
          </div>

          {/* Industries We Serve Section */}
          <div className="max-w-screen-xl mx-auto px-4 md:px-6">
            <section className="py-8 sm:py-12 lg:py-16">
              <div className="flex justify-center items-center gap-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center fade-in-up text-[#01016F]">
                  INDUSTRIES WE <span className="text-[#F70105]">SERVE</span>
                </h2>

                {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
                  {industries.map((industry, index) => (
                    <div
                      key={index}
                      className={`${
                        industry.bgColor
                      } flex gap-3 lg:gap-4 items-center text-white p-2 rounded-md w-full hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer fade-in-up delay-${
                        index * 100
                      }`}
                    
                    >
                      <div className="bg-white size-8 sm:size-11 rounded flex justify-center text-black items-center text-sm lg:text-2xl hover:rotate-12 transition-transform duration-300">
                        {industry.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold flex-1 text-left">
                        {industry.title}
                      </span>
                    
                    </div>
                  ))}
                </div> */}
                     <RotatingText
                  texts={["OIL & GAS", "CONSTRUCTION", "INFRASTRUCTURE", "GOVERNMENT & DEFENSE"]}
                  mainClassName="px-2 md:px-4 bg-black text-white overflow-hidden py-2 md:py-4 justify-center rounded text-lg lg:text-4xl w-auto font-bold"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </section>
          </div>

          <div className="">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
