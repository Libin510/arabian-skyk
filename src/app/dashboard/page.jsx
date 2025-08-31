"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import OrdersPieChart from "./OrdersPieChart ";
import TableComponent from "./TableComponent ";
import API, { action } from "../Api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mouse, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../util";

export default function AnalyticsDashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [serviceClicks, setServiceClicks] = useState(0);
  const [services, setServices] = useState([]); // changed to array
  const [pieChartData, setPieChartData] = useState({});
  const [latestOrders, setLatestOrders] = useState([]);

  const setActiveSection = () => {
    router.push("/dashboard/orders");
  };

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const headers = ["Order ID", "Location", "Status"];

  const getdasboarddata = async () => {
    try {
      const result = await action(API.GET_DASHBOARD, {});

      if (result) {
        setOrderCount(result.data.total_count);
        setServiceClicks(result.data.service_click);
        setPieChartData(result.data.orders_by_status || {});
        // Expecting array of { count, serviceName }
        setServices(result.data.service_clicks_by_service || []);

        const formattedOrders = (result.data.latest_orders || []).map(
          (order) => ({
            order_id: order.order_id || "",
            // title: order.title || "",
            location: order.location || "",
            status: order.status || "",
          })
        );

        const sanitizedOrders = formattedOrders.map((order) => ({
          order_id: String(order.order_id ?? ""),
          location: String(order.location ?? ""),
          status: String(order.status ?? ""),
        }));

        setLatestOrders(sanitizedOrders);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    getdasboarddata();
  }, []);

  const pieChartArray =
    pieChartData && typeof pieChartData === "object"
      ? Object.entries(pieChartData).map(([name, value]) => ({
          name,
          value,
        }))
      : [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Orders */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-md font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-white mt-2">{orderCount}</p>
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
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-md font-medium">
                Total Clicks
              </span>
              <div className="flex items-center space-x-3">
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #F70105, #1131A6)",
                    }}
                  />
                </div>
                <span className="text-white text-sm font-medium">
                  {serviceClicks}
                </span>
              </div>
            </div>
            {/* List each service and its click count */}
            {Array.isArray(services) && services.length > 0 && (
              <div className="mt-4">
                <div className="divide-y divide-gray-700">
                  {services.map((service, idx) => (
                    <div
                      key={service.serviceName + idx}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-gray-200 text-sm">
                        {service.serviceName}
                      </span>
                      <span className="text-white text-sm font-semibold">
                        {service.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <OrdersPieChart title={"Order Details"} data={pieChartArray} />

        <div>
          <TableComponent
            title="Latest Orders"
            headers={headers}
            data={latestOrders}
            setActiveSection={setActiveSection}
          />
        </div>
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
          border: "1px solid #333",
        }}
        bodyClassName="text-base"
      />
    </div>
  );
}
