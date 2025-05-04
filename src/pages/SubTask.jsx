// src/pages/SubTask.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UploadButton from "../components/UploadButton";
import SubtaskForm from "../components/SubtaskForm";
import CommentList from "../components/CommentList";

const mockTask = {
  id: 1,
  title: "Organize Research Conference",
  description: "Coordinate all logistics and invitations.",
  deadline: "2025-05-20",
  status: "Ongoing",
  assignedTo: "Ravi Teja",
  priority: "High",
};

const initialSubtasks = [
  { id: 1, title: "Book venue", completed: false, createdAt: new Date() },
  {
    id: 2,
    title: "Invite speakers",
    completed: true,
    createdAt: new Date("2025-04-20T12:00:00"),
    completedAt: new Date("2025-04-22T15:00:00"),
  },
];

export default function SubTask() {
  const { id } = useParams();

  // --- Subtasks state & handlers ---
  const [subtasks, setSubtasks] = useState(initialSubtasks);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [subtaskToConfirm, setSubtaskToConfirm] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAddSubtask = async ({ title, description, files }) => {
    const attachments = await Promise.all(
      files.map((file) => readFileAsDataURL(file))
    );
    const newItem = {
      id: subtasks.length + 1,
      title,
      description,
      completed: false,
      createdAt: new Date(),
      attachments,
    };
    setSubtasks((prev) => [...prev, newItem]);
  };

  const toggleCompleteConfirmed = () => {
    if (!subtaskToConfirm) return;
    setSubtasks((prev) =>
      prev.map((sub) =>
        sub.id === subtaskToConfirm.id
          ? {
              ...sub,
              completed: !sub.completed,
              completedAt: !sub.completed ? new Date() : null,
            }
          : sub
      )
    );
    setSubtaskToConfirm(null);
  };

  const deleteSubtask = (sid) => {
    setSubtasks((prev) => prev.filter((sub) => sub.id !== sid));
    setMenuOpen(null);
  };

  const saveEdit = (sid) => {
    setSubtasks((prev) =>
      prev.map((sub) =>
        sub.id === sid ? { ...sub, title: editTitle } : sub
      )
    );
    setEditMode(null);
    setMenuOpen(null);
  };

  // --- Comments state & handlers (multi‐file) ---
  const [taskComments, setTaskComments] = useState([
    {
      text: "Initial discussion done.",
      attachments: [],
      author: "You",
      timestamp: new Date(),
    },
  ]);
  const [commentInput, setCommentInput] = useState("");
  const [commentFiles, setCommentFiles] = useState([]); // now an array

  const handleAddComment = async () => {
    if (!commentInput.trim() && commentFiles.length === 0) return;

    // read all files to data-URLs
    const attachments = await Promise.all(
      commentFiles.map((f) => readFileAsDataURL(f))
    );

    setTaskComments((prev) => [
      ...prev,
      {
        text: commentInput.trim(),
        attachments,
        author: "You",
        timestamp: new Date(),
      },
    ]);

    // reset input & files
    setCommentInput("");
    setCommentFiles([]);
  };

  // --- Timeline renderer ---
  const renderTimelineSection = (title, items) => (
    <div className="mt-8">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-orange-600">{title}</h3>
      <div className="space-y-6">
        {items.map((sub) => (
          <div
            key={sub.id}
            className={`bg-white rounded-lg shadow-md p-4 border ${
              sub.completed ? "border-green-400" : "border-orange-400"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className={`text-md font-semibold ${
                    sub.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {sub.title}
                </h3>
                <p className="text-xs text-gray-400">
                  Created on: {sub.createdAt.toLocaleString()}
                </p>
                {sub.completed && (
                  <p className="text-xs text-gray-400">
                    Completed on: {sub.completedAt?.toLocaleString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSubtaskToConfirm(sub)}
                className={`px-3 py-1 rounded text-xs font-medium ${
                  sub.completed
                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                }`}
              >
                {sub.completed ? "Undo" : "Mark Complete"}
              </button>
            </div>

            {/* Collapsible Section */}
            <details className="mt-2">
              <summary className="cursor-pointer text-sm text-orange-600">
                View Details
              </summary>
              <div className="mt-2">
                <p className="text-sm text-gray-700">{sub.description}</p>
                {sub.attachments && sub.attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sub.attachments.map((url, i) => (
                      <div key={i} className="relative inline-block">
                        {url.startsWith("data:image") ? (
                          <img
                            src={url}
                            alt={`attachment-${i}`}
                            className="max-w-xs max-h-48 rounded border cursor-pointer"
                            onClick={() => setSelectedImage(url)}
                          />
                        ) : (
                          <a
                            href={url}
                            download
                            className="text-blue-600 underline"
                          >
                            Download file {i + 1}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );

  const pending = subtasks.filter((s) => !s.completed);
  const completed = subtasks.filter((s) => s.completed);

  return (
    <div className="p-6 pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Subtasks for Task #{id}
        </h1>

        {/* Task Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Details</h2>
          <p><strong>Title:</strong> {mockTask.title}</p>
          <p><strong>Description:</strong> {mockTask.description}</p>
          <p><strong>Deadline:</strong> {mockTask.deadline}</p>
          <p><strong>Status:</strong> {mockTask.status}</p>
          <p><strong>Assigned to:</strong> {mockTask.assignedTo}</p>
          <p><strong>Priority:</strong> <span className="text-red-500">{mockTask.priority}</span></p>
        </div>

        {/* Subtasks Timeline */}
        {renderTimelineSection("Pending Subtasks", pending)}
        {renderTimelineSection("Completed Subtasks", completed)}

        {/* Add Subtask */}
        <div className="mt-10 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Subtask</h2>
          <SubtaskForm onAdd={handleAddSubtask} />
        </div>

        {/* Task Comments */}
        <div className="mt-10 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Comments</h2>

          {/* existing messages */}
          <CommentList
            comments={taskComments.map((c, idx) => ({
              id: idx,
              author: c.author,
              timestamp: c.timestamp.toLocaleString(),
              text: c.text,
              attachments: c.attachments,
            }))}
          />

          {/* new comment + multi-file upload */}
          <div className="mt-4">
            {/* File Previews */}
            {commentFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {commentFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                  >
                    <span className="truncate max-w-xs">{file.name}</span>
                    <button
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        setCommentFiles((prev) => prev.filter((_, i) => i !== idx))
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-start gap-4">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <UploadButton
                files={commentFiles}
                setFiles={setCommentFiles}
                multiple
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {subtaskToConfirm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded shadow-xl p-6 w-full max-w-md mx-4 text-sm sm:text-base">
            <h2 className="text-lg font-semibold mb-2">Confirm Status Change</h2>
            <p className="mb-4">
              Are you sure you want to{" "}
              {subtaskToConfirm.completed ? "undo completion of" : "mark"}{" "}
              <strong>"{subtaskToConfirm.title}"</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                onClick={() => setSubtaskToConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                onClick={toggleCompleteConfirmed}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for image preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-screen rounded"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
