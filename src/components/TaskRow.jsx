import React, { useRef } from "react";
import DropDown from "./DropDown"; // adjust path as needed
import { MoreVertical } from "lucide-react";

function TaskRow({ task, onAction, common_dashboard }) {
  const buttonRef = useRef();
  
  // Function to determine badge color based on priority
  const getPriorityBadgeClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to determine badge color based on status
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr 
    key = {task.id}
    onClick={() => onAction('view', task.id)}
    className="border-t hover:bg-gray-50 " >
      <td className="px-4 py-3">{task.title}</td>
      <td className="px-4 py-3">{task.deadline}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(task.priority)}`}>
          {task.priority}
        </span>
      </td>
      <td className="px-4 py-3">{task.assignedTo}</td>
      <td className="px-4 py-3">{task.createdBy}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(task.status)}`}>
          {task.status}
        </span>
      </td>
      <td className="px-4 py-3 relative">
        <button
          ref={buttonRef}
        //   onClick={() => onAction("toggleMenu", task.id)}
          onClick={(e) => { e.stopPropagation(); onAction('toggleMenu', task.id); }}
          className="p-1 rounded hover:bg-gray-200"
          aria-label="Task options"
        >
          <MoreVertical size={18} />
        </button>
        {task.menuOpen && (
          <DropDown
            buttonRef={buttonRef}
            onClose={() => onAction("toggleMenu", task.id)}
          >
            <button
            //   onClick={() => onAction("view", task.id)}
            onClick={(e) => { e.stopPropagation(); onAction('view', task.id); }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              View
            </button>
            {!common_dashboard && (<button
            //   onClick={() => onAction("view", task.id)}
            onClick={(e) => { e.stopPropagation(); onAction('transfer', task.id); }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Transfer
            </button>)}
            <button
            //   onClick={() => onAction("edit", task.id)}
            onClick={(e) => { e.stopPropagation(); onAction('edit', task.id); }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Edit
            </button>
            <button
            //   onClick={() => onAction("delete", task.id)}
            onClick={(e) => { e.stopPropagation(); onAction('delete', task.id); }}
              className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </DropDown>
        )}
      </td>
    </tr>
  );
}

export default TaskRow;