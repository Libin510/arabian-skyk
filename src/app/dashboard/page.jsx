"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import OrdersPieChart from "./OrdersPieChart ";
import TableComponent from "./TableComponent ";
import API, { action } from "../Api"; // Import your API configuration
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mouse, ShoppingCart } from "lucide-react";

// Dynamically import ReactQuill to avoid SSR issues


export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    totalOrders: 156,
    serviceClicks: {
      Services: 342,
    },
  });

  const headers = ["Name", "Email", "Role", "Status"];

  const data = [
    {
      name: "Alice",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
    },
    { name: "Bob", email: "bob@example.com", role: "User", status: "Pending" },
    {
      name: "Charlie",
      email: "charlie@example.com",
      role: "Editor",
      status: "Active",
    },
    {
      name: "Dave",
      email: "dave@example.com",
      role: "Admin",
      status: "Inactive",
    },
    { name: "Eve", email: "eve@example.com", role: "User", status: "Active" },
  ];

  const getdasboarddata = async () => {
    try {
      const result = await action(API.GET_DASHBOARD, {});
      if (result?.analytics) {
        setAnalytics(result.analytics);
      } else {
        toast.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    getdasboarddata();
  }, []);

  return (
    <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Orders */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-md font-medium">Total Orders</p>
                      <p className="text-3xl font-bold text-white mt-2">
                        {analytics.totalOrders}
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #F70105, #1131A6)",
                      }}
                    >
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Service Clicks Chart */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Mouse className="w-5 h-5 mr-2" />
                    Clicks Count
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.serviceClicks).map(
                      ([service, clicks]) => (
                        <div
                          key={service}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-300 text-md font-medium">
                            {service}
                          </span>
                          <div className="flex items-center space-x-3">
                            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r rounded-full"
                                style={{
                                  width: `${(clicks /
                                    Math.max(
                                      ...Object.values(
                                        analytics.serviceClicks
                                      )
                                    )) *
                                    100
                                    }%`,
                                  background:
                                    "linear-gradient(135deg, #F70105, #1131A6)",
                                }}
                              />
                            </div>
                            <span className="text-white text-sm font-medium">
                              {clicks}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <OrdersPieChart title={"Order Details"} />
                <TableComponent
                  title="Latest Orders"
                  headers={headers}
                  data={data}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "#18181b",
          color: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.2)",
          fontSize: "1rem",
          border: "1px solid #333"
        }}
        bodyClassName="text-base"
      />
    </div>
  );
}