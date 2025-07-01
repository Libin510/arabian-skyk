"use client";
import dynamic from "next/dynamic";

const TruckScene1 = dynamic(() => import("./TruckSceen1"), { ssr: false });

export default function TruckWrapper1() {
  return <TruckScene1 />;
}
