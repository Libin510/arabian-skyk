"use client";

import ScrollBaseAnimation from "../../components/uilayouts/scroll-text-marque";

export default function Partners() {
  const partners = [
    "DEUGRO SHIPPING LLC",
    "GRAND MILLS COMPANY - PJSC",
    "ARCELOR MITTAL DSTC FZE",
    "EVERSENDAI ENGINEERING LLC",
    "AL NIMR STEEL TRADING LLC",
  ];

  return (
    <section className="relative bg-gradient-section">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-8 flex flex-col gap-3">
          <div className="inline-flex m-auto items-center gap-3 mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#1131A6] to-[#F70105]"></div>
            <span className="text-sm font-medium text-muted-foreground tracking-[0.2em] uppercase">
              Trusted By
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#1131A6] to-[#F70105]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light">
            Our <span className="font-semibold text-[#01016F]">Partners</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're proud to work with these industry-leading companies.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden h-[10vh] flex items-center">
          <ScrollBaseAnimation 
           baseVelocity={3}
                    scrollDependent={true}
                     clasname="text-3xl font-extrabold text-white">
            {partners.map((name, i) => (
              <span key={i} className="px-12 text-black upercase">
                {name}
              </span>
            ))}
          </ScrollBaseAnimation>
        </div>
      </div>
    </section>
  );
}
