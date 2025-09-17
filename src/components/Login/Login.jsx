"use client";
import { useState } from "react";
import axios from "axios";
import PortalSelector from "../PortalSelector/PortalSelector";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../Auth/Auth";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();
  const { storeTokenInLS, storeUserInLS } = useAuth();

  const [portal, setPortal] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        ...formData,
        portal,
      });

      if (response.status === 200) {
        setFormData({ email: "", password: "" });
        toast.success(response.data.message || "Login successful");
        storeTokenInLS(response.data.token);
        storeUserInLS(response.data.user.role);
        router.push(
          portal === "authority" ? "/authoritydashboard" : "/userdashboard"
        );
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Portal Selection Page
  if (!portal) {
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
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg text-center max-w-sm">
            Select your portal to continue and access your personalized dashboard.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 sm:p-10 bg-gray-50">
          <div className="max-w-md w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
              Login
            </h2>
            <p className="text-gray-600 text-center mb-4 sm:mb-6 text-sm sm:text-base">
              Choose your portal to continue
            </p>
            <PortalSelector setPortal={setPortal} />
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Login Form Page
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
        <h1 className="text-4xl font-bold mb-4">
          {portal === "authority" ? "Authority Portal" : "User Portal"}
        </h1>
        <p className="text-lg text-center max-w-sm">
          Securely login to access your dashboard and manage your account.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-gray-50">
        <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
            {portal === "authority" ? "Authority Portal" : "User Portal"} Login
          </h3>
          <button
            onClick={() => setPortal(null)}
            className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm mb-3 sm:mb-4"
          >
            ← Back to portal selection
          </button>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition duration-200 
              ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
