// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskTable from "../components/TaskTable";
import { FiFilter } from "react-icons/fi";

const tasksData = [
  {
    id: 1,
    title: "Prepare Monthly Report",
    deadline: "May 5, 2025",
    priority: "High",
    assignedTo: "Ravi Teja",
    createdBy: "Prof. Sharma",
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Organize Workshop",
    deadline: "May 15, 2025",
    priority: "Medium",
    assignedTo: "Anjali",
    createdBy: "Prof. Sharma",
    status: "Pending",
  },
  {
    id: 3,
    title: "Finalize Brochure",
    deadline: "May 3, 2025",
    priority: "Low",
    assignedTo: "Ravi Teja",
    createdBy: "Prof. Nair",
    status: "Completed",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(tasksData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({
    assignedTo: "",
    createdBy: "",
    status: "",
    priority: "",
  });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleAction = (type, id) => {
    switch (type) {
      case "toggleMenu":
        setOpenMenuId(openMenuId === id ? null : id);
        break;
      case "view":
        navigate(`/task/${id}/subtasks`);
        break;
      case "transfer":
        navigate(`/transfer-task/${id}`);
        break;
      case "edit":
        navigate(`/edit-task/${id}`);
        break;
      case "delete":
        setTaskToDelete(tasks.find(t => t.id === id));
        setOpenMenuId(null);
        break;
      default:
        break;
    }
  };

  const confirmDelete = () => {
    setTasks(prev => prev.filter(t => t.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const getUnique = field => [...new Set(tasks.map(t => t[field]))];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssignedTo =
      filters.assignedTo === "" || task.assignedTo === filters.assignedTo;
    const matchesCreatedBy =
      filters.createdBy === "" || task.createdBy === filters.createdBy;
    const matchesStatus =
      filters.status === "" || task.status === filters.status;
    const matchesPriority =
      filters.priority === "" || task.priority === filters.priority;
    return (
      matchesSearch &&
      matchesAssignedTo &&
      matchesCreatedBy &&
      matchesStatus &&
      matchesPriority
    );
  });

  // inject menuOpen flag for each row
  const tableTasks = filteredTasks.map(t => ({
    ...t,
    menuOpen: t.id === openMenuId
  }));

  return (
    <div className="p-6 pt-20">
      <h1 className="text-xl sm:text-2xl mb-4 text-center sm:text-left">
        Task Dashboard
      </h1>

      {/* Search + Filter Toggle */}
      <div className="flex flex-nowrap items-center justify-between gap-2 mb-4 overflow-x-auto">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-grow max-w-[70%] border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 min-w-[150px]"
        />
        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className="flex-shrink-0 flex items-center gap-2 text-sm px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition whitespace-nowrap"
        >
          <FiFilter size={18} />
          {filtersVisible ? "Hide Filters" : "Filters"}
        </button>
      </div>

      {/* Filters */}
      {filtersVisible && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <select
            name="assignedTo"
            value={filters.assignedTo}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Assigned To</option>
            {getUnique("assignedTo").map(name => (
              <option key={name}>{name}</option>
            ))}
          </select>

          <select
            name="createdBy"
            value={filters.createdBy}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Created By (Faculty)</option>
            {getUnique("createdBy").map(faculty => (
              <option key={faculty}>{faculty}</option>
            ))}
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Status</option>
            <option>Pending</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>

          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="border px-2 py-1 text-sm rounded shadow-sm w-full"
          >
            <option value="">Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      )}

      {/* Task Table */}
      <div className="relative">
        <TaskTable tasks={tableTasks} onAction={handleAction} />
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks match your current filters
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {taskToDelete && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete the task{" "}
              <strong>"{taskToDelete.title}"</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                onClick={() => setTaskToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;