import React, { useState, useRef } from 'react';
import { FiPaperclip, FiSend, FiX } from 'react-icons/fi';

/**
 * SubtaskForm
 * Props:
 *  - onAdd: ({ title: string, description: string, files: File[] }) => void
 */
export default function SubtaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleAdd = () => {
    if (!title.trim() && !description.trim() && files.length === 0) return;
    onAdd({ title: title.trim(), description: description.trim(), files });
    setTitle('');
    setDescription('');
    setFiles([]);
  };

  const handleFileRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter subtask title"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter subtask description"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          rows={3}
        />
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-2 bg-gray-100 rounded hover:bg-gray-200"
            title="Attach files"
          >
            <FiPaperclip size={20} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files)])}
          />
          <button
            type="button"
            onClick={handleAdd}
            className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
          >
            <FiSend size={20} />
          </button>
        </div>

        {/* File Previews */}
        {files.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
              >
                <span className="truncate max-w-xs">{file.name}</span>
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => handleFileRemove(index)}
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
