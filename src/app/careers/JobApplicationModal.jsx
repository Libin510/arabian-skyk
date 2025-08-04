"use client";

import React, { useState } from "react";
import { X, Upload, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import API, { action } from "../Api";

const JobApplicationModal = ({ isOpen, onClose, jobTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    cv: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, cv: "Please upload a PDF or Word document" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cv: "File size must be less than 5MB" }));
        return;
      }
      setFormData(prev => ({ ...prev, cv: file }));
      setErrors(prev => ({ ...prev, cv: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = "Invalid phone number";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.cv) newErrors.cv = "CV/Resume is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyForJob = async (jobData) => {
    try {
      const fd = new FormData();
      fd.append("name", jobData.name);
      fd.append("email", jobData.email);
      fd.append("phone", jobData.phone);
      fd.append("location", jobData.location);
      fd.append("experience", jobData.experience);
      fd.append("resume_path", jobData.file); 

      const result = await action(API.APPLY_JOB, fd);

      toast.success("Application submitted successfully!", {
        style: {
          backgroundColor: "#E8F5E9",
          color: "#2E7D32",
          border: "1px solid #66BB6A"
        }
      });

      return true;
    } catch (error) {
      console.error("Error submitting job application:", error);
      toast.error(error?.response?.data?.message || "Failed to submit application");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const jobApplicationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        experience: formData.experience,
        file: formData.cv,
      };

      const success = await applyForJob(jobApplicationData);

      if (success) {
        setFormData({ name: "", email: "", phone: "", location: "", experience: "", cv: null });
        onClose();
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Apply for Position
                </h2>
                <p className="text-sm text-gray-600 mt-1">{jobTitle}</p>
              </div>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-6 space-y-6">
              {/* Input fields */}
              {["name", "email", "phone", "location", "experience"].map(field => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                    {field[0].toUpperCase() + field.slice(1)} *
                  </label>
                  {field === "experience" ? (
                    <textarea
                      id={field}
                      name={field}
                      rows={3}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={`Enter your ${field}`}
                      disabled={isSubmitting}
                    />
                  ) : (
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={`Enter your ${field}`}
                      disabled={isSubmitting}
                    />
                  )}
                  {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                </div>
              ))}

              {/* File Upload */}
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                  CV/Resume *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="file"
                    className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${errors.cv ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Upload size={24} className="text-gray-400" />
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          {formData.cv ? (
                            <span className="flex items-center gap-2">
                              <FileText size={16} className="text-green-500" />
                              {formData.cv.name}
                            </span>
                          ) : (
                            <>
                              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                            </>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC, or DOCX (max 5MB)
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#01016F] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationModal;
