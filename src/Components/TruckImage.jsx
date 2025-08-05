"use client";

import Image from "next/image";
import "../app/Home.css";
import { useEffect, useState, useRef } from "react";

const TruckImage = ({ setTruckArrived }) => {
  const [progress, setProgress] = useState(0);
  const stopAt = 0.8;
  const hasAnimated = useRef(false); // ✅ Track animation run

  useEffect(() => {
    if (hasAnimated.current) return; // ✅ Prevent rerun

    const duration = 2000;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const newProgress = Math.min(elapsed / duration, stopAt);
      setProgress(newProgress);

      if (newProgress < stopAt) {
        requestAnimationFrame(animate);
      } else {
        hasAnimated.current = true; // ✅ Mark as done
        setTruckArrived(true);
      }
    };

    requestAnimationFrame(animate);
  }, [setTruckArrived]);

  const translateX = progress * 100;
  const translateY = progress * 100;

  const transformStyle = {
    transform: `translateX(${translateX}vw) translateY(-${translateY}vh)`,
    position: "absolute",
    bottom: 0,
    left: 0,
  };

  return (
    <div className="box" style={transformStyle}>
      <Image
        src="/truck.png"
        alt="Truck"
        fill
        className="-rotate-[60deg] sm:-rotate-[38deg] md:-rotate-[45deg] lg:-rotate-[35deg] xl:-rotate-[27deg] 2xl:-rotate-[28deg] object-contain"
      />
    </div>
  );
};

export default TruckImage;
