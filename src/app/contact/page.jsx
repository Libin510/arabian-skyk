"use client";
import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
import Footer from "@/Components/Footer";
import { LuArrowUpRight } from "react-icons/lu";
import API, { action } from "../Api";
export default function Contact() {
  const [employee, setEmployee] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    companyAddress: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const getOurTeam = async () => {
    try {
      const result = await action(API.GET_USER, {
        is_employee: true,
      });
      if (result?.data) {
        setEmployee(
          result.data.map((item) => ({
            id: item._id,
            name: item.name,
            phone: item.number,
            title: item.designation,
            image:
              `https://arabian-sky.s3.ap-south-1.amazonaws.com/${item.image}` ||
              "https://via.placeholder.com/150",
          }))
        );
      } else {
        console.error("Failed to fetch our team");
      }
    } catch (error) {
      console.error("Error fetching our team:", error);
    }
  };

  useEffect(() => {
    getOurTeam();
  }, []);

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
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 text-center">
                  LET'S TALK
                </h1>
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
                    <p className="text-sm opacity-90">info@arabianskyme.com</p>
                    <p className="text-sm opacity-90">arabiansk@gmail.com</p>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">
                      OFFICE LOCATION
                    </h3>
                    <p className="text-sm opacity-90"> Arabian Sky Transport</p>
                    <p className="text-sm opacity-90">
                      Ajman, Jurf industrial area 2
                    </p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">
                      PHONE NUMBERS
                    </h3>
                    <p className="text-sm opacity-90">+971506078661</p>
                    <p className="text-sm opacity-90">+97156878661</p>
                  </div>
                </div>

                {/* Office Hours */}
                {/* <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">
                      OUR OFFICE HOURS
                    </h3>
                    <p className="text-sm opacity-90">
                      Monday to Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-sm opacity-90">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-sm opacity-90">Sunday: Closed</p>
                  </div>
                </div> */}

                {/* Stay Connected */}
                <div className="pt-4">
                  <h3 className="font-semibold text-sm mb-3">STAY CONNECTED</h3>
                  <div className="flex space-x-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <a
                        href="https://www.instagram.com/arabian_sky_transport?igsh=em14NjE4M2VzcHUx"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="w-4 h-4 text-[#01016F]" />
                      </a>
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <a
                        href="https://www.linkedin.com/company/arabian-sky-transport-l-l-c/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 text-[#01016F]" />
                      </a>
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <a
                        href="https://www.facebook.com/share/16juwK2JUw/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="w-4 h-4 text-[#01016F]" />
                      </a>
                    </div>
                    {/* <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Twitter className="w-4 h-4 text-[#01016F]" />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Details Section */}
        {employee && employee.length > 0 && (
          <div className="mt-16 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                MEET OUR <span className="text-red-500">TEAM</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Get to know the dedicated professionals who make Arabian Sky
                exceptional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employee.map((member, index) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div className="flex">
                    <div className="w-24 h-24  overflow-hidden flex-shrink-0 p-2">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/150x150?text=Team+Member";
                        }}
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{member.title}</p>
                      <p className="text-gray-600 text-sm">
                        Ph : {member.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="mt-16 mb-12">
          <div className="w-full h-[544px] bg-gray-300 rounded-lg overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3424.780870243376!2d55.560257375389696!3d25.43634977755786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDI2JzEwLjkiTiA1NcKwMzMnNDYuMiJF!5e1!3m2!1sen!2sin!4v1757833409689!5m2!1sen!2sin"
              width="100%"
              height="100%"
              // style="border:0;"
              // allowfullscreen=""
              loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
