import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { LuArrowUpRight } from "react-icons/lu";

const imageList = [
  {
    id: "01",
    title: "HEAVY HAULAGE & PROJECT LOGISTICS",
    url: "https://images.unsplash.com/photo-1718183120769-ece47f31045b?w=500&auto=format&fit=crop",
    bg: "#f2f0ee",
    heading: "LOGISTICS",
  },
  {
    id: "02",
    title: "CUSTOMS CLEARANCE",
    url: "https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop",
    bg: "#ffe6d9",
    heading: "CLEARANCE",
  },
  {
    id: "03",
    title: "FLEET MAINTENANCE & ROADSIDE SUPPORT",
    url: "https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop",
    bg: "#f3ecff",
    heading: "MAINTENANCE",
  },
];

export default function StickyGallery({ onChangeBackground }) {
  const sectionRefs = useRef([]);
  const [activeHeading, setActiveHeading] = useState(imageList[0].heading);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.reduce((prev, curr) =>
          prev.intersectionRatio > curr.intersectionRatio ? prev : curr
        );

        const index = sectionRefs.current.findIndex(
          (ref) => ref === visibleEntry.target
        );

        if (index !== -1) {
          onChangeBackground(imageList[index].bg);
          setFade(true); // Trigger fade-out
          setTimeout(() => {
            setActiveHeading(imageList[index].heading);
            setFade(false); // Trigger fade-in
          }, 150); // Delay update slightly for better animation timing
        }
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [onChangeBackground]);

  return (
    <section className="text-white w-full relative">
      {/* Sticky Heading */}
      <div className="sticky top-0 w-full flex items-center justify-center pointer-events-none">
        <p
          className={`text-[10vw] text-black font-extralight transition-opacity duration-300 ease-in-out ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {activeHeading}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="grid gap-2">
          {imageList.map((item, index) => (
            <figure
              key={item.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="sticky top-0 h-[70vh] md:h-screen grid place-content-center pt-0 lg:pt-[14rem]"
            >
              <div className="bg-gradient-to-r from-[#1131A6] to-[#F70105] rounded-md overflow-hidden h-[55vh] lg:w-[40vw] lg:h-[45vh] 2xl:w-[35vw] 2xl:h-[55vh]">
                <div className="text-left mb-4 mt-4 ml-4">
                  <h3 className="font-semibold text-white text-sm md:text-2xl mb-3 sm:mb-4">
                    {index + 1}. {item.title}
                  </h3>
                </div>
                <img
                  src={item.url}
                  alt={item.title}
                  className="transition-all duration-300 w-full h-full object-cover align-bottom"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* Right CTA Column */}
        <div className="hidden sticky top-0 h-screen md:grid place-content-center pt-0 lg:pt-[14rem]">
          <div>
            <div className="sticky top-8 self-end">
              <Image
                src="/Truckmg.png"
                alt="Truck"
                width={600}
                height={120}
                className="justify-self-end mt-10 w-[40vw] h-[16vh] lg:w-[35vw] lg:h-[27vh] 2xl:w-[25vw] 2xl:h-[22vh]"
              />
            </div>

            <div className="sticky top-32 flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-40 lg:h-40 p-5 bg-[#01016F] rounded-full flex items-center justify-center group hover:scale-110 transition-all duration-300 cursor-pointer pulse-glow">
                <svg
                  className="absolute inset-0 w-full h-full spin-slow"
                  viewBox="0 0 128 128"
                >
                  <defs>
                    <path
                      id="circle-path-desktop"
                      d="M 64, 64 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                    />
                  </defs>
                  <text className="fill-white text-sm sm:text-lg lg:text-xl font-normal tracking-wider">
                    <textPath href="#circle-path-desktop" startOffset="0%">
                      Explore More • Explore More •
                    </textPath>
                  </text>
                </svg>
                <div className="bg-white text-2xl rounded-full p-5 z-10 group-hover:rotate-45 transition-transform duration-300">
                  <LuArrowUpRight className="text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
