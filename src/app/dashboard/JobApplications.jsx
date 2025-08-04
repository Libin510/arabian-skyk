import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Star,
  GraduationCap,
  Building,
} from "lucide-react";
import { toast } from "react-toastify";
import API, { action } from "../Api";

export default function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const result = await action(API.GET_JOB_APPLICATIONS);
      console.log("Fetched applications:", result.applications);
      setApplications(result.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      // TODO: Implement actual API call to update status
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setApplications(prev => 
        prev.map(app => 
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      
      toast.success(`Application status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlisted":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Interview Scheduled":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "Under Review":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Rejected":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "Hired":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Shortlisted":
        return <CheckCircle className="w-4 h-4" />;
      case "Interview Scheduled":
        return <Calendar className="w-4 h-4" />;
      case "Under Review":
        return <Clock className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      case "Hired":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  const downloadResume = (resumePath) => {
    if (!resumePath) {
      toast.error("Resume not available");
      return;
    }
    
    try {
      // Create the full S3 URL
      const fullUrl = `https://arabian-sky.s3.ap-south-1.amazonaws.com/${resumePath}`;
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = resumePath.split('/').pop() || 'resume.pdf'; // Extract filename from path
      link.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Resume download started");
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast.error("Failed to download resume");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Job Applications</h3>
            <p className="text-gray-400 text-sm mt-1">
              Manage and review job applications from candidates
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-white font-medium mb-2">No Applications Yet</h4>
            <p className="text-gray-400 text-sm">Job applications will appear here once candidates start applying.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Job Applications</h3>
          <p className="text-gray-400 text-sm mt-1">
            Manage and review job applications from candidates
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            {applications.length} application{applications.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((application) => (
          <div
            key={application._id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center"
                     style={{ background: "linear-gradient(135deg, #F70105, #1131A6)" }}>
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{application.name || 'N/A'}</h4>
                  <p className="text-gray-400 text-sm">Job Applicant</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-medium">-</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4" />
                <span>{application.email || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4" />
                <span>{application.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{application.location || 'N/A'}</span>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Briefcase className="w-4 h-4" />
                <span>{application.experience || 'N/A'} experience</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(application.status || 'Under Review')}`}>
                {getStatusIcon(application.status || 'Under Review')}
                <span className="text-xs font-medium">{application.status || 'Under Review'}</span>
              </div>
              <div className="text-gray-400 text-xs">
                Applied {formatDate(application.createdAt)}
              </div>
            </div>

            {/* Resume */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <FileText className="w-4 h-4" />
                <span>{application.resume_path ? 'Resume Available' : 'No Resume'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleViewDetails(application)}
                className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
              <button 
                onClick={() => downloadResume(application.resume_path)}
                className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Application Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Candidate Info */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Candidate Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <User className="w-4 h-4" />
                      <span>{selectedApplication.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Mail className="w-4 h-4" />
                      <span>{selectedApplication.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Phone className="w-4 h-4" />
                      <span>{selectedApplication.phone || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedApplication.location || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Briefcase className="w-4 h-4" />
                      <span>{selectedApplication.experience || 'N/A'} experience</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Application Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Applied Date:</span>
                    <span className="text-white">{formatDate(selectedApplication.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Last Updated:</span>
                    <span className="text-white">{formatDate(selectedApplication.updatedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Application ID:</span>
                    <span className="text-white text-sm font-mono">{selectedApplication._id}</span>
                  </div>
                </div>
              </div>

              {/* Resume */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Resume</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Resume File:</span>
                    <span className="text-white text-sm">{selectedApplication.resume_path || 'No resume uploaded'}</span>
                  </div>
                  {selectedApplication.resume_path && (
                    <button 
                      onClick={() => downloadResume(selectedApplication.resume_path)}
                      className="flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r text-white font-medium rounded-lg"
                      style={{ background: "linear-gradient(135deg, #F70105, #1131A6)" }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Resume</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Status Actions */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {["Under Review", "Shortlisted", "Interview Scheduled", "Hired", "Rejected"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedApplication._id, status)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        (selectedApplication.status || 'Under Review') === status
                          ? "bg-gradient-to-r text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                      style={
                        (selectedApplication.status || 'Under Review') === status
                          ? { background: "linear-gradient(135deg, #F70105, #1131A6)" }
                          : {}
                      }
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                {selectedApplication.resume_path && (
                  <button 
                    onClick={() => downloadResume(selectedApplication.resume_path)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r text-white font-medium rounded-lg"
                    style={{ background: "linear-gradient(135deg, #F70105, #1131A6)" }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume</span>
                  </button>
                )}
                <button className="flex-1 py-2 px-4 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700">
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 