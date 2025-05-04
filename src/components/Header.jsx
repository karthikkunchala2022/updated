import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCircle, Bell, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard', description: 'View personal tasks' },
  { name: 'Common Dashboard', path: '/common', description: 'View shared tasks' },
  { name: 'Create Task', path: '/create-task', description: 'Assign a new task' },
  { name: 'Add Leaves', path: '/leave', description: 'Mark leave for staff' },
  { name: 'Staff List', path: '/staff', description: 'View and manage staff' }
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, taskId: 12, message: "Task 'Update Website' was completed.", read: false },
    { id: 2, taskId: 15, message: "New unassigned task posted.", read: false }
  ]);

  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const markAsRead = id =>
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );

  const notifRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="bg-white text-gray-800 fixed top-0 inset-x-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-orange-500">
            Admin Module
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 font-medium transition ${
                    isActive ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-orange-400"
              >
                <Bell className="w-6 h-6 text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full shadow">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div
                  className="absolute top-12 left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 
                  w-[90vw] max-w-[20rem] md:w-80 bg-white rounded-lg shadow-lg border border-gray-200 
                  z-50 animate-fade-in overflow-hidden"
                >
                  <div className="p-4 font-semibold border-b text-gray-800">Notifications</div>
                  <ul className="max-h-64 overflow-y-auto divide-y overflow-x-hidden">
                    {notifications.map(note => (
                      <li
                        key={note.id}
                        className={`${
                          note.read ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-800'
                        } px-4 py-3 hover:bg-gray-100 transition-colors`}
                      >
                        <div className="flex justify-between items-center gap-2 text-sm">
                          <Link
                            to={`/task/${note.taskId}/subtasks`}
                            className="flex-1 hover:underline break-words"
                            onClick={() => {
                              markAsRead(note.id);
                              setShowNotifications(false);
                            }}
                          >
                            {note.message}
                          </Link>
                          {!note.read && (
                            <button
                              onClick={() => markAsRead(note.id)}
                              className="text-blue-600 text-xs hover:underline ml-2"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile */}
            <button
              onClick={() => navigate('/profile')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-orange-400"
            >
              <UserCircle className="w-6 h-6 text-gray-700" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-orange-400"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar & Backdrop */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 focus:outline-none">
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-3">
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition ${
                      isActive
                        ? 'bg-gray-200 text-orange-500'
                        : 'text-gray-700 hover:text-orange-500'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Animations Styles */}
      <style>{`
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
