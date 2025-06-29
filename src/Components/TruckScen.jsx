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

    // const wheelNames = [
    //   "wheel001", "wheel002", "wheel003", "wheel004",
    //   "wheel005", "wheel006", "wheel007", "wheel008",
    // ];

    const newPivots = [];

    // wheelNames.forEach((name) => {
    //   const wheel = scene.getObjectByName(name);
    //   if (wheel && wheel.parent) {
    //     const worldPos = new THREE.Vector3();
    //     wheel.getWorldPosition(worldPos);

    //     const pivot = new THREE.Group();
    //     pivot.name = `${name}_pivot`;

    //     // Add pivot to the same parent as the wheel
    //     wheel.parent.add(pivot);
    //     pivot.position.copy(worldPos);

    //     // Move the wheel inside pivot, and reset its position relative to pivot
    //     scene.attach(wheel); // move to scene temporarily to prevent local transform loss
    //     pivot.add(wheel);
    //     wheel.position.set(0, 0, 0);

    //     newPivots.push(pivot);
    //   }
    // });

    setWheelPivots(newPivots);
  }, [scene]);

 useFrame((_, delta) => {
  if (!truckRef.current) return;

  const rotationSpeed = (Math.PI * 2) / 20; // full rotation every 20s

  wheelPivots.forEach((pivot) => {
    if (pivot) {
      // Rotate like a real truck tire — forward/backward
      // pivot.rotation.x += rotationSpeed * delta;
    }
  });

  if (hasScrolled && scrollSpeed > 0.01) {
    const movement = scrollSpeed * delta * 30;
    const direction = scrollDirection === "down" ? 1 : -1;
    const nextX = truckRef.current.position.x + direction * movement;

    const halfWidth = viewWidth / 2;
    if (nextX >= -halfWidth && nextX <= halfWidth) {
      truckRef.current.position.x = nextX;
    }
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
      scale={[1.5, 1.5, 1.5]}
      position={[-viewWidth / 2, -1, 0]}
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
export default function TruckScene() {
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
    <div
      ref={sectionRef}
      className="left-0 w-screen h-[600px] z-0"
    >
      <Canvas camera={{ position: [0, 0, 20], fov: 35 }} gl={{ antialias: true, alpha: true }}>
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
