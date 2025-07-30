"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroller = () => {
  let lenis;

  useEffect(() => {
    lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []); // Empty dependency array ensures the effect runs only once, on mount

  return <></>;
};

export default SmoothScroller;