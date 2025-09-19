"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AuthorityDashboard() {
  const [notifications, setNotifications] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    priority: "normal",
  });
  const [noticeImage, setNoticeImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
        console.error(
          "Error fetching notifications:",
          err.response?.data || err.message
        );
      }
    };
    fetchNotifications();
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNoticeImage(file);
      setPreview(URL.createObjectURL(file)); // preview
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("message", formData.message);
      data.append("priority", formData.priority);
      if (noticeImage) {
        data.append("noticeImage", noticeImage);
      }

      const res = await axios.post(`${API_URL}/api/notifications/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setFormData({
          title: "",
          message: "",
          priority: "normal",
        });
        setNoticeImage(null);
        setPreview(null);
        toast.success("Message sent successfully");
        setNotifications([res.data, ...notifications]);
      }
    } catch (err) {
      toast.error("Error sending notification");
      console.error(err);
    }
  };

  // Format date nicely
  const formatDate = (isoString) => {
    if (!isoString) return "Unknown";
    const date = new Date(isoString);
    return date.toLocaleString(); // Example: "9/17/2025, 10:30:00 AM"
  };

  return (
    <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-tl from-blue-500 to-gray-300">
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
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full border px-4 py-3 rounded-lg"
          />
          <textarea
            value={formData.message}
            name="message"
            onChange={handleChange}
            placeholder="Enter message"
            rows="4"
            className="w-full border px-4 py-3 rounded-lg"
          ></textarea>
          <select
            value={formData.priority}
            name="priority"
            onChange={handleChange}
            className="border px-4 py-3 rounded-lg"
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          {/* File upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 rounded-lg max-h-64 object-cover"
            />
          )}

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

                {/* Show uploaded image */}
                {notif.noticeImage && (
                  <img
                    src={`${API_URL}${notif.noticeImage}`}
                    alt="Notice"
                    className="mt-2 rounded-lg max-h-64 object-cover border"
                  />
                )}

                {notif.noticeImage && (
                  <a
                    href={`${API_URL}${notif.noticeImage}`}
                    target="_blank"
                    download
                    className="mt-2 inline-block text-indigo-600 text-sm hover:underline"
                  >
                    View Notice
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
