import React from "react";

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, message: "Your art received a new like!" },
    { id: 2, message: "You have a new follower!" },
    { id: 3, message: "Someone commented on your post!" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="p-4 bg-gray-100 rounded shadow-md"
          >
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
