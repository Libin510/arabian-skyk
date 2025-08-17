"use client";
import React, { useState, useRef } from 'react'

function page() {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dummyTimeline = [
    {
      status: "Order Placed",
      date: "2025-08-01",
      location: "Riyadh",
      description: "Your order has been placed successfully.",
    },
    {
      status: "Processing",
      date: "2025-08-02",
      location: "Warehouse",
      description: "Your order is being prepared.",
    },
    {
      status: "Shipped",
      date: "2025-08-03",
      location: "Riyadh",
      description: "Your order has been shipped.",
    },
    {
      status: "Out for Delivery",
      date: "2025-08-04",
      location: "Jeddah",
      description: "Your order is out for delivery.",
    },
    {
      status: "Delivered",
      date: "2025-08-05",
      location: "Jeddah",
      description: "Your order has been delivered.",
    },
  ];

  const handleTrackOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.example.com/order/${orderId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.timeline && data.timeline.length > 0) {
        setOrderStatus(data.timeline);
      } else {
        setOrderStatus(dummyTimeline); // Use dummy data if timeline is empty
      }
    } catch (err) {
      setOrderStatus(dummyTimeline); // Use dummy data if API fails
      setError("API not working, showing dummy data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-16 text-center leading-tight">
            Track Your Order
        </h1>
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl flex flex-col items-center border border-gray-200">
            <input
                type="text"
                placeholder="Enter Order ID"
                className="w-full p-4 border border-gray-300 rounded-lg mb-6 text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out transform hover:scale-105"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
            <button
                className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                onClick={handleTrackOrder}
            >
                Track Order
            </button>
        </div>

        {loading && <p className="text-center mt-8 text-blue-600 font-semibold text-lg">Tracking your order...</p>}
        {error && <p className="text-center mt-8 text-red-600 font-semibold text-lg">Error: {error}. Please try again.</p>}
        
        {orderStatus.length === 0 && !loading && !error && orderId && (
            <p className="text-center mt-8 text-gray-600 text-lg">No tracking information found for Order ID: <span className="font-semibold">{orderId}</span></p>
        )}

        {/* Timeline Display */}
        {orderStatus.length > 0 && (
            <div className="mt-16 w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Order Status Timeline</h2>
                <div className="relative pl-12">
                    <div className="absolute left-4 top-0 h-full w-1.5 bg-blue-300 rounded-full"></div>
                    {orderStatus.map((status, index) => (
                        <div key={index} className="mb-10 relative flex items-start">
                            <div className="absolute -left-2 top-0 mt-1 w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow-md flex items-center justify-center z-10">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div className="ml-8 bg-gray-50 p-6 rounded-lg shadow-sm flex-1 transform transition duration-300 ease-in-out hover:scale-102 hover:shadow-md border border-gray-100">
                                <p className="font-bold text-xl text-gray-900 mb-1">{status.status}</p>
                                <p className="text-sm text-gray-600 mb-2">{status.date} &mdash; {status.location}</p>
                                <p className="text-gray-700 leading-relaxed">{status.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default page