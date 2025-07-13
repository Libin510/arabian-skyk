"use client";
import Footer from "@/Components/Footer";
import { useState } from "react";

// app/about/page.jsx
export default function About() {
 const [currentIndex, setCurrentIndex] = useState(0);

  const values = [
    {
      id: 1,
      title: "RELIABILITY",
      description: "Every Load We Carry Is A Promise We Keep. We Understand The Importance Of On-Time, Safe Deliveries, Which Is Why We Prioritize Reliability In Everything We Do.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "PERFORMANCE",
      description: "Every Load We Carry Is A Promise We Keep. We Understand The Importance Of On-Time, Safe Deliveries, Which Is Why We Prioritize Reliability In Everything We Do.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "SAFETY",
      description: "Every Load We Carry Is A Promise We Keep. We Understand The Importance Of On-Time, Safe Deliveries, Which Is Why We Prioritize Reliability In Everything We Do.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Innovation",
      description: "Every Load We Carry Is A Promise We Keep. We Understand The Importance Of On-Time, Safe Deliveries, Which Is Why We Prioritize Reliability In Everything We Do.",
      image: "/api/placeholder/300/200"
    }
  ];

  const features = [
    {
      badge: "EXPERIENCED TEAM:",
      title: "Our Drivers, Logistics Managers, And Technical Support Teams Have Years Of Experience Working On Projects Of All Scales Across The GCC."
    },
    {
      badge: "STATE-OF-THE-ART TECHNOLOGY:",
      title: "We Use Cutting-Edge Tools And Software To Track, Manage, And Optimize Every Delivery."
    },
    {
      badge: "COMPREHENSIVE SOLUTIONS:",
      title: "From Heavy Cargo Transport To Fleet Maintenance And Equipment Leasing, We Offer End-To-End Logistics Services Tailored To Your Needs."
    },
    {
      badge: "ACROSS THE GCC:",
      title: "We Provide Services Throughout The UAE, Saudi Arabia, Oman, Qatar, And Beyond—Ensuring Your Cargo Gets To Where It Needs To Be, No Matter The Destination."
    }
  ];

  const leaders = [
    {
      id: 1,
      name: "John Smith",
      title: "CEO",
      experience: "25+ Years In Logistics And Transport Management. Visionary Leader Committed To Operational Excellence",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "CTO",
      experience: "20+ Years In Technology Innovation. Expert In Digital Transformation And Strategic Planning",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Chen",
      title: "COO",
      experience: "18+ Years In Operations Management. Specialized In Supply Chain Optimization And Process Improvement",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      title: "CFO",
      experience: "22+ Years In Financial Management. Expert In Strategic Finance And Risk Management",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "David Wilson",
      title: "VP Marketing",
      experience: "15+ Years In Brand Strategy And Digital Marketing. Passionate About Customer Experience",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === leaders.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? leaders.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Calculate which leaders to show (responsive count)
  const getVisibleLeaders = () => {
    const visible = [];
    const count = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4;
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % leaders.length;
      visible.push({ ...leaders[index], displayIndex: i });
    }
    return visible;
  };

  const visibleLeaders = typeof window !== 'undefined' ? getVisibleLeaders() : leaders.slice(0, 4);

  return (
    <div className="mx-auto p-4 md:p-8 lg:p-16">
      {/* About Us Header Section */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 md:mb-8 gap-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left">
            <span className="text-blue-900">ABOUT</span>{' '}
            <span className="text-red-500">US</span>
          </h1>
          <div className="lg:ml-6 max-w-none lg:max-w-xl">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center lg:text-left">Our Story</h2>
            <div className="space-y-2">
              <p className="text-base md:text-lg font-semibold text-gray-800 text-center lg:text-left">
                Driving The Region Since 1998
              </p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center lg:text-left">
                We Are One Of The UAE's Leading Logistics And Transport Providers, With A Reputation
                Built On Precision, Safety, And Customer-First Service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-gray-300 rounded-2xl h-60 md:h-80 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gray-400 rounded-full mx-auto mb-4"></div>
            <p className="text-xs md:text-sm">Content Placeholder</p>
          </div>
        </div>
        <div className="bg-gray-300 rounded-2xl h-60 md:h-80 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gray-400 rounded-full mx-auto mb-4"></div>
            <p className="text-xs md:text-sm">Content Placeholder</p>
          </div>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="mt-8 md:mt-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 md:mb-8 gap-6">
          <h1 className="text-lg md:text-xl lg:text-2xl text-[rgb(1,1,111)] font-semibold text-center lg:text-left">
            OUR MISSION AND VISION
          </h1>
          <div className="lg:ml-6 max-w-none lg:max-w-xl">
            <div className="space-y-4">
              <div>
                <p className="text-base md:text-lg font-semibold text-[#EF1E24] text-center lg:text-left">
                  MISSION
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center lg:text-left">
                  To provide world-class logistics solutions that exceed expectations, offering unmatched safety, reliability, and on-time delivery, no matter how challenging the task.
                </p>
              </div>
              <div>
                <p className="text-base md:text-lg font-semibold text-[#EF1E24] text-center lg:text-left">
                  VISION
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center lg:text-left">
                  To be the leading logistics and transport partner in the GCC, known for our exceptional service, innovative solutions, and commitment to sustainability.
                </p>
              </div>
              <div className="text-center lg:text-left">
                <button className="text-xs md:text-sm text-white bg-[#01016F] px-4 py-2 rounded-2xl">
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-8 md:mb-12 mt-8 md:mt-16">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 text-center lg:text-left">OUR VALUES</h1>
      </div>

      <div className="space-y-8 md:space-y-16">
        {values.map((value, index) => (
          <div key={value.id} className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-8 lg:gap-72">
              <div className="w-full lg:w-48 flex-shrink-0 text-center lg:text-left">
                <h2 className="text-base md:text-lg text-black font-semibold tracking-wide">
                  {value.title}
                </h2>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 flex-1 lg:justify-end">
                <div className="w-full md:w-64 h-32 md:h-40 bg-gray-400 rounded-lg flex-shrink-0 order-1 md:order-none">
                  <div className="w-full h-full bg-gray-400 rounded-lg"></div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>

            {index < values.length - 1 && (
              <div className="w-full h-px bg-gray-300 mt-8 md:mt-12"></div>
            )}
          </div>
        ))}
      </div>

      {/* Our Fleet Section */}
      <div className="mt-16 md:mt-32">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 md:mb-8 gap-6">
          <h1 className="text-lg md:text-xl lg:text-2xl text-[rgb(1,1,111)] font-semibold text-center lg:text-left">
            OUR FLEET
          </h1>
          <div className="lg:ml-6 max-w-none lg:max-w-xl">
            <div className="space-y-2">
              <p className="text-base md:text-lg font-semibold text-black text-center lg:text-left">
                Precision, Power, and Capability
              </p>
              <p className="text-sm md:text-base text-black leading-relaxed text-center lg:text-left">
                With over 100 vehicles in our fleet, we operate one of the largest and most versatile transport networks in the region. Our fleet is equipped to handle everything from light cargo to oversized, project-specific freight, all managed by experienced drivers and operators. Each vehicle is regularly maintained to ensure maximum safety and efficiency.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-square lg:h-[340px] bg-gray-400 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-8 md:mb-12 mt-8 md:mt-16">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 text-center">
          WHY CHOOSE <span className="text-black">US</span>
        </h1>
      </div>

      <div className="space-y-6 md:space-y-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 justify-between">
            <div className="flex-1 lg:max-w-md order-2 lg:order-1">
              <div className="mb-4 text-center lg:text-left">
                <span className="inline-block bg-[#01016F] text-white text-xs font-bold px-3 py-2 rounded-full uppercase tracking-wide">
                  {feature.badge}
                </span>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed font-medium text-center lg:text-left">
                {feature.title}
              </p>
            </div>
            <div className="w-full lg:w-[40%] h-48 md:h-[260px] bg-gray-400 rounded-lg flex-shrink-0 order-1 lg:order-2">
              <div className="w-full h-full bg-gray-400 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Sustainability Section */}
      <div className="mt-16 md:mt-32">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 md:mb-8 gap-6">
          <h1 className="text-lg md:text-xl lg:text-2xl text-[rgb(1,1,111)] font-semibold text-center lg:text-left">
            SUSTAINABILITY AT OUR CORE
          </h1>
          <div className="lg:ml-6 max-w-none lg:max-w-xl">
            <p className="text-sm md:text-base text-black leading-relaxed text-center lg:text-left">
              We understand the impact our industry can have on the environment, which is why we are dedicated to minimizing our carbon footprint through sustainable practices. This includes eco-friendly vehicle upgrades, route optimization to reduce fuel consumption, and investing in cleaner technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="w-full max-w-7xl mx-auto px-0 md:px-4 py-8 md:py-12 bg-white">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-wider">
            MEET <span className="text-[#01016F]">OUR</span> LEADERSHIP TEAM
          </h2>
        </div>

     <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
  {leaders.map((leader, index) => {
    const isActive = index === currentIndex;
    const isBefore = index < currentIndex;
    const isAfter = index > currentIndex;

    return (
      <div
        key={`${leader.id}-${index}`}
        className={`absolute transition-all duration-700 ease-in-out rounded-xl shadow-lg cursor-pointer group
          ${isActive ? 'z-30 scale-100 blur-0' : 'z-10 scale-90 blur-sm'}
          ${isBefore ? '-translate-x-10 -rotate-3' : ''}
          ${isAfter ? 'translate-x-10 rotate-3' : ''}
        `}
        style={{ width: '320px', height: '460px' }}
        onClick={nextSlide}
      >
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
          <img
            src={leader.image}
            alt={leader.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 p-4 text-white">
            <p className="text-xs font-medium opacity-90">Name</p>
            <h3 className="text-xl font-bold">{leader.title}</h3>
            <p className="text-sm opacity-95 mt-2 line-clamp-4">{leader.experience}</p>
          </div>
        </div>
      </div>
    );
  })}

  
</div>
      </div>

      <Footer/>
    </div>
  );
}