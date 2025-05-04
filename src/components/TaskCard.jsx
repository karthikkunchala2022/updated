import React from "react";
import { useNavigate } from "react-router-dom";

function TaskCard({ common, task, onAssign, onDelete, onMenuToggle, openMenuId, setTaskToDelete }) {
  const navigate = useNavigate();

  return (
    <div className="card relative mb-4 p-4 sm:p-6 rounded shadow border bg-white">
  {/* 3-dot menu */}
  <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
    <button
      onClick={() => onMenuToggle(task.id)}
      className="text-gray-600 text-xl"
    >
      ⋮
    </button>
    {openMenuId === task.id && (
      <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-10">
        <button
          onClick={() => navigate(`/edit-task/${task.id}`)}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Edit Task
        </button>
        <button
          onClick={() => navigate(`/transfer-task/${task.id}`)}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Transfer Task
        </button>
        <button
          onClick={() => setTaskToDelete(task)}
          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
        >
          Delete Task
        </button>
      </div>
    )}
  </div>

  {/* Task Info */}
  <h2 className="font-semibold text-base sm:text-lg mb-1">
    {common ? "Common Task" : "Assigned Task"}: {task.title}
  </h2>
  <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
  <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
  <p className="text-sm text-gray-600">Created by: {task.createdBy}</p>
  <p className="text-sm text-gray-700">Priority: {task.priority}</p>
  <p className="text-sm text-gray-700">Status: {task.status}</p>

  {/* Action Buttons */}
  <div className="flex flex-col sm:flex-row sm:space-x-4 gap-2 sm:gap-0 mt-4">
    <button
      className="button-orange w-full sm:w-auto"
      onClick={() => navigate(`/task/${task.id}/subtasks`)}
    >
      View Subtasks
    </button>
    {common && (
      <button
        className="button-orange w-full sm:w-auto"
        onClick={() => onAssign(task.id)}
      >
        Assign to me
      </button>
    )}
  </div>
</div>

  );
}

export default TaskCard;
