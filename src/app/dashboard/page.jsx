"use client";
import React, { useState, useEffect } from 'react';
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
  Cancel
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('analytics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Career Management State
  const [careers, setCareers] = useState([
    { id: 1, title: 'Software Engineer', department: 'Engineering', location: 'Remote', status: 'Active', posted: '2024-01-15' },
    { id: 2, title: 'Product Manager', department: 'Product', location: 'New York', status: 'Active', posted: '2024-01-20' },
    { id: 3, title: 'UX Designer', department: 'Design', location: 'San Francisco', status: 'Closed', posted: '2024-01-10' }
  ]);
  
  // Orders State
  const [orders, setOrders] = useState([
    { id: 1001, customer: 'John Doe', service: 'Web Development', status: 'In Progress', location: 'New York', amount: 2500, date: '2024-01-22' },
    { id: 1002, customer: 'Jane Smith', service: 'Mobile App', status: 'Completed', location: 'California', amount: 5000, date: '2024-01-21' },
    { id: 1003, customer: 'Bob Johnson', service: 'Consulting', status: 'Pending', location: 'Texas', amount: 1500, date: '2024-01-23' }
  ]);
  
  // Analytics State
  const [analytics, setAnalytics] = useState({
    totalOrders: 156,
    serviceClicks: {
      'Web Development': 342,
      'Mobile App': 198,
      'Consulting': 87,
      'UI/UX Design': 234,
      'Digital Marketing': 156
    }
  });
  
  // Modal States
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  
  // Form States
  const [careerForm, setCareerForm] = useState({
    title: '', department: '', location: '', status: 'Active'
  });
  const [orderForm, setOrderForm] = useState({
    customer: '', service: '', status: 'Pending', location: '', amount: ''
  });

  // Handle Career Operations
  const handleAddCareer = () => {
    setEditingCareer(null);
    setCareerForm({ title: '', department: '', location: '', status: 'Active' });
    setShowCareerModal(true);
  };

  const handleEditCareer = (career) => {
    setEditingCareer(career);
    setCareerForm(career);
    setShowCareerModal(true);
  };

  const handleSaveCareer = () => {
    if (editingCareer) {
      setCareers(careers.map(c => c.id === editingCareer.id ? { ...careerForm, id: editingCareer.id, posted: editingCareer.posted } : c));
    } else {
      setCareers([...careers, { ...careerForm, id: Date.now(), posted: new Date().toISOString().split('T')[0] }]);
    }
    setShowCareerModal(false);
  };

  const handleDeleteCareer = (id) => {
    setCareers(careers.filter(c => c.id !== id));
  };

  // Handle Order Operations
  const handleAddOrder = () => {
    setEditingOrder(null);
    setOrderForm({ customer: '', service: '', status: 'Pending', location: '', amount: '' });
    setShowOrderModal(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setOrderForm(order);
    setShowOrderModal(true);
  };

  const handleSaveOrder = () => {
    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...orderForm, id: editingOrder.id, date: editingOrder.date } : o));
    } else {
      setOrders([...orders, { ...orderForm, id: Date.now() + 1000, date: new Date().toISOString().split('T')[0] }]);
    }
    setShowOrderModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Completed':
        return 'text-green-400 bg-green-400/10';
      case 'In Progress':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'Pending':
        return 'text-orange-400 bg-orange-400/10';
      case 'Closed':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Please log in to access the dashboard</h1>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="px-6 py-3 bg-gradient-to-r text-white font-semibold rounded-xl"
            style={{background: 'linear-gradient(135deg, #F70105, #1131A6)'}}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-black/20 backdrop-blur-xl border-r border-white/10`}>
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center"
                 style={{background: 'linear-gradient(135deg, #F70105, #1131A6)'}}>
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            {isSidebarOpen && <h1 className="text-xl font-bold text-white">Admin Panel</h1>}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('analytics')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'analytics' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              {isSidebarOpen && <span>Analytics</span>}
            </button>
            
            <button
              onClick={() => setActiveSection('careers')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'careers' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              {isSidebarOpen && <span>Career Management</span>}
            </button>
            
            <button
              onClick={() => setActiveSection('orders')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'orders' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="w-5 h-5" />
              {isSidebarOpen && <span>Order Management</span>}
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-white capitalize">{activeSection}</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm">Welcome, Admin</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Orders */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Orders</p>
                      <p className="text-3xl font-bold text-white">{analytics.totalOrders}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center"
                         style={{background: 'linear-gradient(135deg, #F70105, #1131A6)'}}>
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Service Clicks Chart */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Mouse className="w-5 h-5 mr-2" />
                    Service Clicks
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.serviceClicks).map(([service, clicks]) => (
                      <div key={service} className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">{service}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r rounded-full"
                              style={{
                                width: `${(clicks / Math.max(...Object.values(analytics.serviceClicks))) * 100}%`,
                                background: 'linear-gradient(135deg, #F70105, #1131A6)'
                              }}
                            />
                          </div>
                          <span className="text-white text-sm font-medium">{clicks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Career Management Section */}
          {activeSection === 'careers' && (
            <div className="space-y-6">
              {/* Header with Add Button */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Career Management</h3>
                <button
                  onClick={handleAddCareer}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  style={{background: 'linear-gradient(135deg, #F70105, #1131A6)'}}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Career</span>
                </button>
              </div>

              {/* Careers Table */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-medium">Title</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Department</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Location</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Posted</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {careers.map((career) => (
                        <tr key={career.id} className="border-t border-white/5 hover:bg-white/5">
                          <td className="p-4 text-white font-medium">{career.title}</td>
                          <td className="p-4 text-gray-300">{career.department}</td>
                          <td className="p-4 text-gray-300">{career.location}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(career.status)}`}>
                              {career.status}
                            </span>
                          </td>
                          <td className="p-4 text-gray-300">{career.posted}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditCareer(career)}
                                className="p-1 text-blue-400 hover:bg-blue-400/10 rounded"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCareer(career.id)}
                                className="p-1 text-red-400 hover:bg-red-400/10 rounded"
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
          )}

          {/* Order Management Section */}
          {activeSection === 'orders' && (
            <div className="space-y-6">
              {/* Header with Add Button */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Order Management</h3>
                <button
                  onClick={handleAddOrder}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  style={{background: 'linear-gradient(135deg, #F70105, #1131A6)'}}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Order</span>
                </button>
              </div>

              {/* Orders Table */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-medium">Order ID</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Customer</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Service</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Location</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Amount</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-t border-white/5 hover:bg-white/5">
                          <td className="p-4 text-white font-medium">#{order.id}</td>
                          <td className="p-4 text-gray-300">{order.customer}</td>
                          <td className="p-4 text-gray-300">{order.service}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-gray-300">{order.location}</td>
                          <td className="p-4 text-green-400 font-medium">${order.amount}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditOrder(order)}
                                className="p-1 text-blue-400 hover:bg-blue-400/10 rounded"
                              >
                                <Edit className="w-4 h-4" />
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
          )}
        </main>
      </div>

      {/* Career Modal */}
      {showCareerModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-white/20 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingCareer ? 'Edit Career' : 'Add New Career'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={careerForm.title}
                  onChange={(e) => setCareerForm({...careerForm, title: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Job Title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                <input
                  type="text"
                  value={careerForm.department}
                  onChange={(e) => setCareerForm({...careerForm, department: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Department"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={careerForm.location}
                  onChange={(e) => setCareerForm({...careerForm, location: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  value={careerForm.status}
                  onChange={(e) => setCareerForm({...careerForm, status: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveCareer}
                className="flex-1 py-2 bg-gradient-to-r text-white font-medium rounded-lg"
                style={{background: 'linear-gradient(135deg, #F70105, #1131A6)'}}
              >
                Save
              </button>
              <button
                onClick={() => setShowCareerModal(false)}
                className="flex-1 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700"
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
              {editingOrder ? 'Edit Order' : 'Add New Order'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Customer</label>
                <input
                  type="text"
                  value={orderForm.customer}
                  onChange={(e) => setOrderForm({...orderForm, customer: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Customer Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Service</label>
                <select
                  value={orderForm.service}
                  onChange={(e) => setOrderForm({...orderForm, service: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                >
                  <option value="">Select Service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Consulting">Consulting</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  value={orderForm.status}
                  onChange={(e) => setOrderForm({...orderForm, status: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={orderForm.location}
                  onChange={(e) => setOrderForm({...orderForm, location: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
                <input
                  type="number"
                  value={orderForm.amount}
                  onChange={(e) => setOrderForm({...orderForm, amount: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="Amount"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveOrder}
                className="flex-1 py-2 bg-gradient-to-r text-white font-medium rounded-lg"
                style={{background: 'linear-gradient(135deg, #F70105, #1131A6)'}}
              >
                Save
              </button>
              <button
                onClick={() => setShowOrderModal(false)}
                className="flex-1 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}