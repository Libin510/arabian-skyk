"use client";

import { ReactLenis } from "lenis/react";
import Clientnavbar from "@/components/Clientnavbar";

export default function SmoothScrollWrapper({ children }) {
  return (
    <ReactLenis root>
      <Clientnavbar />
      <main>{children}</main>
    </ReactLenis>
  );
}
