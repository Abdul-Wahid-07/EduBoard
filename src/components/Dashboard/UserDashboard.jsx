"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NotificationCard from "./NotificationCard";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [loading, setLoading] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted = res.data.map((n) => ({
          id: n._id,
          title: n.title,
          message: n.message,
          priority: n.priority,
          timestamp: new Date(n.createdAt).toLocaleString(),
          read: n.isRead, // use backend-provided flag
        }));

        setNotifications(formatted);
      } catch (err) {
        console.error("Error fetching notifications:", err.response?.data || err.message);
      }
    };

    fetchNotifications();
  }, []);

  const toggleRead = async (id, currentRead) => {
  try {
    const token = localStorage.getItem("token");

    // Call backend to update this single notification
    const res = await axios.patch(
      `${API_URL}/api/notifications/${id}`,
      { isRead: !currentRead },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if(res.status === 200){
      toast.success(res.data.message);
      // Update local state after success
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: !currentRead } : n))
      );
    }

  } catch (err) {
    console.error("Error updating notification:", err.response?.data || err.message);
    toast.error("Failed to update notification");
  }
};


  // Updated markAllAsRead with backend call
  const markAllAsRead = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `${API_URL}/api/notifications/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      }

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Error marking all as read:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error marking all as read");
    } finally {
      setLoading(false);
    }
  };


  const filteredNotifications = notifications.filter((n) => {
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "read" && n.read) ||
      (statusFilter === "unread" && !n.read);
    const priorityMatch =
      priorityFilter === "all" || priorityFilter === n.priority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Notifications</h1>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-wrap gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg cursor-pointer"
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg cursor-pointer"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
        </select>
        <button
          onClick={markAllAsRead}
          disabled={loading}
          className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer
                    hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? "Marking..." : "Mark All as Read"}
        </button>

      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-2xl shadow-lg">
          <i className="fas fa-bell-slash text-4xl mb-4"></i>
          <p>No notifications available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              toggleRead={() => toggleRead(n.id, n.read)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
