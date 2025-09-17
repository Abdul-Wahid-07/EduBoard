"use client";
import { useState } from "react";
import axios from "axios";
import PortalSelector from "../PortalSelector/PortalSelector";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../Auth/Auth";

const LoginPage = () => {
  const router = useRouter();

  const { storeTokenInLS, storeUserInLS } = useAuth();

  const [portal, setPortal] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // NEW STATE

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
    setLoading(true); // start loading
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        ...formData,
        portal,
      });

      if (response.status === 200) {
        setFormData({ email: "", password: "" });
        console.log("Login success:", response.data);
        toast.success(response.data.message || "Login successfull");
        storeTokenInLS(response.data.token);
        storeUserInLS(response.data.user.role)
        router.push( portal === "authority" ? "/authoritydashboard" : "/userdashboard");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Login failed";
      console.log("Login error:", errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false); // stop loading
    }
  };

  if (!portal) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
          <p className="text-gray-600 text-center mb-6">Choose your portal to continue</p>
          <PortalSelector setPortal={setPortal} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {portal === "authority" ? "Authority Portal" : "User Portal"} Login
        </h3>
        <button
          onClick={() => setPortal(null)}
          className="text-indigo-600 hover:text-indigo-800 text-sm mb-4"
        >
          ← Back to portal selection
        </button>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition duration-200 
              ${loading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
