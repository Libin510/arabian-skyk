"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Briefcase, 
  ShoppingCart, 
  FileText, 
  Settings,
  Users,
  LogOut
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Careers", href: "/dashboard/careers", icon: Briefcase },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    // { name: "Services", href: "/dashboard/services", icon: Settings },
    { name: "Applications", href: "/dashboard/applications", icon: Users },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed h-screen">
        <div className="p-6 border-b border-gray-700 flex-shrink-0">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        </div>
        
        <nav className="flex-1 px-3 overflow-y-auto">
          <div className="space-y-1 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-64">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
