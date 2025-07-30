"use client";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, X } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import API, { action } from "../Api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email Id is required"),
    password: Yup.string().required("Password is required")
  });

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_pass: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await action(API.LOGIN, {
          email: values.email,
          password: values.password
        });

        console.log("Login API result:", result);

        if (result?.token && result?.user) {
          localStorage.setItem("authToken", result.token);
          localStorage.setItem("authUser", JSON.stringify(result.user));

          toast.success(result.message || "Login successful", {
            style: {
              backgroundColor: "#E8F5E9",
              color: "#2E7D32",
              border: "1px solid #66BB6A"
            }
          });

          router.push("/dashboard");
        } else {
          toast.error(result?.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error?.response?.data?.message || "Login error");
      } finally {
        setIsLoading(false);
      }
    }
  });

  const signupFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_pass: ""
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setIsSignupLoading(true);
      try {
        const result = await action(API.SIGNUP, {
          name: values.name,
          email: values.email,
          password: values.password,
          confirm_pass: values.confirm_pass
        });

        console.log("Signup API result:", result);

        if (result.message === "User created successfully.") {
          toast.success(result.message || "Account created successfully! Please login with your credentials.", {
            style: {
              backgroundColor: "#E8F5E9",
              color: "#2E7D32",
              border: "1px solid #66BB6A"
            }
          });

          // Close modal and reset form
          setShowSignupModal(false);
          signupFormik.resetForm();
          
          // Pre-fill login form with the registered email
          formik.setFieldValue('email', values.email);
        } else {
          toast.error(result?.message || "Signup failed");
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(error?.response?.data?.message || "Signup error");
      } finally {
        setIsSignupLoading(false);
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br opacity-20 blur-3xl"
          style={{ background: "linear-gradient(135deg, #F70105, #1131A6)" }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr opacity-20 blur-3xl"
          style={{ background: "linear-gradient(45deg, #1131A6, #F70105)" }}
        ></div>
      </div>

      {/* Main login container */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <form
          onSubmit={formik.handleSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #F70105, #1131A6)" }}
            >
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your account</p>
          </div>

          {/* Login form */}
          <div className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-400">{formik.errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-400">{formik.errors.password}</p>
              )}
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 text-red-600 focus:ring-red-500 focus:ring-2 bg-transparent"
                />
                <span className="text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #F70105, #1131A6)" }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setShowSignupModal(true)}
                className="font-semibold hover:text-white transition-colors"
                style={{ color: "#F70105" }}
              >
                Sign up
              </button>
            </p>
          </div>
        </form>

        {/* Floating elements */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full">
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#F70105" }}></div>
          <div className="absolute bottom-8 left-8 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: "#1131A6" }}></div>
          <div className="absolute top-1/3 -left-2 w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: "#F70105", animationDelay: "1s" }}></div>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSignupModal(false)}
          ></div>
          
          {/* Modal */}
          <div className="relative w-full max-w-md">
            <form
              onSubmit={signupFormik.handleSubmit}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                  <div
                    className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, #F70105, #1131A6)" }}
                  >
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
                  <p className="text-gray-300 text-sm">Join us today</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSignupModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Signup form */}
              <div className="space-y-4">
                {/* Name field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 block">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      onChange={signupFormik.handleChange}
                      onBlur={signupFormik.handleBlur}
                      value={signupFormik.values.name}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                  {signupFormik.touched.name && signupFormik.errors.name && (
                    <p className="text-sm text-red-400">{signupFormik.errors.name}</p>
                  )}
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      onChange={signupFormik.handleChange}
                      onBlur={signupFormik.handleBlur}
                      value={signupFormik.values.email}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  {signupFormik.touched.email && signupFormik.errors.email && (
                    <p className="text-sm text-red-400">{signupFormik.errors.email}</p>
                  )}
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      name="password"
                      onChange={signupFormik.handleChange}
                      onBlur={signupFormik.handleBlur}
                      value={signupFormik.values.password}
                      className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {signupFormik.touched.password && signupFormik.errors.password && (
                    <p className="text-sm text-red-400">{signupFormik.errors.password}</p>
                  )}
                </div>

                {/* Confirm Password field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_pass"
                      onChange={signupFormik.handleChange}
                      onBlur={signupFormik.handleBlur}
                      value={signupFormik.values.confirm_pass}
                      className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {signupFormik.touched.confirm_pass && signupFormik.errors.confirm_pass && (
                    <p className="text-sm text-red-400">{signupFormik.errors.confirm_pass}</p>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSignupLoading}
                className="w-full mt-6 py-3 px-4 bg-gradient-to-r text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #F70105, #1131A6)" }}
              >
                {isSignupLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Login link */}
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setShowSignupModal(false)}
                    className="font-semibold hover:text-white transition-colors"
                    style={{ color: "#F70105" }}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}