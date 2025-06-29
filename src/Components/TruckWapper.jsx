"use client";
import dynamic from "next/dynamic";

const TruckScene = dynamic(() => import("./TruckScen"), { ssr: false });

export default function TruckWrapper() {
  return <TruckScene />;
}
