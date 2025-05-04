import { useState } from "react";

const initialNotifications = [
  'Task ‘Update Website’ was marked as complete by AS.',
  'New unassigned task ‘Organize Event Files’ posted.'
];

function Notifications() {
  const [activeNotifications, setActiveNotifications] = useState(initialNotifications);
  const [pastNotifications, setPastNotifications] = useState([]);

  const addNotification = async (newNotification) => {
    setActiveNotifications((prev) => [newNotification, ...prev]);

    // Trigger email notification
    await sendNotificationEmail(
      'user@example.com', // Replace with the user's email
      'New Notification',
      `You have a new notification: ${newNotification}`
    );
  };

  const markAsRead = async (index) => {
    const note = activeNotifications[index];
    setActiveNotifications(activeNotifications.filter((_, i) => i !== index));
    setPastNotifications([note, ...pastNotifications]);

    // Trigger email notification
    await sendNotificationEmail(
      'user@example.com', // Replace with the user's email
      'Notification Update',
      `You have a new notification: ${note}`
    );
  };

  return (
    <div className="p-6">
      <h1 className="title">Notifications</h1>

      <ul className="space-y-4 mb-6">
        {activeNotifications.map((note, index) => (
          <li key={index} className="card flex justify-between items-center">
            <span>{note}</span>
            <button
              className="text-sm text-white bg-gradient-to-r from-[#FF8C00] to-[#FFA500] px-3 py-1 rounded"
              onClick={() => markAsRead(index)}
            >
              Mark as Read
            </button>
          </li>
        ))}
        {activeNotifications.length === 0 && (
          <li className="text-gray-500 text-sm">No new notifications.</li>
        )}
      </ul>

      {pastNotifications.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-black mb-2">Past Notifications</h2>
          <ul className="space-y-2">
            {pastNotifications.map((note, index) => (
              <li key={index} className="card text-gray-500">{note}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Notifications;
