"use client";
import React, { useState } from "react";
import { ChevronRight, Eye, TrendingUp, Filter } from "lucide-react";

const TableComponent = ({ title, headers, data, setActiveSection }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  // Sample data if none provided
  const sampleData = data?.length && data;

  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "Order Confirmed": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "In Progress": "bg-amber-500/20 text-amber-400 border-amber-500/30",
      Shipped: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
      Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
      Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl w-full h-full">
      {/* Stylish Header */}
      <div
        className="relative backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, #F70105, #1131A6)",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="flex items-center space-x-2 px-6 py-2 bg-white text-gray-900 hover:bg-white/90 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => setActiveSection()}
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="p-6">
        <div className="overflow-hidden">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-white/20">
                {headers?.map((header, index) => (
                  <th key={index} className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">
                        {header}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/10">
              {sampleData && sampleData?.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`group transition-all duration-300 ${
                    hoveredRow === rowIndex
                      ? "bg-white/10 transform scale-[1.02]"
                      : "hover:bg-white/5"
                  }`}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {headers?.map((header, colIndex) => {
                    const key = header.toLowerCase().replace(" ", "_");
                    return (
                      <td key={colIndex} className="px-6 py-4">
                        {key === "status" ? (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              item[key]
                            )}`}
                          >
                            <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                            {item[key]}
                          </span>
                        ) : key === "amount" ? (
                          <span className="text-white font-semibold text-lg">
                            {item[key]}
                          </span>
                        ) : key === "customer" ? (
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                              {item[key]?.charAt(0)}
                            </div>
                            <span className="text-white/90 font-medium">
                              {item[key]}
                            </span>
                          </div>
                        ) : key === "order_id" ? (
                          <span className="text-blue-400 font-mono font-semibold">
                            {item[key]}
                          </span>
                        ) : (
                          <span className="text-white/80">{item[key]}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
