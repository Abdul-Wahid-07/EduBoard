"use client";
import { useState } from "react";
import axios from "axios";

export default function AuthorityDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // stored after login

      const res = await axios.post(
        `${API_URL}/api/notifications/`,
        { title, message, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications([res.data, ...notifications]);
      setTitle("");
      setMessage("");
    } catch (err) {
      console.error("Error sending notification:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Authority Dashboard
      </h1>

      {/* Create Notification */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Create New Notification
        </h2>
        <form className="space-y-4" onSubmit={handleSend}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full border px-4 py-3 rounded-lg"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            rows="4"
            className="w-full border px-4 py-3 rounded-lg"
          ></textarea>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border px-4 py-3 rounded-lg"
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
}
