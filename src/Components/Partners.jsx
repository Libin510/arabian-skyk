"use client";

import ScrollBaseAnimation from "../../components/uilayouts/scroll-text-marque";

export default function Partners() {
  const partners = [
    "Deugro Shipping LLC",
    "Grand Mills Company - PJSC",
    "ARCELOR MITTAL DSTC FZE",
    "EVERSENDAI ENGINEERING LLC",
    "Al Nimr Steel Trading LLC",
  ];

  return (
    <section className="relative bg-gradient-section">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#1131A6] to-[#F70105]"></div>
            <span className="text-sm font-medium text-muted-foreground tracking-[0.2em] uppercase">
              Trusted By
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#1131A6] to-[#F70105]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Our <span className="font-semibold text-[#01016F]">Partners</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're proud to work with these industry-leading companies.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden h-[30vh] bg-gradient-to-r from-[#1131A6] via-[#5B00B0] to-[#F70105] flex items-center">
          <ScrollBaseAnimation 
           baseVelocity={3}
                    scrollDependent={true}
                     clasname="text-3xl font-extrabold text-white">
            {partners.map((name, i) => (
              <span key={i} className="px-12">
                {name}
              </span>
            ))}
          </ScrollBaseAnimation>
        </div>
      </div>
    </section>
  );
}
