"use client";
import { ChartPie, TrendingUp } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const OrdersPieChart = ({ title }) => {
  // Sample order data - you can replace this with your dynamic data
  const [orderData, setOrderData] = useState([
    { label: "Completed", value: 450, color: "#10b981" },
    { label: "Pending", value: 180, color: "#f59e0b" },
    { label: "Processing", value: 120, color: "#3b82f6" },
    { label: "Cancelled", value: 50, color: "#ef4444" },
    { label: "Returned", value: 30, color: "#8b5cf6" },
  ]);

  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const total = orderData.reduce((sum, item) => sum + item.value, 0);
  const centerX = 160;
  const centerY = 160;
  const radius = 100;

  // Calculate angles for each segment
  let currentAngle = -90; // Start from top
  const segments = orderData.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    // Calculate path for arc
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    return {
      ...item,
      pathData,
      percentage: ((item.value / total) * 100).toFixed(1),
      isHovered: hoveredSegment === index,
    };
  });

  // Function to update data (for demonstration)
  const updateData = () => {
    setOrderData((prev) =>
      prev.map((item) => ({
        ...item,
        value: Math.floor(Math.random() * 400) + 50,
      }))
    );
  };

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
      <div
        className="relative backdrop-blur-xl rounded-tr-2xl rounded-tl-2xl"
        style={{
          background: "linear-gradient(135deg, #F70105, #1131A6)",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <ChartPie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          {/* Pie Chart Section */}
          <div className="w-full md:w-auto flex-shrink-0 mx-auto">
            <div className="relative">
              <svg
                viewBox="0 0 320 320"
                className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] drop-shadow-xl"
                style={{
                  filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.1))",
                }}
              >
                {segments.map((segment, index) => (
                  <path
                    key={index}
                    d={segment.pathData}
                    fill={segment.color}
                    stroke="white"
                    strokeWidth="3"
                    className={`cursor-pointer transition-all duration-300 ${
                      segment.isHovered
                        ? "opacity-100"
                        : "opacity-90 hover:opacity-100"
                    }`}
                    style={{
                      transformOrigin: `${centerX}px ${centerY}px`,
                      filter: segment.isHovered
                        ? "brightness(1.1) drop-shadow(0 5px 15px rgba(0,0,0,0.3))"
                        : "none",
                      transform: `scale(${animationProgress}) ${
                        segment.isHovered ? "scale(1.05)" : ""
                      }`,
                      transitionDelay: `${index * 100}ms`,
                    }}
                    onMouseEnter={() => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                ))}

                {/* Center circle with total */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="60"
                  fill="white"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                  className="drop-shadow-md"
                  style={{
                    filter: "drop-shadow(0 8px 25px rgba(0,0,0,0.1))",
                  }}
                />
                <text
                  x={centerX}
                  y={centerY - 10}
                  textAnchor="middle"
                  className="text-sm font-semibold fill-gray-600"
                >
                  Total Orders
                </text>
                <text
                  x={centerX}
                  y={centerY + 15}
                  textAnchor="middle"
                  className="text-3xl font-bold fill-gray-800"
                >
                  {total.toLocaleString()}
                </text>
              </svg>

              {/* Hover tooltip */}
              {hoveredSegment !== null && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-gray-900 to-black text-white px-4 py-3 rounded-xl text-sm font-medium shadow-xl border border-gray-700 animate-fade-in backdrop-blur-sm max-w-[240px]">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: segments[hoveredSegment].color,
                      }}
                    />
                    <span>
                      {segments[hoveredSegment].label}:{" "}
                      <strong>{segments[hoveredSegment].value}</strong>
                      {/* (
                        {segments[hoveredSegment].percentage}%) */}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Order Breakdown */}
          <div className="w-full mt-4 md:mt-0">
            <div className="space-y-2">
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className={`group flex items-center justify-between p-3 rounded-md transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:shadow-sm hover:transform hover:scale-105"`}
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="font-medium text-white group-hover:text-gray-800">
                      {segment.label}
                    </span>
                  </div>
                  <div className="font-bold text-white group-hover:text-gray-800">
                    {segment.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPieChart;
