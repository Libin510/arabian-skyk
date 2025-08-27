"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import API, { action } from "../../Api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderForm, setOrderForm] = useState({
    title: "",
    department: "",
    location: "",
    status: "Order Confirmed",
    userId: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    // Get user ID from localStorage
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (authUser.id) {
      setOrderForm(prev => ({ ...prev, userId: authUser.id }));
    }
    fetchOrders();
  }, [searchKey]);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const result = await action(API.GET_ORDER, { searchKey });
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
    console.log("updateOrder called with ID:", id);
    console.log("updateOrder called with data:", orderData);
    setIsOrderLoading(true);
    try {
      // Include the order ID in the payload
      const payloadWithId = { ...orderData, id: id };
      console.log("Payload with ID:", payloadWithId);
      const result = await action(API.UPDATE_ORDER, payloadWithId, id);
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

  const handleAddOrder = () => {
    // Get user ID from localStorage
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    setEditingOrder(null);
    setOrderForm({
      title: "",
      department: "",
      location: "UAE",
      status: "Order Confirmed",
      userId: authUser.id || "",
    });
    setShowOrderModal(true);
  };

  const handleEditOrder = (order) => {
    // Get user ID from localStorage
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    console.log("Editing order:", order);
    console.log("Order ID:", order._id);
    setEditingOrder(order);
    setOrderForm({
      title: order.title,
      department: order.department,
      location: order.location,
      status: order.status,
      userId: authUser.id || order.userId || "",
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
      console.log("Updating order with ID:", editingOrder._id);
      console.log("Order data:", orderForm);
      success = await updateOrder(editingOrder._id, orderForm);
    } else {
      success = await createOrder(orderForm);
    }

    if (success) {
      setShowOrderModal(false);
    }
  };

  const handleDeleteOrder = (id) => {
    setOrderToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (orderToDelete) {
      await deleteOrder(orderToDelete);
      setShowDeleteModal(false);
      setOrderToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Order Management
        </h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
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
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {isLoadingOrders ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto" data-lenis-prevent>
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
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Confirm Deletion
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 py-2 px-4 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
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
