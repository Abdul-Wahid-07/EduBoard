export default function NotificationCard({ notification, toggleRead }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 ${
        notification.read ? "opacity-75" : ""
      } hover:shadow-xl transition duration-200`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3
          className={`text-lg text-gray-800 ${
            !notification.read ? "font-bold" : "font-medium"
          }`}
        >
          {notification.title}
        </h3>
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            notification.priority === "urgent"
              ? "bg-red-100 text-red-800"
              : notification.priority === "high"
              ? "bg-orange-100 text-orange-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {notification.priority.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{notification.message}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{notification.timestamp}</span>
        <button
          onClick={() => toggleRead(notification.id)}
          className={`text-sm ${
            notification.read ? "text-gray-500" : "text-indigo-600"
          } hover:underline`}
        >
          {notification.read ? "Mark as Unread" : "Mark as Read"}
        </button>
      </div>
    </div>
  );
}
