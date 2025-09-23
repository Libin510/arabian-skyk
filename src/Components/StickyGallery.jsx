import { useRef, useEffect, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { useRouter } from "next/navigation";

const imageList = [
  {
    id: "01",
    title: "HEAVY HAULAGE & PROJECT LOGISTICS",
    url: "longTruck.jpg",
    bg: "#f2f0ee",
    heading: "LOGISTICS",
    description:
      "We specialize in safe, on-time transport of oversized and heavy cargo, offering tailored solutions, expert drivers, and compliance with all regulations for secure delivery.",
  },
  {
    id: "02",
    title: "CUSTOMS CLEARANCE",
    url: "./custom.jpg",
    bg: "#ffe6d9",
    heading: "CLEARANCE",
    description:
      "We provide fast and reliable cross-border transportation with expert customs clearance, seamless import and export processes, and full compliance with GCC regulations.",
  },
  {
    id: "03",
    title: "FLEET MAINTENANCE & ROADSIDE SUPPORT",
    url: "https://cdn.prod.website-files.com/5bcf95411e70df20404f914c/5f999c84aed62b15a5304209_Fleet%20Managers%20Should%20Handle%20Roadside%20-Blog-th.jpg",
    bg: "#f3ecff",
    heading: "MAINTENANCE",
    description:
      "We offer flexible short- and long-term truck and machinery rentals, including cranes, flatbeds, and low-loaders, to support construction, heavy lifting, and on-demand project needs.",
  },
];

export default function StickyGallery({ onChangeBackground }) {
  const sectionRefs = useRef([]);
  const [activeHeading, setActiveHeading] = useState(imageList[0].heading);
  const [activeDescription, setActiveDescription] = useState(
    imageList[0].description
  );
  const [fade, setFade] = useState(false);
  const router = useRouter();

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
          setFade(true); // fade out
          setTimeout(() => {
            setActiveHeading(imageList[index].heading);
            setActiveDescription(imageList[index].description);
            setFade(false); // fade in
          }, 150);
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
          className={`text-[10vw] text-black/85 transition-opacity duration-300 ease-in-out ${
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
              <div className="bg-gradient-to-r from-[#1131A6] to-[#F70105] rounded overflow-hidden h-[55vh] lg:w-[40vw] lg:h-[45vh] 2xl:w-[35vw] 2xl:h-[55vh]">
                <div className="text-left mb-4 mt-4 ml-4">
                  <h3 className="font-semibold text-white text-sm md:text-2xl mb-3 sm:mb-4">
                    {index + 1}. {item.title}
                  </h3>
                </div>
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-fit transition-all duration-300"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* Right Description Column */}
        <div className="hidden sticky top-0 h-screen md:grid place-content-center pt-0 lg:pt-[14rem]">
          <div>
            {/* Replace Truck Image with Text */}
            <div className="sticky top-8 self-end max-w-lg px-6">
              <p
                className={`text-lg md:text-xl lg:text-2xl font-medium text-black transition-opacity duration-300 ease-in-out ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
              >
                {activeDescription}
              </p>
            </div>

            {/* CTA Circle */}
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
                <div
                  onClick={() => router.push("/services")}
                  className="bg-white text-2xl rounded-full p-5 z-10 group-hover:rotate-45 transition-transform duration-300"
                >
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
