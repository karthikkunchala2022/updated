import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const mockTasksCreated = [
  {
    id: 1,
    title: "Prepare Conference Schedule",
    deadline: "May 10, 2025",
    priority: "High",
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Review Project Proposals",
    deadline: "May 15, 2025",
    priority: "Medium",
    status: "Pending",
  },
];

function FacultyTasks() {
  const [tasks, setTasks] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with actual API fetch
    setTasks(mockTasksCreated);
  }, []);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="title mb-4">Tasks Created by You</h1>

      {tasks.length === 0 ? (
        <div className="text-gray-500">You haven’t created any tasks yet.</div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="card p-4 border border-gray-200 rounded-lg shadow-sm relative"
            >
              {/* 3 Dots Dropdown */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => toggleMenu(task.id)}
                  className="text-gray-500 text-xl"
                >
                  ⋮
                </button>
                {openMenuId === task.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                    <button
                      onClick={() => navigate(`/edit-task/${task.id}`)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Edit Task
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Delete Task
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-orange-600">{task.title}</h2>
                  <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
                  <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                  <p className="text-sm text-gray-600">Status: {task.status}</p>
                </div>
                <Link
                  to={`/task/${task.id}/subtasks`}
                  className="button-orange px-3 py-1 text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FacultyTasks;
