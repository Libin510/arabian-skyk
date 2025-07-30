// components/TruckImage.js
"use client";

import Image from "next/image";
import "../app/Home.css"; // Ensure this path is correct based on your project structure
import { useEffect } from "react";

const TruckImage = ({ dimensions, setTruckArrived }) => {
  const transformStyle = {
    transform: `translateX(${dimensions.width - 100}px) translateY(-${dimensions.height - 90}px)`,
    transition: "transform 2s ease-in-out",
  };
 useEffect(() => {
    const timer = setTimeout(() => {
      setTruckArrived(true);
    }, 2000); // animation duration = 2s
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="box overflow-hidden" style={transformStyle} >
    <Image
      src="/truck.png"
      alt="Truck"
      fill
      className="-rotate-[60deg] sm:-rotate-[38deg] md:-rotate-[45deg] lg:-rotate-[39deg] xl:-rotate-[31deg] 2xl:-rotate-[28deg] object-contain"
    //   sizes="(max-width: 768px) 10px, (max-width: 1024px) 20px, 50px"
      // onLoadingComplete={() => setTruckArrived(true)}
    />
    </div>
  );
};

export default TruckImage;
