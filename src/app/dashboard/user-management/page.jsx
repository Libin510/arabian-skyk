"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, User, Mail, Phone, MapPin, RefreshCw } from "lucide-react";
import API, { action } from "../../Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("about");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [contactUsData, setContactUsData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    is_employee: false,
    number: "",
    image: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch users based on is_employee flag
  const fetchUsers = async (isEmployee) => {
    try {
      setIsLoading(true);
      const payload = { is_employee: isEmployee };
      const result = await action(API.GET_USER, payload);
      
      if (result?.data) {
        if (isEmployee) {
          setContactUsData(result.data);
        } else {
          setAboutUsData(result.data);
        }
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === "about") {
      fetchUsers(false); // is_employee: false for About Us
    } else {
      fetchUsers(true); // is_employee: true for Contact Us
    }
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Create FormData object
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("image", formData.image);
      formDataObj.append("designation", formData.designation);
             formDataObj.append("is_employee", formData.is_employee.toString());
      formDataObj.append("number", formData.number);
      
      // Call the ADD_USER API
      const result = await action(API.ADD_USER, formDataObj);
      
      if (result?.success) {
        toast.success("User added successfully!");
        setIsModalOpen(false);
        setFormData({ name: "", designation: "", is_employee: false, number: "", image: "" });
        
        // Refresh the current tab data after adding user
        if (activeTab === "about") {
          fetchUsers(false);
        } else {
          fetchUsers(true);
        }
      } else {
        toast.error(result?.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
    // Implement delete functionality
  };



  const renderTable = (data, isContactTab = false) => (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-6 py-4 text-left">
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Name</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Designation</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Employee Type</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        {item.name?.charAt(0) || '?'}
                      </div>
                      <span className="text-white/90 font-medium">{item.name || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white/80">{item.designation || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      item.is_employee 
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    }`}>
                      <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                      {item.is_employee ? 'Employee' : 'Non-Employee'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">User Management</h1>
          <p className="text-gray-400 mt-2">Manage your users and contacts</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* <button
            onClick={() => {
              if (activeTab === "about") {
                fetchUsers(false);
              } else {
                fetchUsers(true);
              }
            }}
            className="flex items-center space-x-2 px-4 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-all duration-200"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button> */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "about"
                ? "bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <User className="w-5 h-5" />
            <span>About Us</span>
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "contact"
                ? "bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Mail className="w-5 h-5" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-white">Loading...</span>
          </div>
        ) : (
          activeTab === "about" ? renderTable(aboutUsData) : renderTable(contactUsData, true)
        )}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New User</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter user name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter designation"
                  required
                />
              </div>
              
                             <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                 <input
                   type="tel"
                   name="number"
                   value={formData.number}
                   onChange={handleInputChange}
                   className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   placeholder="Enter phone number"
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                 <input
                   type="file"
                   name="image"
                   accept="image/*"
                   onChange={(e) => {
                     const file = e.target.files[0];
                     if (file) {
                       setFormData(prev => ({ ...prev, image: file }));
                     }
                   }}
                   className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                 />
               </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Employee Type</label>
                <select
                  name="is_employee"
                  value={formData.is_employee ? "true" : "false"}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_employee: e.target.value === "true" }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="false">Non-Employee</option>
                  <option value="true">Employee</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isSubmitting ? (
                     <div className="flex items-center justify-center space-x-2">
                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                       <span>Adding...</span>
                     </div>
                   ) : (
                     "Add User"
                   )}
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Toast Container */}
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
