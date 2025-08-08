"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import Footer from "@/Components/Footer";
import { LuArrowUpRight } from "react-icons/lu";
export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyAddress: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 mt-32">
      {/* Header */}
      <div className="mb-12">
        <div className=" items-start  mb-8">
          <h1 className="text-5xl font-bold mr-6 ">
            CONTACT <span className="text-red-500">US</span>
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-md mt-2">
            Have A Question Or Need Assistance? Please Fill Out The Form Below,
            And One Of Our Team Members Will Get Back To You As Soon As
            Possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
     <div className=" mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Increased height to match side panel */}
          <div className="lg:col-span-2">
            <div className="space-y-6 h-full flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-6 bg-gray-200 border-0 rounded-none placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="companyAddress"
                  placeholder="Company Address*"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-6 bg-gray-200 border-0 rounded-none placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-6 bg-gray-200 border-0 rounded-none placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number*"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-6 bg-gray-200 border-0 rounded-none placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex-1">
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={10}
                  className="w-full h-full px-4 py-6 bg-gray-200 border-0 rounded-none placeholder-gray-600 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[280px]"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="group bg-gradient-to-r from-[#1131A6] to-[#F70105] text-white pl-6 pr-1 py-1 rounded-full font-medium text-sm lg:text-2xl hover:bg-blue-800 transition-colors duration-200 flex items-center gap-2"
                >
                  Submit
                  <div className=" bg-white text-black rounded-full p-2 text-base lg:text-2xl">
                  <LuArrowUpRight />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information Panel */}
          <div className="lg:col-span-1 ">
            <div className="rounded-md border-4 border-[#01016F] overflow-hidden">
              <div className="bg-white p-4 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-2 h-2 bg-[#F70105] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#F70105] rounded-full"></div>
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 text-center">LET'S TALK</h1>
                <div className="flex items-center justify-between mt-2">
                  <div className="w-2 h-2 bg-[#01016F] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#01016F] rounded-full"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="bg-[#01016F] text-white p-6 space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">EMAIL</h3>
                    <p className="text-sm opacity-90">Contact@website.com</p>
                    <p className="text-sm opacity-90">hello@website.com</p>
                    <p className="text-sm opacity-90">Partnerships & Collaborations:</p>
                    <p className="text-sm opacity-90">partnerships@website.com</p>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">OFFICE LOCATION</h3>
                    <p className="text-sm opacity-90">123 Business Street, Suite 100</p>
                    <p className="text-sm opacity-90">Business District</p>
                    <p className="text-sm opacity-90">Northern Ontario Downtown East Montreal</p>
                    <p className="text-sm opacity-90">QC H1A 0A6</p>
                    <p className="text-sm opacity-90">SUITE 75 OUTLET PLAZA</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">PHONE NUMBERS</h3>
                    <p className="text-sm opacity-90">+1 (555) 123-4567</p>
                    <p className="text-sm opacity-90">Toll Free: 1-800-123-4567</p>
                    <p className="text-sm opacity-90">+1 (555) 765-4321</p>
                    <p className="text-sm opacity-90">Emergency: +1 (555) 999-0000</p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">OUR OFFICE HOURS</h3>
                    <p className="text-sm opacity-90">Monday to Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-sm opacity-90">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-sm opacity-90">Sunday: Closed</p>
                  </div>
                </div>

                {/* Stay Connected */}
                <div className="pt-4">
                  <h3 className="font-semibold text-sm mb-3">STAY CONNECTED</h3>
                  <div className="flex space-x-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-[#01016F]" />
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-[#01016F]" />
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Facebook className="w-4 h-4 text-[#01016F]" />
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Twitter className="w-4 h-4 text-[#01016F]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 mb-12">
          <div className="w-full h-[544px] bg-gray-300 rounded-lg overflow-hidden relative">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353159046!3d-37.81627974202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f8c3fb%3A0x5045675218ce6e0!2sVictoria!5e0!3m2!1sen!2sau!4v1620211234567!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>

  );
}