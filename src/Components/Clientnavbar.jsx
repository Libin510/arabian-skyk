
"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientNavbar() {
  const pathname = usePathname();

  // Add routes where Navbar should be hidden
  const noNavbarRoutes = ["/login", "/register","/dashboard"];

  if (noNavbarRoutes.includes(pathname)) return null;

  return <Navbar />;
}
