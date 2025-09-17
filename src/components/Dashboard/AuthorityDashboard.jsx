"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AuthorityDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch existing notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/notifications/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err.response?.data || err.message);
      }
    };
    fetchNotifications();
  }, [API_URL]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/notifications/`,
        { title, message, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications([res.data, ...notifications]);
      setTitle("");
      setMessage("");
      setPriority("normal");
    } catch (err) {
      console.error("Error sending notification:", err.response?.data || err.message);
    }
  };

  // Format date nicely
  const formatDate = (isoString) => {
    if (!isoString) return "Unknown";
    const date = new Date(isoString);
    return date.toLocaleString(); // Example: "9/17/2025, 10:30:00 AM"
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

      {/* Sent Notifications */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Sent Notifications
        </h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications sent yet.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif, index) => (
              <li key={index} className="border rounded-lg p-4 bg-gray-50">
                <p>
                  <span className="font-semibold">Title: </span>
                  {notif.title || "No Title"}
                </p>
                <p className="mt-1">
                  <span className="font-semibold">Description: </span>
                  {notif.message || "No Description"}
                </p>
                <p className="mt-1 text-gray-600 text-sm">
                  <span className="font-semibold">Date & Time: </span>
                  {formatDate(notif.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
