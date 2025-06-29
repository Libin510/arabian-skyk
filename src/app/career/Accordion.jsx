"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown, MapPin, Clock } from "lucide-react";

const Accordion = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-2xl border-3 border-[#01016F] overflow-hidden shadow-sm">
      {/* Header Section - Accordion Trigger */}
      <div
        onClick={toggleAccordion}
        className="w-full p-6 bg-white hover:bg-gray-50 transition-colors text-left rounded-2xl"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-[20px] font-semibold text-gray-900">
            Fleet Operations Manager
          </h2>
          <div className="flex items-center gap-3">
            <button
              className="bg-[#01016F] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Apply Now
            </button>
            {isExpanded ? (
              <ChevronUp size={20} className="text-gray-600" />
            ) : (
              <ChevronDown size={20} className="text-gray-600" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Dubai, UAE</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Full Time</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-[#01016F] text-white">
          <div>
            <div className="p-6">
              <h3 className="font-semibold mb-2 text-[16px]">
                Responsibilities
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-white mr-3  mt-1 text-[14px]">•</span>
                  <span>
                    Coordinate Transportation Schedules And Manage Client
                    Relationships
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-[14px]">•</span>
                  <span>Track Shipments And Provide Updates To Clients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-[14px]">•</span>
                  <span>
                    Collaborate With Drivers And Operations To Ensure Timely
                    Delivery
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-semibold mb-2">Requirements</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-white mr-3 mt-1 text-[14px]">•</span>
                <span>Experience In Logistics Or Supply Chain Management</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-3 mt-1 text-[14px]">•</span>
                <span>Excellent Organizational And Communication Skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-3 mt-1 text-[14px]">•</span>
                <span>
                  Ability To Work In A Fast-Paced, Deadline-Driven Environment
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
