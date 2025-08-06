'use client';
import { useMediaQuery } from '@/use-media-query';
import { MoveUpRight } from 'lucide-react';
import React, { useState, useRef, useCallback, useEffect } from 'react';
const images = [
  {
    id: 1,
    src: 'https://www.renault-trucks.com/sites/corporate/files/2021-09/p038798%20%281%29.png',
    alt: 'RELIABILITY. EXPERIENCE. SCALE.',
  },
  {
    id: 2,
    src: 'https://cdn.pixabay.com/photo/2019/09/29/20/45/trucks-4514377_1280.jpg',
    alt: 'OVER 25 YEARS OF OPERATION',
  },
  {
    id: 3,
    src: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i9iVU3m.hOg0/v0/-1x-1.webp',
    alt: '100+ FLEET VEHICLES',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    alt: 'OPERATES ACROSS THE GCC',
  },
  {
    id: 5,
    src: 'https://extramiletx.com/wp-content/uploads/2021/10/9-Things-To-Prepare-For-Night-Truck-Driving.jpg',
    alt: '24/7 OPERATIONAL SUPPORT',
  },
];
const ImageReveal = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeImage, setActiveImage] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef(null);
  const requestRef = useRef(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevCursorPosition.current.x;
    const dy = clientY - prevCursorPosition.current.y;
    const easeAmount = 0.2;
    const newX = prevCursorPosition.current.x + dx * easeAmount;
    const newY = prevCursorPosition.current.y + dy * easeAmount;
    setCursorPosition({ x: newX, y: newY });
    prevCursorPosition.current = { x: newX, y: newY };
  }, []);
  useEffect(() => {
    const updateCursorPosition = (e) => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        requestRef.current = null;
      });
    };
    window.addEventListener('mousemove', updateCursorPosition);
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleMouseMove]);
  const handleImageHover = useCallback(
    (image) => {
      if (activeImage !== image) {
        setActiveImage(image);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setOpacity(1);
          setScale(1);
        }, 50);
      } else {
        setOpacity(1);
        setScale(1);
      }
    },
    [activeImage]
  );
  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
    setScale(0.5);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveImage(null);
    }, 300);
  }, []);
  return (
    <div
      className="relative w-full min-h-fit rounded-md"
      onMouseLeave={handleMouseLeave}>
      {images.map((image) => (
        <div
          key={image.id}
          className={`py-2 lg:py-4 cursor-pointer relative sm:flex items-center justify-between`}
          onMouseEnter={() => handleImageHover(image)}>
          {!isDesktop && (
            <img
              src={image?.src}
              className="sm:w-32 sm:h-20 w-full h-52 object-cover rounded-md"
              alt="mobileImg"
            />
          )}
          <h2
            className={`newFont uppercase lg:text-2xl text-lg font-semibold sm:py-6 py-4 leading-[100%] relative ${
              activeImage?.id === image?.id
                ? 'mix-blend-difference z-20 text-black'
                : ' text-gray-500'
            }`}>
            {image.alt}
          </h2>
          <button
            className={`sm:block hidden p-4 rounded-full transition-all duration-300 ease-out ${
              activeImage?.id === image?.id
                ? 'mix-blend-difference z-20 gradient-animate text-white'
                : 'text-black'
            }`}>
            <MoveUpRight className="w-8 h-8" />
          </button>
          <div
            className={`h-[2px] gradient-animate absolute bottom-0 left-0 transition-all duration-300 ease-linear ${activeImage?.id === image?.id ? 'w-full' : 'w-0'}`}
          />
        </div>
      ))}
      {isDesktop && activeImage && (
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className={`fixed dark:bg-gray-950 bg-white object-cover pointer-events-none z-10 w-[300px] h-[400px] rounded-lg`}
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity: opacity,
          }}
        />
      )}
    </div>
  );
};
export default ImageReveal;
