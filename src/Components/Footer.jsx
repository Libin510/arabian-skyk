import { useRouter } from "next/navigation";
import React from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";

function Footer() {
  const router = useRouter();
  return (
    <div className="bg-[#f2f0ee] pt-20">
    <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        {/* Contact Section */}
        <section className="py-12 md:py-16  bg-gradient-to-r from-[#1131A6] via-[#1131A6] to-[#F70105] text-white rounded">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            CONTACT US FOR A<br />
            CONSULTATION
          </h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 text-blue-100 max-w-2xl mx-auto md:mx-0">
            Ready To Move Your Business Forward? Contact Us Today To Discuss
            Your Logistics Needs.
          </p>
          {/* <button
                        className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                        onClick={() => router.push('/contact')}
                    >
                        Get In Touch
                        <span className="ml-2 bg-[#EF1E24] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            →
                        </span>
                    </button> */}
          <button
            className="bg-white text-black flex items-center gap-2 
                  font-semibold 
                  text-xs sm:text-sm lg:text-base 
                  pl-2 md:pl-5 lg:l-6 pr-1
                  py-1
                  
                  rounded-full hover:scale-105 transition-transform duration-300 
                  whitespace-nowrap"
          >
            Get In Touch
            <span
              className="text-white rounded-full p-2 lg:p-4 bg-[#EF1E24] 
                    text-sm md:text-xl lg:text-2xl"
            >
              <LuArrowUpRight />
            </span>
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className=" pt-16 lg:pt-12">
        <div className=" mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Side - Company Info */}
            <div className="lg:col-span-4 text-center lg:text-left">
              {/* Logo */}
              <div className="flex items-center justify-center lg:justify-start mb-6 md:mb-8">
                <div className="text-white rounded-lg">
                  <img
                    src="./arabianskylogo.png"
                    className="h-10 w-auto md:h-[57px] md:w-[210px]"
                    alt="Arabian Sky Transport Logo"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 md:space-y-6 text-sm">
                <div>
                  <p className="font-bold text-gray-800 mb-1">Mail</p>
                  <p className="text-gray-600 break-all md:break-normal">
                    arabianskytr@gmail.com
                  </p>
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-1">Phone</p>
                  <p className="text-gray-600">+971 50 538 4463</p>
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-1">Address</p>
                  <p className="text-gray-600 leading-relaxed">
                    Lorem Ipsum Dolor Sit
                    <br />
                    Amet Consectetur
                    <br />
                    Adipiscing Elit, Sed Do
                    <br />
                    Eiusmod Tempor Incididunt
                    <br />
                    Nunc Praesent Posuere
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Navigation */}
            <div className="lg:col-span-8">
              {/* Social Media Icons */}
              <div className="flex justify-center lg:justify-end flex-wrap gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="flex items-center space-x-2">
                  <FaInstagram size={20} className="text-gray-600" />

                  <span className="text-xs md:text-sm text-gray-600 font-medium">
                    INSTAGRAM
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <AiOutlineLinkedin size={20} className="text-gray-600" />

                  <span className="text-xs md:text-sm text-gray-600 font-medium">
                    LINKEDIN
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <RiFacebookBoxLine size={20} className="text-gray-600" />

                  <span className="text-xs md:text-sm text-gray-600 font-medium">
                    FACEBOOK
                  </span>
                </div>
              </div>
              {/* Navigation Menu */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 mb-8 md:mb-12 mt-8 md:mt-24">
                <div className="text-center">
                  <h4 className="font-bold text-gray-800 text-xs md:text-sm">
                    Home
                  </h4>
                </div>
                <div
                  className="text-center cursor-pointer"
                  onClick={() => router.push("/about")}
                >
                  <h4 className="font-bold text-gray-800 text-xs md:text-sm">
                    About Us
                  </h4>
                </div>
                <div
                  className="text-center cursor-pointer"
                  onClick={() => router.push("/services")}
                >
                  <h4 className="font-bold text-gray-800 text-xs md:text-sm">
                    Services
                  </h4>
                </div>
                <div
                  className="text-center cursor-pointer"
                  onClick={() => router.push("/careers")}
                >
                  <h4 className="font-bold text-gray-800 text-xs md:text-sm">
                    Careers
                  </h4>
                </div>
                <div
                  className="text-center sm:col-span-1 col-span-2 md:col-span-1 cursor-pointer"
                  onClick={() => router.push("/contact")}
                >
                  <h4 className="font-bold text-gray-800 text-xs md:text-sm">
                    Contact Us
                  </h4>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="mb-8 mt-12 md:mt-40">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 text-center lg:text-left">
                  Subscribe Our Newsletter
                </h3>
                <div className="relative max-w-md mx-auto lg:mx-0">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm pr-24 md:pr-32"
                  />
                  <button
                    className="absolute top-1/2 right-1 -translate-y-1/2 bg-[#01016F] text-white px-3 md:px-6 py-2 rounded text-xs md:text-sm font-semibold"
                    style={{ height: "80%" }}
                  >
                    <span className="hidden md:inline">Get Started</span>
                    <span className="md:hidden">Start</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8">
            <h3 className="text-[6.4vw] 2xl:text-[4.7vw] leading-none text-center font-semibold text-[#1E1E1E] tracking-wider whitespace-nowrap overflow-hidden">
              ARABIANSKYTRANSPORT
            </h3>
          </div>
          <div className="border-t border-black py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 gap-2">
              <p className="text-center sm:text-left">
                © COPYRIGHT 2024 - ARABIAN SKY TRANSPORT
              </p>
              <p className="text-center sm:text-right">TERMS AND CONDITIONS</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default Footer;
