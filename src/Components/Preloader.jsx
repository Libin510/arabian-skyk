"use client";

import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Animate particles
    controls.start("animate");

    return () => clearInterval(interval);
  }, [controls]);

  const particles = Array.from({ length: 50 });
  const letters = "LAHAE".split("");
  const shapes = Array.from({ length: 4 });

  const particleVariants = {
    initial: (i) => ({
      opacity: 0,
      scale: 0,
      x: Math.random() * 1000 - 500,
      y: Math.random() * 1000 - 500,
      rotate: Math.random() * 360,
    }),
    animate: (i) => ({
      opacity: [0, 0.5, 0],
      scale: [0, 1, 0],
      x: 0,
      y: 0,
      rotate: i * 45,
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.02,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  };

  const letterVariants = {
    initial: {
      y: 400,
      rotateX: 90,
      opacity: 0,
    },
    animate: (i) => ({
      y: 0,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: i * 0.1,
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    }),
    exit: (i) => ({
      y: -400,
      rotateX: -90,
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.05,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
    hover: {
      scale: 1.2,
      rotateY: 180,
      color: "hsl(var(--primary))",
      transition: { duration: 0.3 },
    },
  };

  const progressBarVariants = {
    initial: {
      scaleX: 0,
      filter: "hue-rotate(0deg)",
    },
    animate: {
      scaleX: progress / 100,
      filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"],
      transition: {
        duration: 0.4,
        filter: {
          duration: 2,
          repeat: Infinity,
        },
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100vh",
            transition: {
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96],
            },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#8a714a] overflow-hidden perspective-1000"
        >
          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={particleVariants}
                initial="initial"
                animate="animate"
                className="absolute left-1/2 top-1/2 w-2 h-2 bg-white rounded-full"
              />
            ))}
          </div>

          <div className="transform-3d">
        
            {/* <motion.div
              className="flex items-center space-x-4 mb-12"
              style={{ perspective: 1000 }}
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  className="text-9xl font-bold text-black relative cursor-pointer transform-3d"
                  style={{
                    textShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div> */}

           
            {/* <div className=" w-64 mx-auto mt-12">
              <motion.div
                className="h-1 w-full bg-white/50 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="h-full bg-black"
                  variants={progressBarVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>
            </div> */}
            
          </div>
          <motion.p
            className="text-center text-[25vw] md:text-[12vw] leading-none text-white absolute bottom-0 left-0"
            initial={{ opacity: 0, y: 20, rotateX: 90 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { delay: 0.5, duration: 0.8 },
            }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}