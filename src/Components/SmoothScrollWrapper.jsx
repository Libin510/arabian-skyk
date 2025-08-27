"use client";

import { ReactLenis } from "lenis/react";
import Clientnavbar from "@/components/Clientnavbar";
import { usePathname } from "next/navigation";

export default function SmoothScrollWrapper({ children }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <ReactLenis root>
      {!isDashboardRoute && <Clientnavbar />}
      <main>{children}</main>
    </ReactLenis>
  );
}
