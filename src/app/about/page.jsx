// app/about/page.jsx
export default function About() {


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
  return (
    <div className=" mx-auto p-16">
      <div className="mb-12">
        <div className="flex items-start justify-between mb-8">
          <h1 className="text-5xl font-bold mr-6 flex items-center">
            <span className="text-blue-900">ABOUT</span>{' '}
            <span className="text-red-500 ml-2">US</span>
          </h1>
          <div className="ml-6  max-w-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Story</h2>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-800">
                Driving The Region Since 1998
              </p>
              <p className="text-base text-gray-700 leading-relaxed max-w-4xl">
                We Are One Of The UAE's Leading Logistics And Transport Providers, With A Reputation
                Built On Precision, Safety, And Customer-First Service.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-300 rounded-2xl h-80 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-4"></div>
            <p className="text-sm">Content Placeholder</p>
          </div>
        </div>

        <div className="bg-gray-300 rounded-2xl h-80 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-4"></div>
            <p className="text-sm">Content Placeholder</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-start justify-between mb-8">
          <h1 className="text-[24px] text-[rgb(1,1,111)] ">
            our mission and vision

          </h1>
          <div className="ml-6  max-w-xl">

            <div className="space-y-2">
              <p className="text-lg font-semibold text-[#EF1E24]">
                mission
              </p>
              <p className="text-base text-gray-700 leading-relaxed max-w-4xl">
                To provide world-class logistics solutions that exceed expectations, offering unmatched safety, reliability, and on-time delivery, no matter how challenging the task.

              </p>
            </div>
            <div className="space-y-2 mt-4">
              <p className="text-lg font-semibold text-[#EF1E24]">
                vision
              </p>
              <p className="text-base text-gray-700 leading-relaxed max-w-4xl">
                To be the leading logistics and transport partner in the GCC, known for our exceptional service, innovative solutions, and commitment to sustainability.

              </p>
            </div>
            <button className="text-[14px] text-[#FFFFFF] bg-[#01016F] p-2 rounded-2xl mt-4">Get in touch</button>
          </div>

        </div>
      </div>
      <div className="mb-12 mt-16">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">OUR VALUES</h1>
        {/* <div className="w-32 h-1 bg-blue-900"></div> */}
      </div>


      <div className="space-y-16">
        {values.map((value, index) => (
          <div key={value.id} className="relative">

            <div className="flex items-center gap-72 justify-between">

              <div className="w-48 flex-shrink-0">
                <h2 className="text-[18px]  text-black font-semibold tracking-wide">
                  {value.title}
                </h2>
              </div>


              <div className="flex items-center gap-4  flex-1 justify-end">

                <div className="w-64 h-40 bg-gray-400 rounded-lg flex-shrink-0 flex items-center justify-center">

                  <div className="w-full h-full bg-gray-400 rounded-lg"></div>
                </div>

                <div className="flex-1">
                  <p className="text-gray-800 text-[16px] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>


            {index < values.length - 1 && (
              <div className="w-full h-px bg-gray-300 mt-12"></div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-32">
        <div className="flex items-start justify-between mb-8">
          <h1 className="text-[24px] text-[rgb(1,1,111)] ">
            OUR FLEET

          </h1>
          <div className="ml-6  max-w-xl">

            <div className="space-y-2">
              <p className="text-lg font-semibold text-[#000]">
                Precision, Power, and Capability
              </p>
              <p className="text-base text-[#000] leading-relaxed max-w-4xl">
                With over 100 vehicles in our fleet, we operate one of the largest and most versatile transport networks in the region. Our fleet is equipped to handle everything from light cargo to oversized, project-specific freight, all managed by experienced drivers and operators. Each vehicle is regularly maintained to ensure maximum safety and efficiency.

              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4 w-full">
          <div className="w-1/4 h-[340px] bg-gray-400 rounded-lg flex items-center justify-center">

          </div>
          <div className="w-1/4 h-[340px] bg-gray-400 rounded-lg flex items-center justify-center">

          </div>
          <div className="w-1/4 h-[340px] bg-gray-400 rounded-lg flex items-center justify-center">

          </div>
          <div className="w-1/4 h-[340px] bg-gray-400 rounded-lg flex items-center justify-center">

          </div>
        </div>

      </div>
      <div className="mb-12 mt-16">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">WHY CHOOSE <span className="text-black">US</span></h1>
      </div>

      <div className="space-y-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
            {/* Content Section */}
            <div className="flex-1 lg:max-w-md">
              <div className="mb-4">
                <span className="inline-block bg-[#01016F] text-white text-xs font-bold px-3 py-2 rounded-full uppercase tracking-wide">
                  {feature.badge}
                </span>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed font-medium">
                {feature.title}
              </p>
            </div>
            <div className="w-[40%] h-[260px] bg-gray-400 rounded-lg flex-shrink-0 flex items-center justify-center">

              <div className="w-full h-full bg-gray-400 rounded-lg"></div>
            </div>

          </div>
        ))}
      </div>
       <div className="mt-32">
        <div className="flex items-start justify-between mb-8">
          <h1 className="text-[24px] text-[rgb(1,1,111)] ">
            SUSTAINABILITY AT OUR CORE


          </h1>
          <div className="ml-6  max-w-xl">

            <div className="space-y-2">
             
              <p className="text-base text-[#000] leading-relaxed max-w-4xl">
                We understand the impact our industry can have on the environment, which is why we are dedicated to minimizing our carbon footprint through sustainable practices. This includes eco-friendly vehicle upgrades, route optimization to reduce fuel consumption, and investing in cleaner technologies.


              </p>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}