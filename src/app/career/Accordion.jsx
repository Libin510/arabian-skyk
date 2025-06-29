"use client";

import React from "react";
import { ChevronUp, ChevronDown, MapPin, Clock } from "lucide-react";

const Accordion = ({ data, isExpanded, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl border-3 border-[#01016F] overflow-hidden shadow-sm">
      {/* Header */}
      <div
        onClick={onToggle}
        className="w-full p-6 bg-white hover:bg-gray-50 transition-colors text-left rounded-2xl"
      >
        <div className="flex justify-between items-start mb-2 md:mb-4">
          <h2 className="text-[20px] font-semibold text-gray-900">
            {data.title}
          </h2>
          <div className="flex items-center gap-3">
            <button
              className="bg-[#01016F] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors hidden md:flex"
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
        <button
          className="bg-[#01016F] w-full text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors flex md:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          Apply Now
        </button>
        <div className="flex items-center gap-6 text-gray-600 mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{data.type}</span>
          </div>
        </div>
      </div>

      {/* Body content (only if expanded) */}
      {isExpanded && (
        <div className="bg-[#01016F] text-white">
          <div className="px-6 py-3">
            <h3 className="font-semibold mb-2 text-[16px]">Responsibilities</h3>
            <ul className="space-y-1">
              {data.responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-[14px]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-2">
            <h3 className="font-semibold mb-2">Requirements</h3>
            <ul className="space-y-1">
              {data.requirements.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-white mr-3 mt-1 text-[14px]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
