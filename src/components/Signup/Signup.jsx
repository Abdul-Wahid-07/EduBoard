"use client";
import { useState } from "react";
import axios from "axios";
import PortalSelector from "../PortalSelector/PortalSelector";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
        console.log("Signup success:", response.data);
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
      <div className="py-12 sm:py-16 lg:py-20 bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
            Sign Up
          </h2>
          <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
            Choose your portal/role to continue
          </p>
          <PortalSelector setPortal={(role) => setFormData((prev) => ({ ...prev, role }))} />
        </div>
      </div>
    );
  }

  // Step 2 → Signup form
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
          {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Sign Up
        </h3>

        {/* Back button */}
        <button
          onClick={() => setFormData((prev) => ({ ...prev, role: "" }))}
          className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm mb-3 sm:mb-4"
        >
          ← Back to portal selection
        </button>

        <form className="space-y-3 sm:space-y-4" onSubmit={handleSignup}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <p className="text-xs sm:text-sm text-gray-600">
            Selected Role: <span className="font-semibold">{formData.role}</span>
          </p>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg hover:bg-green-700 transition duration-200 font-medium sm:font-semibold text-sm sm:text-base cursor-pointer"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
