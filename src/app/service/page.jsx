export default function Service() {
  const ourServices = [
    {
      id: 1,
      title: "Heavy Haulage & Project Cargo",
      image: "",
      description:
        "We specialize in transporting oversized and heavy cargo safely, on time, and with precision. Whether it's machinery, construction equipment, or large project components, we ensure your cargo reaches its destination securely.",
      features: [
        {
          title: "Tailored Solutions",
          desc: "For Large And Complex Shipments",
        },
        {
          title: "Expert Drivers & Equipment",
          desc: "For Handling Sensitive And Oversized Loads",
        },
        {
          title: "Compliance With Local Regulations",
          desc: "To Ensure Safe And Timely Delivery",
        },
      ],
    },
    {
      id: 2,
      title: "Equipment Rental & Leasing",
      image: "",
      description:
        "Our fleet of modern, well-maintained trucks and machinery is available for short- and long-term lease. We offer **flexible rental solutions** that help businesses across sectors with heavy lifting, construction, and more.",
      features: [
        {
          title: "Wide Range of Vehicles & Machinery",
          desc: "including cranes, flatbeds, and low-loaders",
        },
        {
          title: "On-Demand Rental Services",
          desc: "to meet immediate project needs",
        },
        {
          title: "Flexible Terms",
          desc: "for both long-term and short-term rentals",
        },
      ],
    },
    {
      id: 3,
      title: "Customs Clearance",
      image: "",
      description:
        "Navigating the complexities of cross-border transportation can be challenging. Our experienced team handles **customs clearance** quickly and efficiently to ensure your shipments cross borders without delay.",
      features: [
        {
          title: "Seamless Import & Export Processes",
          desc: "for hassle-free international shipping",
        },
        {
          title: "Expert Knowledge of GCC Regulations",
          desc: "to ensure compliance",
        },
        {
          title: "Fast & Reliable Service",
          desc: "that gets your cargo to its destination on time",
        },
      ],
    },
    {
      id: 4,
      title: "Fleet Maintenance & 24/7 Support",
      image: "",
      description:
        "We keep our fleet in top condition through regular maintenance, ensuring maximum safety and reliability on every trip. Our 24/7 support team is always on hand to assist with any issues that may arise during transportation.",
      features: [
        {
          title: "Routine Fleet Inspections & Maintenance",
          desc: "to prevent downtime",
        },
        {
          title: "24/7 Roadside Assistance",
          desc: "for emergencies",
        },
        {
          title: "Experienced Technicians",
          desc: "who ensure our fleet is always operational",
        },
      ],
    },
  ];

  const whyChooseUs = [
    {
      title: "Over 25 Years of Experience",
      image: "",
      description:
        "With decades in the logistics and transport industry, we have the expertise to handle all your transport and logistics needs.",
    },
    {
      title: "Cutting-Edge Technology",
      image: "",
      description:
        "We utilize the latest tracking and management software to keep you updated on your cargo’s status.",
    },
    {
      title: "Scalability",
      image: "",
      description:
        "No matter the size of your shipment or project, we have the resources and flexibility to meet your demands.",
    },
    {
      title: "Across the GCC",
      image: "",
      description:
        " We offer services in the UAE, Saudi Arabia, Oman, Qatar, and beyond, so we can meet your needs wherever you are.",
    },
  ];

  return (
    <div className="flex flex-col gap-[32px] px-8 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 p-0 lg:p-4 gap-4 lg:gap-0">
        <h1 className="text-[50px] lg:text-[75px] text-[#01016F] font-semibold uppercase">
          our <span className="text-[#EF1E24]">services</span>
        </h1>
        <div className="flex flex-col gap-2 w-auto lg:max-w-[600px] ">
          <p className="text-[20px] lg:text-[24px] font-semibold uppercase">
            Logistics and Transport Solutions Tailored to Your Needs
          </p>
          <p className="text-[18px] lg:text-[20px]">
            At Arabian Sky Transport, we offer a wide range of services designed
            to meet the diverse logistics needs of businesses across the UAE and
            GCC. Whether you're managing a heavy cargo shipment, looking for
            reliable equipment rentals, or need comprehensive fleet support, our
            team is ready to deliver solutions that keep your operations running
            smoothly.
          </p>
          <div className="flex gap-2 items-center justify-center bg-[#01016F] text-white p-2 max-w-[135px] rounded-[30px]">
            <p className="text-[14px]">get in touch</p>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
            >
              <rect width="28" height="27" rx="13.5" fill="white" />
              <path
                d="M10.1824 18.7166C10.0165 18.5664 9.91708 18.3565 9.90595 18.133C9.89483 17.9095 9.97294 17.6907 10.1231 17.5248L16.7569 10.1959L11.8224 10.7171C11.6006 10.7393 11.379 10.6728 11.2061 10.5321C11.0331 10.3914 10.9229 10.188 10.8994 9.96634C10.876 9.74465 10.9412 9.52268 11.0809 9.34893C11.2206 9.17519 11.4233 9.06377 11.6449 9.03903L18.7757 8.2858C18.8939 8.27318 19.0134 8.28567 19.1264 8.32245C19.2394 8.35923 19.3434 8.41947 19.4315 8.49923C19.5196 8.57899 19.5899 8.67646 19.6377 8.78527C19.6855 8.89407 19.7098 9.01175 19.709 9.1306L19.6677 16.301C19.6677 16.4122 19.6457 16.5223 19.603 16.625C19.5603 16.7277 19.4977 16.8209 19.4188 16.8993C19.3399 16.9777 19.2463 17.0397 19.1434 17.0818C19.0405 17.1239 18.9302 17.1453 18.819 17.1446C18.7078 17.144 18.5978 17.1213 18.4954 17.078C18.3929 17.0347 18.3001 16.9716 18.2221 16.8922C18.1442 16.8129 18.0827 16.7189 18.0412 16.6158C17.9997 16.5126 17.979 16.4022 17.9803 16.291L18.008 11.3283L11.3742 18.6573C11.224 18.8232 11.0141 18.9226 10.7906 18.9338C10.5671 18.9449 10.3483 18.8668 10.1824 18.7166Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-[#BEBDBD] h-[465px] w-auto rounded-[16px]"></div>

      <div>
        <h1 className="text-[30px] lg:text-[50px] text-[#01016F] text-center uppercase font-semibold mt-[40px] lg:mt-[115px]">
          our key services
        </h1>
        <div className="mt-8">
          {ourServices.map((service, index) => (
            <div
              className="bg-white p-6 lg:p-12 max-w-7xl mx-auto flex flex-col gap-[32px] border border-gray-200 rounded-[16px] shadow-lg mb-8"
              key={index}
            >
              <div className="w-full flex flex-col sm:flex-row items-center sm:items-baseline justify-between gap-4 sm:gap-6">
                <span className="text-4xl sm:text-6xl font-bold text-blue-900">
                  0{service.id}.
                </span>

                <div className="w-full sm:flex-1 flex justify-center text-center">
                  <h2 className="text-2xl sm:text-4xl font-bold text-black uppercase tracking-wider leading-tight">
                    {service.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mt-0 lg:mt-8">
                <div className="space-y-8">
                  <div className="space-y-8">
                    <p className="text-black text-base sm:text-lg leading-relaxed font-medium">
                      {service.description}
                    </p>

                    <div className="space-y-6">
                      {service.features &&
                        service.features.length > 0 &&
                        service.features.map((item, index) => (
                          <div className="flex items-start gap-4" key={index}>
                            <div className="w-4 h-4 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                            <div className="space-y-1">
                              <h3 className="font-bold text-blue-900 text-base sm:text-lg uppercase tracking-wide">
                                {item.title}
                              </h3>
                              <p className="text-black font-medium text-sm sm:text-base">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="pt-2">
                      <button className="bg-blue-900 text-white px-2 sm:px-4 py-2 sm:py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors duration-300 flex items-center gap-3 text-sm sm:text-base">
                        Learn More
                        <div className="w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-blue-900"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="bg-[#BEBDBD] rounded-2xl w-full h-72 sm:h-[454px] max-w-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:mb-[200px]">
        <h1 className="text-[30px] lg:text-[50px]  text-center uppercase font-semibold mt-[20px] lg:mt-[60px]">
          <span className="text-[#01016F]">why choose</span> us
        </h1>
        <div className="bg-white py-8 px-4 max-w-7xl mx-auto mt-8 grid gap-12">
          {whyChooseUs.map((item, index) => (
            <div
              className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8"
              key={index}
            >
              <div className="text-center lg:text-left">
                <h2 className="text-[18px]  font-bold text-black uppercase tracking-wide whitespace-nowrap">
                  {item.title}
                </h2>
              </div>

              <div>
                <div className="bg-[#BEBDBD] rounded-lg w-[350px] max-w-xs h-[220px] mx-auto lg:mx-0"></div>
              </div>

              <div className="ml-0 lg:ml-4 text-center lg:text-left">
                <p className="text-black text-[16px]  font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 lg:mt-0 justify-self-center lg:justify-self-end">
                <svg
                  className="w-6 h-6 lg:w-8 lg:h-8 text-black mx-auto lg:mx-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </div>

              {/* Divider */}
              {whyChooseUs.length - 1 !== index && (
                <div className="col-span-full border-t border-[#1E1E1E]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
