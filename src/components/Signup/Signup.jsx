"use client";
import { useState } from "react";
import axios from "axios";
import PortalSelector from "../PortalSelector/PortalSelector";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const response = await axios.post(`${API_URL}/api/auth/register`, payload);

      if (response.status === 201) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  // Step 1 → Choose portal
  if (!formData.role) {
    return (
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-tl from-blue-500 to-gray-300 text-black p-10">
          <Image
            src="/logo.png"
            alt="EduBoard Logo"
            width={150}
            height={150}
            className="rounded-2xl shadow-lg mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">Welcome</h1>
          <p className="text-lg text-center max-w-sm">
            Select your portal to continue and access your personalized dashboard.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 sm:p-10 bg-gray-50">
          <div className="max-w-md w-full">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Sign Up
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Choose your portal/role to continue
              </p>
              <PortalSelector setPortal={(role) => setFormData((prev) => ({ ...prev, role }))} />
          </div>
        </div>
      </div>
    );
  }

  // Step 2 → Signup form with illustration
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Illustration Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tl from-blue-500 to-gray-300 items-center justify-center p-10 text-black flex-col">
        <Image
          src="/logo.png"
          alt="EduBoard Logo"
          width={150}
          height={150}
          className="rounded-2xl shadow-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">Welcome to EduBoard</h1>
        <p className="text-lg text-center max-w-md">
          Join us today and unlock your learning journey.  
          Sign up to get started with your personalized portal.
        </p>
      </div>

      {/* Right Signup Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-6 sm:px-10 py-12">
        <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Sign Up
          </h3>

          {/* Back button */}
          <button
            onClick={() => setFormData((prev) => ({ ...prev, role: "" }))}
            className="text-indigo-600 hover:text-indigo-800 text-sm mb-4"
          >
            ← Back to portal selection
          </button>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Selected Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-sm focus:ring-0 focus:border-gray-300 cursor-not-allowed"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 font-semibold text-sm"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
