"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";

// ----------------- Truck Component -----------------
function Truck({ scrollSpeed, hasScrolled, scrollDirection, viewWidth }) {
  const { scene } = useGLTF("/truck_gltb_Final.glb");
  const truckRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [wheelPivots, setWheelPivots] = useState([]);

  useEffect(() => {
    if (!scene) return;

    setIsLoaded(true);

    const newPivots = [];

    // Collect wheels by exact name
    const wheelNames = [
      "wheel001",
      "wheel002",
      "wheel003",
      "wheel004",
      "wheel005",
      "wheel006",
      "wheel007",
      "wheel008",
    ];

    scene.traverse((child) => {
    if (child.isMesh) {
      console.log("Mesh:", child.name);
    }
  });

    setWheelPivots(newPivots);
  }, [scene]);

  useFrame((_, delta) => {
    if (!truckRef.current) return;

    if (hasScrolled && scrollSpeed > 0.01) {
      const movement = scrollSpeed * delta * 30;
      const direction = scrollDirection === "down" ? 1 : -1;
      const nextX = truckRef.current.position.x + direction * movement;

      truckRef.current.position.x = nextX;

      // Rotate wheels based on movement
      const rotationAmount = direction * movement * 1.5;
      wheelPivots.forEach((pivot) => {
        // Try rotating on Z-axis first
        pivot.rotation.z -= rotationAmount;
      });
    }
  });

  if (!isLoaded) {
    return (
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    );
  }

  return (
   <primitive
  ref={truckRef}
  object={scene}
  scale={[1.1, 1.1, 1.1]}
position={[-viewWidth / 2 - 3, -1.7, 0]} // ✅ Adjust Y to match vertical alignment
  rotation={[0, Math.PI / 2, 0]}
/>
  );
}

// ----------------- Loading Placeholder -----------------
function LoadingFallback() {
  return (
    <mesh position={[0, -1, 0]}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

// ----------------- Main TruckScene Component -----------------
export default function TruckSceen1() {
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [viewWidth, setViewWidth] = useState(16);
  const sectionRef = useRef(null);

  // Calculate visible world width based on camera settings
  useEffect(() => {
    const calculateViewWidth = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const fov = 35;
      const cameraZ = 20;
      const vHeight = 2 * Math.tan((fov * Math.PI) / 360) * cameraZ;
      const vWidth = vHeight * aspect;
      setViewWidth(vWidth);
    };

    calculateViewWidth();
    window.addEventListener("resize", calculateViewWidth);
    return () => window.removeEventListener("resize", calculateViewWidth);
  }, []);

  // Observe section intersection
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasScrolled(entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1, 0.3, 0.9] }
    );

    observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Scroll speed and direction tracking
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const deltaY = window.scrollY - lastScrollY;
      const deltaTime = Math.max(now - lastTime, 1);

      setScrollDirection(deltaY > 0 ? "down" : "up");
      const speed = Math.abs(deltaY) / deltaTime;
      setScrollSpeed(Math.min(speed, 1));

      lastScrollY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const decayInterval = setInterval(() => {
      setScrollSpeed((prev) => Math.max(prev * 0.95, 0));
    }, 50);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(decayInterval);
    };
  }, []);

  return (
    <div ref={sectionRef} className="left-0 w-[100%] h-[600px] z-0">
      <Canvas
        camera={{ position: [0, 0, -40], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 5, 5]} intensity={0.5} />
          <Truck
            scrollSpeed={scrollSpeed}
            hasScrolled={hasScrolled}
            scrollDirection={scrollDirection}
            viewWidth={viewWidth}
          />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
