import React from "react";
import TaskRow from "./TaskRow";

function TaskTable({ tasks, onAction, common_dashboard }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deadline
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned To
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created By
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskRow key={task.id} task={task} onAction={onAction} common_dashboard={common_dashboard}/>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                No tasks found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;