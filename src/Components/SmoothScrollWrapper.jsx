"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import ClientNavbar from "@/Components/ClientNavbar";

export default function SmoothScrollWrapper({ children }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <ReactLenis root>
      {!isDashboardRoute && <ClientNavbar />}
      <main>{children}</main>
    </ReactLenis>
  );
}
