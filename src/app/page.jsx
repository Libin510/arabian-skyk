"use client";
import { LuArrowUpRight } from "react-icons/lu";
import TruckWrapper from "../Components/TruckWapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* Hero Section with Video Background */}
      <section className="relative h-[100vh]  overflow-hidden rounded-b-2xl">
        {/* Background Video - Contained within hero section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 "
        >
          <source src="/Truck Logo Reveal.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-200/30 z-5" />

        {/* Hero Content */}
        <div className="relative z-30 flex items-center justify-between px-8 pt-44 h-full">
          {/* Left Side Content */}
          <div className="flex-1 max-w-3xl">
            <h1 className="md:text-[90px] 3xl:text-[120px] font-bold ">
              <span className="text-[#01016F]">ARABIAN </span>{" "}
              <span className="text-[#EF1E24]">SKY</span>
              <br />
              <span className="text-[#01016F]">TRANSPORT</span>
            </h1>

            <p className="text-xl md:text-[37px] text-[#000] font-semibold mb-10">
              THE WHEELS OF RELIABILITY
            </p>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="bg-white/70 backdrop-blur-sm p-5 flex flex-col gap-7 justify-between rounded-xl bg-linear-to-r shadow-lg">
                <h3 className="text-[#000000] font-semibold mb-3 text-sm leading-tight">
                  We Have All Kinds Of Solution
                  <br />
                  To Deliver Your Goods
                </h3>

                <button className="bg-[#01016F] text-white pl-4 pr-[4px] py-[4px] rounded-full hover:bg-blue-800 transition-colors w-fit flex items-center space-x-2 self-end">
                  <span className="text-sm font-semibold">
                    Get a free quote
                  </span>
                  <div className="size-[28px] bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#000000] text-lg ">
                      <LuArrowUpRight />
                    </span>
                  </div>
                </button>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-5 flex flex-col gap-7 justify-between rounded-lg shadow-lg">
                <h3 className="text-[#000000] text-sm font-semibold mb-3 leading-tight">
                  Powering the UAE and GCC with professional, scalable, and
                  time-critical logistics solutions for over 25 years.
                </h3>
                <button className="text-[#000000]  font-semibold flex items-center space-x-2 self-end">
                  <span className="text-lg">Explore More</span>
                  <span className="text-lg">
                    <LuArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden absolute lg:flex flex-1 justify-end items-center -bottom-35 -right-35">
            <img
              src="/wheel.png"
              alt="Transport Vehicle"
              className="w-80 h-80 object-cover rounded-full animate-spin"
              style={{ animationDuration: "20s" }}
            />
            {/* Optional: Add a subtle glow effect */}
            {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-red-500/20 animate-pulse"></div> */}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[45px] 3xl:text-[60px] text-[#01016F] font-semibold text-center mb-12">
            ABOUT <span className="text-[#EF1E24]">US</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image placeholder */}
            <div className="bg-[#999999] h-64 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">Image Placeholder</span>
            </div>

            {/* Right side - Content */}
            <div>
              <h3 className="text-3xl font-bold text-[#000000] mb-4">
                <span className="text-[#01016F]">Our</span> Story
              </h3>
              <p className="text-[#000000] mb-6 font-medium leading-relaxed">
                Driving the Region Since 1998 We are one of the UAE’s leading
                logistics and transport providers, with a reputation built on
                precision, safety, and customer-first service.
              </p>
              <button className="bg-[#01016F] text-white px-6 py-3 rounded-full hover:bg-[#01016F] transition-colors">
                Know more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className=" bg-white">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-4xl text-[#01016F] font-bold text-center mb-12">
            OUR <span className="text-red-500">SERVICES</span>
          </h2>
          <TruckWrapper />
          <div className="text-center mb-8">
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              As Logistics Service Providers, We Offer A Wide Range Of Services
              To Support To Meet The Diverse Logistics Needs Of Businesses
              Across The UAE And GCC.
            </p>
          </div>

          {/* Service Items */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Heavy Haulage */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-32 h-20 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-600">Service Image</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    01. HEAVY HAULAGE & PROJECT LOGISTICS
                  </h3>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>

            {/* Customer Clearance */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-32 h-20 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-600">Service Image</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    02. CUSTOMER CLEARANCE
                  </h3>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>

            {/* Fleet Maintenance */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-32 h-20 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-600">Service Image</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    03. FLEET MAINTENANCE & ROADSIDE SUPPORT
                  </h3>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </div>

          {/* Central Truck with Logo */}
          <div className="flex justify-center mt-12">
            <div className="relative">
              <img
                src="/truck-service.png"
                alt="Arabian Sky Transport Truck"
                className="w-80 h-auto"
                // onError={(e) => {
                //   e.target.style.display = 'none';
                //   e.target.nextSibling.style.display = 'flex';
                // }}
              />
              <div
                className="w-80 h-32 bg-gray-800 rounded-lg flex items-center justify-center"
                style={{ display: "none" }}
              >
                <span className="text-white text-lg">Truck Service Icon</span>
              </div>

              {/* Circular Logo */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            WHY CHOOSE <span className="text-red-500">US</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Features */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-medium text-gray-800">
                  RELIABILITY, EXPERIENCE, SCALE
                </span>
                <div className="text-gray-400">→</div>
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-medium text-gray-800">
                  OVER 25 YEARS OF OPERATION
                </span>
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">25</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-medium text-gray-800">
                  100+ FLEET VEHICLES
                </span>
                <div className="text-gray-400">→</div>
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="font-medium text-gray-800">
                  OPERATES ACROSS THE GCC
                </span>
                <div className="text-gray-400">→</div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">
                  24/7 OPERATIONAL SUPPORT
                </span>
                <div className="text-gray-400">→</div>
              </div>
            </div>

            {/* Right side - Image placeholder */}
            <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-lg">Why Choose Us Image</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            INDUSTRIES WE <span className="text-red-500">SERVE</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-blue-900 text-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🏭</div>
              <span className="text-sm font-medium">OIL & GAS</span>
            </div>

            <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🏗️</div>
              <span className="text-sm font-medium">CONSTRUCTION</span>
            </div>

            <div className="bg-green-700 text-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🏭</div>
              <span className="text-sm font-medium">MANUFACTURING</span>
            </div>

            <div className="bg-gray-600 text-white p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🏛️</div>
              <span className="text-sm font-medium">GOVERNMENT & PUBLIC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 px-8 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              CONTACT US FOR A <br />
              CONSULTATION
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Ready To Move Your Business Forward? Connect With Every Schedule
              Need Logistics Needs
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
      <footer className="bg-white py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Logo and Info */}
            <div className="col-span-1">
              <div className="mb-4">
                <span className="text-2xl font-bold">
                  <span className="text-blue-900">AST</span>
                </span>
              </div>
              <address className="text-gray-600 text-sm not-italic">
                Address:
                <br />
                Arabian Sky Transport
                <br />
                UAE
              </address>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-900">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-900">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Heavy Haulage</li>
                <li>Customer Clearance</li>
                <li>Fleet Maintenance</li>
                <li>Logistics Solutions</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                Subscribe Our Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l text-sm"
                />
                <button className="bg-blue-900 text-white px-4 py-2 rounded-r text-sm hover:bg-blue-800">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-6xl font-bold text-gray-800 tracking-wider">
              ARABIANSKYTRANSPORT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
