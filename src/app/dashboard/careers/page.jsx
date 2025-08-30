"use client";
import React, { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import API, { action } from "../../Api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CareerManagement() {
  const [careers, setCareers] = useState([]);
  const [isLoadingCareers, setIsLoadingCareers] = useState(false);
  const [isCareerLoading, setIsCareerLoading] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [careerForm, setCareerForm] = useState({
    post: "",
    place: "",
    type: "Full Time",
    responsibility: "",
    requirement: "",
    qualification: "",
    experience: "",
    salary: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState(null);

  // For scroll fix
  const modalContentRef = useRef(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showCareerModal || showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCareerModal, showDeleteModal]);

  // Fix for mouse wheel scroll not working on modal
  useEffect(() => {
    if (!showCareerModal) return;
    const ref = modalContentRef.current;
    if (!ref) return;

    // Handler to allow wheel events to scroll the modal content
    const handleWheel = (e) => {
      // Only vertical scroll
      const delta = e.deltaY;
      if (
        (delta < 0 && ref.scrollTop === 0) ||
        (delta > 0 && ref.scrollTop + ref.clientHeight >= ref.scrollHeight)
      ) {
        // Prevent scroll propagation to background
        e.preventDefault();
      }
      ref.scrollTop += delta;
    };

    ref.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      ref.removeEventListener("wheel", handleWheel);
    };
  }, [showCareerModal]);

  const fetchCareers = async () => {
    setIsLoadingCareers(true);
    try {
      const result = await action(API.GET_CAREER, {});
      if (result?.careers) {
        setCareers(result.careers);
      } else if (Array.isArray(result)) {
        setCareers(result);
      }
    } catch (error) {
      toast.error("Failed to fetch careers");
    } finally {
      setIsLoadingCareers(false);
    }
  };

  const createCareer = async (careerData) => {
    setIsCareerLoading(true);
    try {
      await action(API.ADD_CAREER, careerData);
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
      toast.error(error?.response?.data?.message || "Failed to create career");
      return false;
    } finally {
      setIsCareerLoading(false);
    }
  };

  const updateCareer = async (id, careerData) => {
    setIsCareerLoading(true);
    try {
      await action(API.UPDATE_CAREER, careerData, id);
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
      toast.error(error?.response?.data?.message || "Failed to update career");
      return false;
    } finally {
      setIsCareerLoading(false);
    }
  };

  const deleteCareer = async (career) => {
    try {
      const id = career._id;
      await action(API.DELETE_CAREER, { id });
      toast.success("Career deleted successfully!", {
        style: {
          backgroundColor: "#E8F5E9",
          color: "#2E7D32",
          border: "1px solid #66BB6A"
        }
      });
      await fetchCareers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete career");
    }
  };

  const handleAddCareer = () => {
    setEditingCareer(null);
    setCareerForm({
      post: "",
      place: "",
      type: "Full Time",
      responsibility: "",
      requirement: "",
      qualification: "",
      experience: "",
      salary: "",
    });
    setShowCareerModal(true);
    setTimeout(() => {
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0;
      }
    }, 0);
  };

  const handleEditCareer = (career) => {
    setEditingCareer(career);
    setCareerForm({
      post: career.post || career.title || "",
      place: career.place || career.location || "",
      type: career.type || "Full Time",
      responsibility: career.responsibility || "",
      requirement: career.requirement || "",
      qualification: career.qualification || "",
      experience: career.experience || "",
      salary: career.salary || "",
    });
    setShowCareerModal(true);
    setTimeout(() => {
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0;
      }
    }, 0);
  };

  const handleSaveCareer = async () => {
    if (
      !careerForm.post ||
      !careerForm.place ||
      !careerForm.responsibility ||
      !careerForm.requirement ||
      !careerForm.qualification ||
      !careerForm.experience ||
      !careerForm.salary
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    let success = false;

    if (editingCareer) {
      success = await updateCareer(editingCareer._id, careerForm);
    } else {
      success = await createCareer(careerForm);
    }

    if (success) {
      setShowCareerModal(false);
    }
  };

  const handleDeleteCareer = (career) => {
    setCareerToDelete(career);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (careerToDelete) {
      await deleteCareer(careerToDelete);
      setShowDeleteModal(false);
      setCareerToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCareerToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Career Management
        </h3>
        <div className="flex items-center space-x-4">
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
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {isLoadingCareers ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto" data-lenis-prevent>
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
                    Salary
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
                        {career.salary || "-"}
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

      {showCareerModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          style={{
            overflowY: "auto",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div
            ref={modalContentRef}
            className="bg-gray-800 border border-white/20 rounded-2xl p-6 w-full max-w-md"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              minHeight: 0,
              WebkitOverflowScrolling: "touch",
              boxSizing: "border-box",
            }}
            tabIndex={0}
          >
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
                  Responsibility <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={careerForm.responsibility}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, responsibility: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 h-24 resize-none"
                  placeholder="List responsibilities (separate with commas or new lines)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Requirement <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={careerForm.requirement}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, requirement: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 h-24 resize-none"
                  placeholder="List required skills/experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Qualification <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={careerForm.qualification}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, qualification: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="e.g., Bachelor’s in Logistics or related field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Experience <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={careerForm.experience}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, experience: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="e.g., 3+ years in fleet or operations management"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Salary <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={careerForm.salary}
                  onChange={(e) => setCareerForm({ ...careerForm, salary: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  placeholder="e.g., AED 6,000 - 8,000 / month"
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
                Are you sure you want to delete the career posting for{" "}
                <span className="text-white font-medium">
                  {careerToDelete?.post}
                </span>
                ? This action cannot be undone.
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
