"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense, memo } from "react";
import * as THREE from "three";

// ----------------- Truck Component -----------------
const Truck = memo(function Truck({ scrollSpeed, hasScrolled, scrollDirection, viewWidth }) {
  const { scene } = useGLTF("/Truck_gltb_remesh_Test1_darco_ktx2.glb");
  const truckRef = useRef();
  const wheelPivots = useRef([]);

  useEffect(() => {
    if (!scene) return;

    // Collect wheel meshes by name
    const wheelNames = [
      "WheelFL",
      "WheelFR",
      "wheel",
      "wheel001",
      "wheel002",
      "wheel003",
      "wheel004",
      "wheel005",
      "wheel006",
      "wheel007",
    ];

    scene.traverse((child) => {
      if (child.isMesh && wheelNames.includes(child.name)) {
        wheelPivots.current.push(child);
        child.frustumCulled = false; // avoid popping
      }
    });

    truckRef.current = scene;
  }, [scene]);

  useFrame((_, delta) => {
    if (!truckRef.current || !hasScrolled || scrollSpeed < 0.01) return;

    const movement = scrollSpeed * delta * 30;
    const direction = scrollDirection === "down" ? 1 : -1;
    truckRef.current.position.x += direction * movement;

    const rotationAmount = direction * movement * 1.5;
    wheelPivots.current.forEach((pivot) => {
      pivot.rotation.x -= rotationAmount;
    });
  });

  return (
    <primitive
      object={scene}
      scale={[1.5, 1.5, 1.5]}
      position={[-viewWidth / 2, -1, 0]}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
});

// ----------------- Placeholder While Loading -----------------
function LoadingFallback() {
  return (
    <mesh position={[0, -1, 0]}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color="#999" />
    </mesh>
  );
}

// ----------------- TruckScene -----------------
export default function TruckScene() {
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [viewWidth, setViewWidth] = useState(16);
  const sectionRef = useRef(null);

  // Handle visible width calculation
  useEffect(() => {
    const updateView = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const fov = 35;
      const z = 20;
      const vHeight = 2 * Math.tan((fov * Math.PI) / 360) * z;
      setViewWidth(vHeight * aspect);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // Scroll intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasScrolled(entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1, 0.5, 1] }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  // Scroll speed tracker
  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = Date.now();

    const onScroll = () => {
      const now = Date.now();
      const deltaY = window.scrollY - lastY;
      const deltaTime = Math.max(now - lastTime, 1);

      setScrollDirection(deltaY > 0 ? "down" : "up");
      setScrollSpeed(Math.min(Math.abs(deltaY) / deltaTime, 1));

      lastY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const decay = setInterval(() => {
      setScrollSpeed((prev) => Math.max(prev * 0.95, 0));
    }, 50);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(decay);
    };
  }, []);

  return (
    <div ref={sectionRef} className="left-0 w-full h-[600px] !px-0 z-0">
      <Canvas camera={{ position: [0, 0, 20], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
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
