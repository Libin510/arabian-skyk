"use client";
import React, { useState, useEffect, use } from "react";
import dynamic from "next/dynamic";
import CustomTextEditor from "../../Components/CustomTextEditor";
import {
  BarChart3,
  Users,
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Menu,
  X,
  LogOut,
  Home,
  Briefcase,
  Package,
  MapPin,
  Calendar,
  TrendingUp,
  Mouse,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Mail,
  Phone,
  DollarSign,
  Save,
  Cancel,
} from "lucide-react";
import Link from "next/link";
import OrdersPieChart from "./OrdersPieChart ";
import TableComponent from "./TableComponent ";
import JobApplications from "./JobApplications";
import API, { action } from "../Api"; // Import your API configuration
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("analytics");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Career Management State
  const [careers, setCareers] = useState([]);
  const [isLoadingCareers, setIsLoadingCareers] = useState(false);
  const [isCareerLoading, setIsCareerLoading] = useState(false);
  // Orders State
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    totalOrders: 156,
    serviceClicks: {
      Services: 342,
    },
  });

  // Service Management State
  const [services, setServices] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    image: null,
    description: "",
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

  // Modal States
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  // Form States
  const [careerForm, setCareerForm] = useState({
    post: "",
    place: "",
    type: "Full Time",
    description: "",
  });

  const [orderForm, setOrderForm] = useState({
    title: "",
    department: "",
    location: "UAE",
    status: "Order Confirmed",
    userId: "6881c8059b27890265f3cbef", // Default user ID or get from auth
  });

  // Fetch data when section changes
  useEffect(() => {
    if (activeSection === "careers") {
      fetchCareers();
    } else if (activeSection === "orders") {
      fetchOrders();
    } else if (activeSection === "services") {
      fetchServices();
    }
    // Job applications are handled within the component itself
  }, [activeSection]);

  // API Functions for Careers
  const fetchCareers = async () => {
    setIsLoadingCareers(true);
    try {
      const result = await action(API.GET_CAREER);
      console.log("Fetched careers:", result);

      if (result?.careers) {
        setCareers(result.careers);
      } else if (Array.isArray(result)) {
        setCareers(result);
      }
    } catch (error) {
      console.error("Error fetching careers:", error);
      toast.error("Failed to fetch careers");
    } finally {
      setIsLoadingCareers(false);
    }
  };

  const createCareer = async (careerData) => {
    setIsCareerLoading(true);
    try {
      const result = await action(API.ADD_CAREER, careerData);
      console.log("Career created:", result);

      toast.success("Career posted successfully!", {
        style: {
          backgroundColor: "#E8F5E9",
          color: "#2E7D32",
          border: "1px solid #66BB6A"
        }
      });

      await fetchCareers();
      return true;
    } catch (error) {
      console.error("Error creating career:", error);
      toast.error(error?.response?.data?.message || "Failed to create career");
      return false;
    } finally {
      setIsCareerLoading(false);
    }
  };

  const updateCareer = async (id, careerData) => {
    setIsCareerLoading(true);
    try {
      const result = await action(API.UPDATE_CAREER, careerData, id);
      console.log("Career updated:", result);

      toast.success("Career updated successfully!", {
        style: {
          backgroundColor: "#E8F5E9",
          color: "#2E7D32",
          border: "1px solid #66BB6A"
        }
      });

      await fetchCareers();
      return true;
    } catch (error) {
      console.error("Error updating career:", error);
      toast.error(error?.response?.data?.message || "Failed to update career");
      return false;
    } finally {
      setIsCareerLoading(false);
    }
  };

  const deleteCareer = async (career) => {
    try {
      const id = career._id;
      const result = await action(API.DELETE_CAREER, { id });
      console.log("Career deleted:", result);

      toast.success("Career deleted successfully!", {
        style: {
          backgroundColor: "#E8F5E9",
          color: "#2E7D32",
          border: "1px solid #66BB6A"
        }
      });

      await fetchCareers();
    } catch (error) {
      console.error("Error deleting career:", error);
      toast.error(error?.response?.data?.message || "Failed to delete career");
    }
  };

  // API Functions for Orders
  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const result = await action(API.GET_ORDER);
      console.log("Fetched orders:", result);

      if (result?.orders) {
        setOrders(result.orders);
      } else if (Array.isArray(result)) {
        setOrders(result);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const createOrder = async (orderData) => {
    setIsOrderLoading(true);
    try {
      const result = await action(API.ADD_ORDER, orderData);
      console.log("Order created:", result);

      toast.success("Order created successfully!", {
        style: {
          backgroundColor: "#E8F5E9",
          color: "#2E7D32",
          border: "1px solid #66BB6A"
        }
      });

      await fetchOrders();
      return true;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error?.response?.data?.message || "Failed to create order");
      return false;
    } finally {
      setIsOrderLoading(false);
    }
  };

  const updateOrder = async (id, orderData) => {
    setIsOrderLoading(true);
    try {
      const result = await action(API.UPDATE_ORDER, orderData, id);
      console.log("Order updated:", result);

      toast.success("Order updated successfully!", {
        style: {
          backgroundColor: "#E8F5E9",
          color: "#2E7D32",
          border: "1px solid #66BB6A"
        }
      });

      await fetchOrders();
      return true;
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error(error?.response?.data?.message || "Failed to update order");
      return false;
    } finally {
      setIsOrderLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const result = await action(API.DELETE_ORDER, { id });
      console.log("Order deleted:", result);

      toast.success("Order deleted successfully!", {
        style: {
          backgroundColor: "#E8F5E9",
          color: "#2E7D32",
          border: "1px solid #66BB6A"
        }
      });

      await fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error(error?.response?.data?.message || "Failed to delete order");
    }
  };

  // API Functions for Services
  const fetchServices = async () => {
    setIsLoadingServices(true);
    try {
      const result = await action(API.GET_SERVICE);
      if (result?.services) {
        setServices(result.services);
      } else if (Array.isArray(result)) {
        setServices(result);
      }
    } catch (error) {
      toast.error("Failed to fetch services");
    } finally {
      setIsLoadingServices(false);
    }
  };

  const createService = async (serviceData) => {
    setIsServiceLoading(true);
    try {
      const result = await action(API.ADD_SERVICE, serviceData);
      toast.success("Service created successfully!");
      await fetchServices();
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create service");
      return false;
    } finally {
      setIsServiceLoading(false);
    }
  };

  const updateService = async (id, serviceData) => {
    setIsServiceLoading(true);
    try {
      const result = await action(API.UPDATE_SERVICE, serviceData, id);
      toast.success("Service updated successfully!");
      await fetchServices();
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update service");
      return false;
    } finally {
      setIsServiceLoading(false);
    }
  };

  const deleteService = async (id) => {
    try {
      const result = await action(API.DELETE_SERVICE, { id });
      toast.success("Service deleted successfully!");
      await fetchServices();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete service");
    }
  };

  // Career Handlers
  const handleAddCareer = () => {
    setEditingCareer(null);
    setCareerForm({
      post: "",
      place: "",
      type: "Full Time",
      description: "",
    });
    setShowCareerModal(true);
  };

  const handleEditCareer = (career) => {
    setEditingCareer(career);
    setCareerForm({
      id: career._id,
      post: career.post || career.title || "",
      place: career.place || career.location || "",
      type: career.type || "Full Time",
      description: career.description || "",
    });
    setShowCareerModal(true);
  };

  const handleSaveCareer = async () => {
    if (!careerForm.post || !careerForm.place || !careerForm.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    let success = false;

    if (editingCareer) {
      success = await updateCareer(editingCareer.id, careerForm);
    } else {
      success = await createCareer(careerForm);
    }

    if (success) {
      setShowCareerModal(false);
    }
  };

  const handleDeleteCareer = async (career) => {
    if (window.confirm("Are you sure you want to delete this career?")) {
      await deleteCareer(career);
    }
  };

  // Order Handlers
  const handleAddOrder = () => {
    setEditingOrder(null);
    setOrderForm({
      title: "",
      department: "",
      location: "UAE",
      status: "Order Confirmed",
      userId: "6881c8059b27890265f3cbef",
    });
    setShowOrderModal(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setOrderForm({
      title: order.title,
      department: order.department,
      location: order.location,
      status: order.status,
      userId: order.userId || "6881c8059b27890265f3cbef",
    });
    setShowOrderModal(true);
  };

  const handleSaveOrder = async () => {
    if (!orderForm.title || !orderForm.department || !orderForm.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    let success = false;

    if (editingOrder) {
      success = await updateOrder(editingOrder._id, orderForm);
    } else {
      success = await createOrder(orderForm);
    }

    if (success) {
      setShowOrderModal(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await deleteOrder(id);
    }
  };

  // Service Handlers
  const handleAddService = () => {
    setEditingService(null);
    setServiceForm({
      title: "",
      image: null,
      description: "",
    });
    setShowServiceModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      image: null,
      description: service.description,
    });
    setShowServiceModal(true);
  };

  const handleSaveService = async () => {
    if (!serviceForm.title || !serviceForm.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    let formData = new FormData();
    formData.append("title", serviceForm.title);
    formData.append("description", serviceForm.description);
    if (serviceForm.image) {
      formData.append("image", serviceForm.image);
    }
    let success = false;
    if (editingService) {
      success = await updateService(editingService._id, formData);
    } else {
      success = await createService(formData);
    }
    if (success) {
      setShowServiceModal(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
    }
  };

  // Helper Functions
  const getStatusColor = (status) => {
    switch (status) {
      case "Order Confirmed":
        return "text-blue-400 bg-blue-400/10";
      case "In Progress":
        return "text-yellow-400 bg-yellow-400/10";
      case "Shipped":
        return "text-purple-400 bg-purple-400/10";
      case "Delivered":
        return "text-green-400 bg-green-400/10";
      case "Cancelled":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">
            Please log in to access the dashboard
          </h1>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="px-6 py-3 bg-gradient-to-r text-white font-semibold rounded-xl"
            style={{ background: "linear-gradient(135deg, #F70105, #1131A6)" }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const getdasboarddata = async () => {
    try {
      const result = await action(API.GET_DASHBOARD);
      console.log("Dashboard data:", result);

      if (result?.analytics) {
        setAnalytics(result.analytics);
      } else {
        toast.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data");
    }
  }

  useEffect(() => {
    getdasboarddata();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex overflow-hidden">
      {/* Fixed Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-16"
          } transition-all duration-300 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col h-full`}
      >
        <div className="p-4 flex-1">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div
              className="w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #F70105, #1131A6)",
              }}
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            {isSidebarOpen && (
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection("analytics")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "analytics"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <BarChart3 className="w-5 h-5" />
              {isSidebarOpen && <span>Analytics</span>}
            </button>

            <button
              onClick={() => setActiveSection("careers")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "careers"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <Briefcase className="w-5 h-5" />
              {isSidebarOpen && <span>Career Management</span>}
            </button>

            <button
              onClick={() => setActiveSection("orders")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "orders"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <Package className="w-5 h-5" />
              {isSidebarOpen && <span>Order Management</span>}
            </button>

            {/* Service Management Sidebar Option */}
            <button
              onClick={() => setActiveSection("services")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "services"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <MapPin className="w-5 h-5" />
              {isSidebarOpen && <span>Service Management</span>}
            </button>

            <button
              onClick={() => setActiveSection("applications")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeSection === "applications"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <Users className="w-5 h-5" />
              {isSidebarOpen && <span>Job Applications</span>}
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <Link href={"/login"}>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Fixed Header */}
        <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-white capitalize">
                {activeSection}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-white text-sm">Welcome, Admin</div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Analytics Section */}
          {activeSection === "analytics" && (
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
                  setActiveSection={setActiveSection}
                />
              </div>
            </div>
          )}

          {/* Career Management Section */}
          {activeSection === "careers" && (
            <div className="space-y-6">
              {/* Header with Add Button */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Career Management
                </h3>
                <button
                  onClick={handleAddCareer}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #F70105, #1131A6)",
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Career</span>
                </button>
              </div>

              {/* Careers Table */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                {isLoadingCareers ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Job Title
                          </th>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Location
                          </th>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Type
                          </th>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Description
                          </th>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {careers.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="p-8 text-center text-gray-400">
                              No careers found. Create your first career posting!
                            </td>
                          </tr>
                        ) : (
                          careers.map((career) => (
                            <tr
                              key={career._id}
                              className="border-t border-white/5 hover:bg-white/5"
                            >
                              <td className="p-4 text-white font-medium">
                                {career?.post}
                              </td>
                              <td className="p-4 text-gray-300">
                                {career?.place}
                              </td>
                              <td className="p-4">
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400">
                                  {career?.type}
                                </span>
                              </td>
                              <td className="p-4 text-gray-300 max-w-xs truncate">
                                {career.description}
                              </td>
                              <td className="p-4">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEditCareer(career)}
                                    className="p-1 text-blue-400 hover:bg-blue-400/10 rounded"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCareer(career)}
                                    className="p-1 text-red-400 hover:bg-red-400/10 rounded"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Management Section */}
          {activeSection === "orders" && (
            <div className="space-y-6">
              {/* Header with Add Button */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Order Management
                </h3>
                <button
                  onClick={handleAddOrder}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #F70105, #1131A6)",
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Order</span>
                </button>
              </div>

              {/* Orders Table */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                {isLoadingOrders ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Title
                          </th>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Department
                          </th>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Location
                          </th>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Status
                          </th>
                          <th className="text-left p-4 text-gray-300 font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="p-8 text-center text-gray-400">
                              No orders found.
                            </td>
                          </tr>
                        ) : (
                          orders.map((order) => (
                            <tr
                              key={order._id}
                              className="border-t border-white/5 hover:bg-white/5"
                            >
                              <td className="p-4 text-white font-medium">
                                {order.title}
                              </td>
                              <td className="p-4 text-gray-300">
                                {order.department}
                              </td>
                              <td className="p-4 text-gray-300">
                                {order.location}
                              </td>
                              <td className="p-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEditOrder(order)}
                                    className="p-1 text-blue-400 hover:bg-blue-400/10 rounded"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteOrder(order._id)}
                                    className="p-1 text-red-400 hover:bg-red-400/10 rounded"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Service Management Section */}
          {activeSection === "services" && (
            <div className="space-y-6">
              {/* Header with Add Button */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Service Management
                </h3>
                <button
                  onClick={handleAddService}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #F70105, #1131A6)",
                  }}
                  disabled={isServiceLoading}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Services Table */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                {isLoadingServices ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left p-4 text-gray-300 font-medium">Title</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Image</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Description</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="p-8 text-center text-gray-400">
                              No services found. Create your first service!
                            </td>
                          </tr>
                        ) : (
                          services.map((service) => (
                            <tr
                              key={service._id}
                              className="border-t border-white/5 hover:bg-white/5"
                            >
                              <td className="p-4 text-white font-medium">{service.title}</td>
                              <td className="p-4">
                                {service.image ? (
                                  <img src={service.image} alt={service.title} className="w-16 h-16 object-cover rounded" />
                                ) : (
                                  <span className="text-gray-400">No Image</span>
                                )}
                              </td>
                              <td className="p-4 text-gray-300 max-w-xs truncate">
                                <div dangerouslySetInnerHTML={{ __html: service.description }} />
                              </td>
                              <td className="p-4">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEditService(service)}
                                    className="p-1 text-blue-400 hover:bg-blue-400/10 rounded"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteService(service._id)}
                                    className="p-1 text-red-400 hover:bg-red-400/10 rounded"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Job Applications Section */}
          {activeSection === "applications" && <JobApplications />}
        </main>
      </div>

      {/* Career Modal */}
      {showCareerModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingCareer ? "Edit Career" : "Add New Career"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={careerForm.post}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, post: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="e.g. Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={careerForm.place}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, place: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="e.g. Dubai, Remote"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Job Type
                </label>
                <select
                  value={careerForm.type}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, type: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={careerForm.description}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 h-24 resize-none"
                  placeholder="Job description and requirements..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveCareer}
                disabled={isCareerLoading}
                className="flex-1 py-2 bg-gradient-to-r text-white font-medium rounded-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #F70105, #1131A6)",
                }}
              >
                {isCareerLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Save"
                )}
              </button>
              <button
                onClick={() => setShowCareerModal(false)}
                disabled={isCareerLoading}
                className="flex-1 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-70"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingOrder ? "Edit Order" : "Add New Order"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={orderForm.title}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Order Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Department <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={orderForm.department}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, department: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Department"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={orderForm.location}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, location: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={orderForm.status}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, status: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                >
                  <option value="Order Confirmed">Order Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveOrder}
                disabled={isOrderLoading}
                className="flex-1 py-2 bg-gradient-to-r text-white font-medium rounded-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #F70105, #1131A6)",
                }}
              >
                {isOrderLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Save"
                )}
              </button>
              <button
                onClick={() => setShowOrderModal(false)}
                disabled={isOrderLoading}
                className="flex-1 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-70"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingService ? "Edit Service" : "Add New Service"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Service Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.files[0] })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                />
                {serviceForm.image && (
                  <img
                    src={typeof serviceForm.image === 'string' ? serviceForm.image : URL.createObjectURL(serviceForm.image)}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description <span className="text-red-400">*</span>
                </label>
                <CustomTextEditor
                  value={serviceForm.description}
                  onChange={(value) => setServiceForm({ ...serviceForm, description: value })}
                  placeholder="Service description..."
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveService}
                disabled={isServiceLoading}
                className="flex-1 py-2 bg-gradient-to-r text-white font-medium rounded-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #F70105, #1131A6)",
                }}
              >
                {isServiceLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Save"
                )}
              </button>
              <button
                onClick={() => setShowServiceModal(false)}
                disabled={isServiceLoading}
                className="flex-1 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-70"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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